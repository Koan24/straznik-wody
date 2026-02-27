import { useNavigate } from "react-router-dom"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import { jsPDF } from "jspdf"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

function Raport() {
  const navigate = useNavigate()
  const { zgloszenia } = useZgloszenia()

  const generujPDF = () => {
    const doc = new jsPDF()

    const normalize = (text) =>
      text
        .replace(/ą/g, "a")
        .replace(/ć/g, "c")
        .replace(/ę/g, "e")
        .replace(/ł/g, "l")
        .replace(/ń/g, "n")
        .replace(/ó/g, "o")
        .replace(/ś/g, "s")
        .replace(/ż/g, "z")
        .replace(/ź/g, "z")

    doc.setFontSize(16)
    doc.text(normalize("Raport zgłoszeń"), 20, 20)

    doc.setFontSize(10)
    doc.text(`Data wygenerowania: ${new Date().toLocaleString()}`, 20, 30)

    let y = 40

    if (zgloszenia.length === 0) {
      doc.text(normalize("Brak zgłoszeń."), 20, y)
    } else {
      zgloszenia.forEach((z, index) => {
        const link = `https://www.google.com/maps?q=${z.lat},${z.lng}`

        doc.text(`Zgloszenie ${index + 1}`, 20, y)
        y += 6
        doc.text(`Tytul: ${normalize(z.tytul)}`, 20, y)
        y += 6
        doc.text(`Opis: ${normalize(z.opis)}`, 20, y)
        y += 6

        doc.text("Lokalizacja (Google Maps):", 20, y)
        y += 6

        doc.setTextColor(0, 0, 255)
        doc.textWithLink(link, 20, y, { url: link })
        doc.setTextColor(0, 0, 0)

        y += 12

        if (y > 270) {
          doc.addPage()
          y = 20
        }
      })
    }

    doc.save("raport_zgloszen.pdf")
  }

  return (
    <Layout title="Generowanie raportu PDF">
      <Card>
        <div className="space-y-6">

          <div className="text-gray-600 dark:text-gray-300">
            Wygeneruj raport PDF zawierający wszystkie zgłoszenia
            wraz z linkiem do lokalizacji w Google Maps.
          </div>

          <div className="flex gap-4">
            <Button variant="primary" onClick={generujPDF}>
              Generuj PDF
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/obiekty")}
            >
              Powrót
            </Button>
          </div>

        </div>
      </Card>
    </Layout>
  )
}

export default Raport