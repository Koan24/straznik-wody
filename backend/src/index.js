require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const multer = require('multer')

const upload = multer({
  dest: 'uploads/' //folder na zdjecia
})

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

// --- Auth ---
app.post('/api/register', async (req, res) => {
  const { imie, email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'email/password required' })
  const hashed = await bcrypt.hash(password, 10)
  try {
    const user = await prisma.user.create({ data: { imie, email, password: hashed } })
    const { password: _p, ...safe } = user
    res.json(safe)
  } catch (e) {
    res.status(400).json({ error: 'could not create user' })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ error: 'invalid credentials' })
  const token = jwt.sign({ sub: user.id, role: user.rola }, JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

function auth(req, res, next) {
  const h = req.headers.authorization
  if (!h) return res.status(401).json({ error: 'missing token' })
  const token = h.replace('Bearer ', '')
  try {
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data
    next()
  } catch (e) {
    res.status(401).json({ error: 'invalid token' })
  }
}

// --- Users ---
app.get('/api/uzytkownicy', async (req, res) => {
  const users = await prisma.user.findMany({ select: { id: true, imie: true, email: true, rola: true, createdAt: true } })
  res.json(users)
})

app.get('/api/uzytkownicy/:id', async (req, res) => {
  const id = Number(req.params.id)
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, imie: true, email: true, rola: true } })
  if (!user) return res.status(404).json({ error: 'not found' })
  res.json(user)
})

// --- Wodowskazy ---
app.get('/api/wodowskazy', async (req, res) => {
  const items = await prisma.wodowskaz.findMany({
    include: {
      pomiary: true
    }
  })
  res.json(items)
})

app.post('/api/wodowskazy', auth, upload.single('zdjecieReferencyjne'), async (req, res) => {
  try {
    const {
      nazwa,
      lat,
      lng,
      numerId,
      typPunktu,
      stanTechniczny,
      dostepnosc,
      ciekLubZbiornik,
      dataInstalacji,
      rzednaZero,
      opis
    } = req.body

    if (!nazwa || !lat || !lng) {
      return res.status(400).json({ error: 'brakuje wymaganych danych' })
    }

    const item = await prisma.wodowskaz.create({
      data: {
        nazwa,
        lat: Number(lat),
        lng: Number(lng),
        numerId: numerId || null,
        typPunktu: typPunktu || null,
        stanTechniczny: stanTechniczny || null,
        dostepnosc: dostepnosc || null,
        ciekLubZbiornik: ciekLubZbiornik || null,
        dataInstalacji: dataInstalacji ? new Date(dataInstalacji) : null,
        rzednaZero: rzednaZero ? Number(rzednaZero) : null,
        opis: opis || null,
        zdjecieReferencyjne: req.file ? req.file.filename : null
      }
    })

    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'blad zapisu wodowskazu' })
  }
})

app.put('/api/wodowskazy/:id', auth, async (req, res) => {
  const id = Number(req.params.id)
  const data = req.body
  const item = await prisma.wodowskaz.update({ where: { id }, data })
  res.json(item)
})

app.delete('/api/wodowskazy/:id', auth, async (req, res) => {
  const id = Number(req.params.id)
  await prisma.wodowskaz.delete({ where: { id } })
  res.json({ ok: true })
})

function calculateDistanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000
  const toRad = (value) => (value * Math.PI) / 180

  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

function getLocationQuality(distanceMeters) {
  if (distanceMeters <= 5) return 'wysoka'
  if (distanceMeters <= 20) return 'srednia'
  return 'niska'
}

// --- Pomiary ---
app.get('/api/pomiary', async (req, res) => {
  const pomiary = await prisma.pomiar.findMany({
    include: { wodowskaz: true },
    orderBy: { createdAt: 'desc' }
  })
  res.json(pomiary)
})

