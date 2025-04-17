import { useState, useEffect } from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line, Legend } from 'recharts'
function CoutJournalier({ vehicule }) {
  const [coutJournalier, setCoutJournalier] = useState([])
  const [showGraph, setShowGraph] = useState(false)
  const pleins = vehicule.pleins

  useEffect(() => {
    const tableau = []
    if (pleins.length > 1) {
      pleins.forEach((plein, index) => {
        if (index > 0 && index < pleins.length - 1) {
          const nbJours = (new Date(plein.date) - new Date(pleins[0].date)) / (1000 * 60 * 60 * 24)
          console.log('nb jours' + nbJours)
          const cout = pleins.slice(0, index).reduce((acc, plein) => acc + Number(plein.prix), 0)
          console.log('coût: ' + cout)
          const coutParJour = nbJours > 0 ? Number((cout / nbJours).toFixed(2)) : 0
          const datas = { date: plein.date, cout: coutParJour }
          console.log(datas)
          tableau.push(datas)
        }
      })
    }
    console.log(tableau)
    setCoutJournalier(tableau)
  }, [])

  return (
    <Container>
      {showGraph ? '' : ''}
      <Card className="m-2 p-2 bg-light">
        <Card.Title className="d-flex justify-content-between align-items-center">
          <div>
            Coût journalier{' '}
            <span
              className={
                coutJournalier.length > 1 &&
                coutJournalier[coutJournalier.length - 1].cout <=
                  coutJournalier[coutJournalier.length - 2].cout
                  ? 'bg-success text-light px-2 rounded'
                  : 'bg-danger text-light px-2 rounded'
              }
            >
              {coutJournalier.length >= 1
                ? coutJournalier[coutJournalier.length - 1].cout.toFixed(2)
                : '...'}
            </span>
            €/jour
          </div>
          <Button variant="outline-primary" onClick={() => setShowGraph(!showGraph)}>
            {showGraph ? 'Masquer Graph' : 'Afficher Graph'}
          </Button>
        </Card.Title>

        {coutJournalier.length > 1 &&
        coutJournalier[coutJournalier.length - 1].cout <
          coutJournalier[coutJournalier.length - 2].cout ? (
          <p className="text-success text-center fw-bold">Tendance à la baisse !</p>
        ) : (
          <p className="text-danger text-center fw-bold">Tendance à la hausse...</p>
        )}

        {showGraph ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={coutJournalier}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} unit="€" />
              <Legend />
              <Line dataKey="cout" stroke="#D96F4E" name="Coût journalier" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          ''
        )}
      </Card>
    </Container>
  )
}
export default CoutJournalier
