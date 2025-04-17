import { useEffect, useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line, Legend } from 'recharts'

function Consommation({ vehicule }) {
  const [consoPlein, setConsoPlein] = useState([])
  const [consoMoyenne, setConsoMoyenne] = useState([])
  const [graphData, setGraphData] = useState([])
  const [showGraph, setShowGraph] = useState(false)
  const pleins = vehicule.pleins

  useEffect(() => {
    const tableau = []
    pleins.forEach((plein, index) => {
      if (index > 0) {
        const date = plein.date
        const kilometrage = plein.kilometrage - pleins[index - 1].kilometrage
        const moyenne = Number(((pleins[index - 1].volume / kilometrage) * 100).toFixed(2))
        tableau.push({ date, moyenne })
      }
    })
    setConsoPlein(tableau)
    console.log(tableau)
  }, [])

  useEffect(() => {
    const tableau = []
    pleins.forEach((plein, index) => {
      if (index > 0) {
        const kilometrage = plein.kilometrage - pleins[0].kilometrage

        const volume = pleins.slice(0, index).reduce((acc, p) => acc + Number(p.volume), 0)

        const moyenne = (volume / kilometrage) * 100
        tableau.push({ date: plein.date, moyenne })
      }
    })
    setConsoMoyenne(tableau)
  }, [])

  useEffect(() => {
    const fusion = consoPlein.map((plein, i) => ({
      date: plein.date,
      moyennePlein: plein.moyenne,
      moyenneCumulee: consoMoyenne[i]?.moyenne || 0,
    }))
    setGraphData(fusion)
  }, [consoPlein, consoMoyenne])

  return (
    <Container>
      <Card className="m-2 p-0 bg-light">
        <Card.Title className="d-flex align-items-stretch m-0">
          <div className=" d-flex flex-column flex-grow-1">
            <p>
              Conso Moyenne:{' '}
              <span
                className={
                  consoMoyenne.length > 2 &&
                  consoMoyenne[consoMoyenne.length - 1].moyenne <=
                    consoMoyenne[consoMoyenne.length - 2].moyenne
                    ? 'bg-success text-light px-2 rounded'
                    : 'bg-danger text-light px-2 rounded'
                }
              >
                {consoMoyenne.length > 0
                  ? consoMoyenne[consoMoyenne.length - 1].moyenne.toFixed(2)
                  : '...'}
              </span>
              L/100kms
            </p>

            <div>
              {consoMoyenne.length > 1 &&
              consoMoyenne[consoMoyenne.length - 1].moyenne <
                consoMoyenne[consoMoyenne.length - 2].moyenne ? (
                <p className="text-success text-center fw-bold">Tendance à la baisse !</p>
              ) : (
                <p className="text-danger text-center fw-bold">Tendance à la hausse...</p>
              )}
            </div>
          </div>
          <div className="d-flex align-items-stretch ms-2">
            <Button
              className="h-100 "
              variant="outline-primary"
              onClick={() => setShowGraph(!showGraph)}
            >
              {showGraph ? 'Masquer Graph' : 'Afficher Graph'}
            </Button>
          </div>
        </Card.Title>

        {showGraph && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} unit="" />
              <Legend />
              <Line dataKey="moyennePlein" stroke="#2F5F63" name="Conso plein" />
              <Line dataKey="moyenneCumulee" stroke="#A5C8CA" name="Conso moyenne" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>
    </Container>
  )
}

export default Consommation