app.post('/api/pomiary', auth, upload.single('zdjecie'), async (req, res) => {
  const {
    wodowskazId,
    wartosc,
    data,
    komentarz,
    lat,
    lng,
    dostepDoPunktu,
    mozliwoscOdczytu,
    stanLaty,
    warunkiOdczytu,
    uwagiTerenowe
  } = req.body

  if (!req.file) {
    return res.status(400).json({ error: 'zdjecie jest wymagane' })
  }

  if (!wodowskazId || !wartosc) {
    return res.status(400).json({ error: 'brakuje wymaganych danych' })
  }

  if (!lat || !lng) {
    return res.status(400).json({ error: 'lokalizacja jest wymagana' })
  }

  try {
    const wodowskaz = await prisma.wodowskaz.findUnique({
      where: { id: Number(wodowskazId) }
    })

    if (!wodowskaz) {
      return res.status(404).json({ error: 'nie znaleziono wodowskazu' })
    }

    if (wodowskaz.lat === null || wodowskaz.lng === null) {
      return res.status(400).json({ error: 'wodowskaz nie ma zapisanej lokalizacji' })
    }

    const dystansOdWodowskazu = calculateDistanceMeters(
      Number(lat),
      Number(lng),
      Number(wodowskaz.lat),
      Number(wodowskaz.lng)
    )

    const jakoscLokalizacji = getLocationQuality(dystansOdWodowskazu)

    const pomiar = await prisma.pomiar.create({
      data: {
        wodowskazId: Number(wodowskazId),
        wartosc: Number(wartosc),
        data: data ? new Date(data) : undefined,
        komentarz: komentarz || null,
        lat: Number(lat),
        lng: Number(lng),
        zdjecie: req.file.filename,

        dostepDoPunktu: dostepDoPunktu || null,
        mozliwoscOdczytu: mozliwoscOdczytu || null,
        stanLaty: stanLaty || null,
        warunkiOdczytu: warunkiOdczytu || null,
        uwagiTerenowe: uwagiTerenowe || null,

        dystansOdWodowskazu,
        jakoscLokalizacji,

        userId: req.user?.sub ? Number(req.user.sub) : null
      }
    })

    res.json(pomiar)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'blad zapisu pomiaru' })
  }
})

app.delete('/api/pomiary/:id', auth, async (req, res) => {
  await prisma.pomiar.delete({
    where: { id: Number(req.params.id) }
  })
  res.json({ ok: true })
})

// --- Zgloszenia ---
app.get('/api/zgloszenia', async (req, res) => {
  try {
    const { dataOd, dataDo, status } = req.query

    const where = {}

    if (status) {
      where.status = status
    }

    if (dataOd || dataDo) {
      where.createdAt = {}

      if (dataOd) {
        where.createdAt.gte = new Date(dataOd)
      }

      if (dataDo) {
        const endDate = new Date(dataDo)
        endDate.setHours(23, 59, 59, 999)
        where.createdAt.lte = endDate
      }
    }

    const zgloszenia = await prisma.zgloszenie.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json(zgloszenia)
  } catch (error) {
    res.status(500).json({ error: 'Blad pobierania zgloszen' })
  }
})

app.post('/api/zgloszenia', upload.single('zdjecie'), async (req, res) => {
  try {
    const {
      tytul,
      opis,
      typObiektu,
      rodzajUszkodzenia,
      stopien,
      lat,
      lng
    } = req.body

    if (!req.file) {
      return res.status(400).json({ error: 'zdjecie jest wymagane' })
    }

    if (!tytul || !opis || !typObiektu || !rodzajUszkodzenia || !stopien) {
      return res.status(400).json({ error: 'brakuje wymaganych danych' })
    }

    if (!lat || !lng) {
      return res.status(400).json({ error: 'lokalizacja jest wymagana' })
    }

    const item = await prisma.zgloszenie.create({
      data: {
        tytul,
        opis,
        typObiektu,
        rodzajUszkodzenia,
        stopien: Number(stopien),
        lat: Number(lat),
        lng: Number(lng),
        zdjecie: req.file.filename
      }
    })

    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'could not create zgloszenie' })
  }
})

app.put('/api/zgloszenia/:id', auth, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const data = req.body

    const item = await prisma.zgloszenie.update({
      where: { id },
      data: {
        ...data,
        stopien: Number(data.stopien)
      }
    })

    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'could not update zgloszenie' })
  }
})

app.delete('/api/zgloszenia/:id', auth, async (req, res) => {
  const id = Number(req.params.id)
  await prisma.zgloszenie.delete({ where: { id } })
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
