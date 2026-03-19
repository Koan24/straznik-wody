require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const multer = require('multer')

const upload = multer({
  dest: 'uploads/' //folder na zdjecia
})

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

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

app.post('/api/wodowskazy', auth, async (req, res) => {
  const data = req.body
  const item = await prisma.wodowskaz.create({ data })
  res.json(item)
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

// --- Pomiary ---
app.get('/api/pomiary', async (req, res) => {
  const pomiary = await prisma.pomiar.findMany({
    include: { wodowskaz: true },
    orderBy: { createdAt: 'desc' }
  })
  res.json(pomiary)
})

app.post('/api/pomiary', auth, upload.single('zdjecie'), async (req, res) => {

  const { wodowskazId, wartosc, data, komentarz, lat, lng } = req.body

  try {

    const pomiar = await prisma.pomiar.create({
      data: {
        wodowskazId: Number(wodowskazId),
        wartosc: Number(wartosc),
        data: data ? new Date(data) : undefined,
        komentarz: komentarz || null,
        lat: lat ? Number(lat) : null,
        lng: lng ? Number(lng) : null,
        zdjecie: req.file ? req.file.filename : null
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
    const zgloszenia = await prisma.zgloszenie.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json(zgloszenia)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'could not fetch zgloszenia' })
  }
})

app.post('/api/zgloszenia', async (req, res) => {
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

    const item = await prisma.zgloszenie.create({
      data: {
        tytul,
        opis,
        typObiektu,
        rodzajUszkodzenia,
        stopien: Number(stopien),
        lat,
        lng
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
