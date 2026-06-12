import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { jsPDF } from "jspdf"
import Layout from "../components/Layout"
import Card from "../components/Card"
import { getZgloszenia, getUploadUrl } from "../services/zgloszeniaService"

function Raport() {
  const navigate = useNavigate()

  const [dataOd, setDataOd] = useState("")
  const [dataDo, setDataDo] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function normalizeText(value) {
    if (value === null || value === undefined) return "-"

    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\u0142/g, "l")
      .replace(/\u0141/g, "L")
  }

  function formatDate(value) {
    if (!value) return "-"
    return new Date(value).toLocaleString("pl-PL")
  }

  function formatStatus(value) {
    if (!value) return "-"

    const labels = {
      open: "Otwarte",
      closed: "Zamkniete",
      in_progress: "W trakcie"
    }

    return labels[value] || value
  }

  function getImageType(fileName) {
    if (!fileName) return "JPEG"

    const lower = fileName.toLowerCase()

    if (lower.endsWith(".png")) return "PNG"
    if (lower.endsWith(".webp")) return "WEBP"

    return "JPEG"
  }

  async function imageUrlToBase64(url) {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Nie udalo sie pobrac zdjecia")
    }

    const blob = await response.blob()

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  function addNewPageIfNeeded(doc, currentY, neededSpace = 20) {
    if (currentY + neededSpace > 280) {
      doc.addPage()
      return 20
    }

    return currentY
  }

  function addWrappedText(doc, label, value, x, y, maxWidth) {
    const text = `${label}: ${normalizeText(value)}`
    const lines = doc.splitTextToSize(text, maxWidth)

    doc.text(lines, x, y)

    return y + lines.length * 5
  }

  async function generujPDF() {
    try {
      setLoading(true)
      setError("")

      const raportZgloszenia = await getZgloszenia({
        dataOd,
        dataDo,
        status
      })

      const doc = new jsPDF("p", "mm", "a4")

      doc.setFontSize(16)
      doc.text("Raport zgloszen obiektow hydrotechnicznych", 20, 20)

      doc.setFontSize(10)
      doc.text(`Data wygenerowania: ${new Date().toLocaleString("pl-PL")}`, 20, 30)
      doc.text(`Zakres dat: ${dataOd || "-"} - ${dataDo || "-"}`, 20, 36)
      doc.text(`Status: ${status ? formatStatus(status) : "Wszystkie"}`, 20, 42)
      doc.text(`Liczba zgloszen: ${raportZgloszenia.length}`, 20, 48)

      let y = 60

      if (raportZgloszenia.length === 0) {
        doc.text("Brak zgloszen dla wybranych filtrow.", 20, y)
        doc.save("raport_zgloszen.pdf")
        return
      }

      doc.setFontSize(12)
      doc.text("Zestawienie zgloszen", 20, y)
      y += 8

      doc.setFontSize(8)

      raportZgloszenia.forEach((z, index) => {
        y = addNewPageIfNeeded(doc, y, 14)

        const row = [
          `${index + 1}.`,
          normalizeText(formatDate(z.createdAt)),
          normalizeText(z.tytul),
          normalizeText(z.typObiektu),
          normalizeText(formatStatus(z.status)),
          normalizeText(z.stopien)
        ]

        doc.text(row[0], 20, y)
        doc.text(row[1], 30, y)
        doc.text(doc.splitTextToSize(row[2], 45), 65, y)
        doc.text(doc.splitTextToSize(row[3], 35), 112, y)
        doc.text(row[4], 150, y)
        doc.text(row[5], 182, y)

        y += 10
      })

      doc.addPage()
      y = 20

      doc.setFontSize(14)
      doc.text("Szczegoly zgloszen", 20, y)
      y += 10

      for (let i = 0; i < raportZgloszenia.length; i += 1) {
        const z = raportZgloszenia[i]

        y = addNewPageIfNeeded(doc, y, 80)

        doc.setFontSize(12)
        doc.text(`Zgloszenie ${i + 1}`, 20, y)
        y += 8

        doc.setFontSize(9)

        y = addWrappedText(doc, "Tytul", z.tytul, 20, y, 170)
        y = addWrappedText(doc, "Data", formatDate(z.createdAt), 20, y, 170)
        y = addWrappedText(doc, "Typ obiektu", z.typObiektu, 20, y, 170)
        y = addWrappedText(doc, "Rodzaj uszkodzenia", z.rodzajUszkodzenia, 20, y, 170)
        y = addWrappedText(doc, "Stopien pilnosci", z.stopien, 20, y, 170)
        y = addWrappedText(doc, "Status", formatStatus(z.status), 20, y, 170)

        if (z.lat && z.lng) {
          y = addWrappedText(doc, "Lokalizacja", `${z.lat}, ${z.lng}`, 20, y, 170)

          const mapLink = `https://www.google.com/maps?q=${z.lat},${z.lng}`

          doc.setTextColor(0, 0, 255)
          doc.textWithLink("Otworz lokalizacje w Google Maps", 20, y, { url: mapLink })
          doc.setTextColor(0, 0, 0)

          y += 7
        }

        y = addWrappedText(doc, "Opis", z.opis, 20, y, 170)
        y += 3

        const photoUrl = getUploadUrl(z.zdjecie)

        if (photoUrl) {
          y = addNewPageIfNeeded(doc, y, 65)

          try {
            const imageBase64 = await imageUrlToBase64(photoUrl)
            const imageType = getImageType(z.zdjecie)

            doc.text("Dokumentacja fotograficzna:", 20, y)
            y += 5

            doc.addImage(imageBase64, imageType, 20, y, 80, 55)
            y += 63
          } catch (err) {
            doc.text("Nie udalo sie dolaczyc zdjecia do raportu.", 20, y)
            y += 7
          }
        } else {
          doc.text("Brak zdjecia.", 20, y)
          y += 7
        }

        y += 5
      }

      doc.save("raport_zgloszen.pdf")
    } catch (err) {
      console.error(err)
      setError("Nie udalo sie wygenerowac raportu PDF.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Generowanie raportu PDF">
      <div className="mx-auto flex w-full max-w-xl px-4 py-8 md:max-w-2xl lg:max-w-4xl md:py-12">
        <Card>
          <div className="w-full space-y-6 p-5 md:p-8">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generowanie raportu PDF
              </h1>

              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                Wybierz zakres dat i status zgloszen, a nastepnie wygeneruj raport
                dotyczacy obiektow hydrotechnicznych.
              </p>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Data od
                </label>
                <input
                  type="date"
                  value={dataOd}
                  onChange={(event) => setDataOd(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition [color-scheme:light] focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-darkborder dark:bg-darkbg dark:text-white dark:[color-scheme:dark]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Data do
                </label>
                <input
                  type="date"
                  value={dataDo}
                  onChange={(event) => setDataDo(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition [color-scheme:light] focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-darkborder dark:bg-darkbg dark:text-white dark:[color-scheme:dark]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition [color-scheme:light] focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-darkborder dark:bg-darkbg dark:text-white dark:[color-scheme:dark]"
                >
                  <option value="">Wszystkie</option>
                  <option value="open">Otwarte</option>
                  <option value="in_progress">W trakcie</option>
                  <option value="closed">Zamkniete</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={generujPDF}
                disabled={loading}
                className="min-h-[50px] rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generowanie..." : "Generuj PDF"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/obiekty")}
                className="min-h-[50px] rounded-xl border border-primary/40 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 dark:border-darkborder dark:bg-darkbg"
              >
                Powrot
              </button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default Raport