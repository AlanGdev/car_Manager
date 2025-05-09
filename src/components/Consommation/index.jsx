import { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Legend,
  Tooltip,
} from 'recharts'
import imgConsommation from '../../assets/consoMoyenne.png'

function Consommation({ vehicule }) {
  const [consoPlein, setConsoPlein] = useState([])
  const [consoMoyenne, setConsoMoyenne] = useState([])
  const [graphData, setGraphData] = useState([])
  const [showGraph, setShowGraph] = useState(false)
  const pleins = vehicule.pleins || []

  useEffect(() => {
    const tableau = []
    pleins.forEach((plein, index) => {
      if (index > 0) {
        const date = plein.date
        const kilometrage = plein.kilometrage - pleins[index - 1].kilometrage
        const moyenne = Number(((plein.volume / kilometrage) * 100).toFixed(2))
        tableau.push({ date, moyenne })
      }
    })
    setConsoPlein(tableau)
    console.log(tableau)
  }, [pleins])

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
  }, [pleins])

  useEffect(() => {
    const fusion = consoPlein.map((plein, i) => ({
      date: plein.date,
      moyennePlein: plein.moyenne,
      moyenneCumulee: consoMoyenne[i]?.moyenne || 0,
    }))
    setGraphData(fusion)
  }, [consoPlein, consoMoyenne])

  return (
    <div className="">
      <Card className="bg-light">
        <Row>
          <Col xs={3} className="d-flex align-items-center">
            <Card.Img
              className=" object-fit-contain"
              style={{ width: '100px' }}
              variant="start"
              src={imgConsommation}
            />
          </Col>
          <Col xs={9}>
            <Card.Title className="flex-grow-1 p-2">
              <div className="">
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
                    <p className="text-success text-center fw-bold">En dessous de la moyenne !</p>
                  ) : (
                    <p className="text-danger text-center fw-bold">Au dessus de la moyenne...</p>
                  )}
                </div>
              </div>
              <div className="text-end mx-2">
                <Button
                  className=""
                  variant="outline-primary"
                  onClick={() => setShowGraph(!showGraph)}
                >
                  {showGraph ? 'Masquer Graph' : 'Afficher Graph'}
                </Button>
              </div>
            </Card.Title>
          </Col>
        </Row>

        {showGraph && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} unit="" />
              <Legend />
              <Tooltip />
              <Line dataKey="moyennePlein" stroke="#2F5F63" name="Conso plein" dot={false} />
              <Line dataKey="moyenneCumulee" stroke="#FF0000" name="Conso moyenne" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  )
}

export default Consommation
