import { useState, useEffect } from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line, Legend } from 'recharts'

function KmsJournalier({ vehicule }) {
  const [showGraph, setShowGraph] = useState(false)
  const pleins = vehicule.pleins
  const [kmsJournalier, setKmsJournalier] = useState([])
  useEffect(() => {
    const tableau = []
    if (pleins.length > 1) {
      pleins.forEach((plein, index) => {
        if (index > 0) {
          const nbJours = (new Date(plein.date) - new Date(pleins[0].date)) / (1000 * 60 * 60 * 24)
          console.log('nb Jours: ' + nbJours)
          const kmsParcourus = plein.kilometrage - pleins[0].kilometrage
          const kilometrage = kmsParcourus / nbJours
          console.log('nbKms Jour: ' + kilometrage)

          tableau.push({ date: plein.date, kilometrage })
        }
      })
    }
    setKmsJournalier(tableau)
  }, [])
  return (
    <Container>
      {showGraph ? '' : ''}
      <Card className="m-2 p-2 bg-light">
        <Card.Title className="d-flex justify-content-between align-items-center">
          <div>
            kilométrage journalier:{' '}
            <span
              className={
                kmsJournalier.length > 1 &&
                kmsJournalier[kmsJournalier.length - 1].kilometrage <
                  kmsJournalier[kmsJournalier.length - 2].kilometrage
                  ? 'bg-success text-light px-2 rounded'
                  : 'bg-danger text-light px-2 rounded'
              }
            >
              {kmsJournalier.length > 0
                ? kmsJournalier[kmsJournalier.length - 1].kilometrage.toFixed(2)
                : '...'}
            </span>
            Kms/jour
          </div>
          <Button variant="outline-primary" onClick={() => setShowGraph(!showGraph)}>
            {showGraph ? 'Masquer Graph' : 'Afficher Graph'}
          </Button>
        </Card.Title>

        {kmsJournalier.length > 1 &&
        kmsJournalier[kmsJournalier.length - 1].kilometrage <
          kmsJournalier[kmsJournalier.length - 2].kilometrage ? (
          <p className="text-success text-center fw-bold">Tendance à la baisse !</p>
        ) : (
          <p className="text-danger text-center fw-bold">Tendance à la hausse...</p>
        )}

        {showGraph ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={kmsJournalier}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} unit="kms" />
              <Legend />
              <Line dataKey="kilometrage" stroke="#82ca9d" name="kilométrage journalier" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          ''
        )}
      </Card>
    </Container>
  )
}
export default KmsJournalier
