import { useState, useEffect } from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line, Legend } from 'recharts'
import imgCoutJournalier from '../../assets/coutJournalier.png'

function CoutJournalier({ vehicule }) {
  const [coutJournalier, setCoutJournalier] = useState([])
  const [showGraph, setShowGraph] = useState(false)
  const pleins = vehicule.pleins || []

  useEffect(() => {
    const tableau = []
    if (pleins.length > 1) {
      pleins.forEach((plein, index) => {
        if (index > 0 && index < pleins.length - 1) {
          const nbJours = (new Date(plein.date) - new Date(pleins[0].date)) / (1000 * 60 * 60 * 24)
          //console.log('nb jours' + nbJours)
          const cout = pleins.slice(0, index).reduce((acc, plein) => acc + Number(plein.prix), 0)
          //console.log('coût: ' + cout)
          const coutParJour = nbJours > 0 ? Number((cout / nbJours).toFixed(2)) : 0
          console.log('nbjours: ' + nbJours + ' cout: ' + cout + ' cout par jour: ' + coutParJour)
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
    <div className="">
      <Card className="bg-light">
        <Row>
          <Col xs={3} className="d-flex align-items-center">
            <Card.Img
              className=" object-fit-contain"
              style={{ width: '100px' }}
              variant="start"
              src={imgCoutJournalier}
            />
          </Col>
          <Col xs={9}>
            <Card.Title className="flex-grow-1 p-2">
              <div className="">
                <p>
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
                </p>
              </div>
              <div>
                {coutJournalier.length > 1 &&
                coutJournalier[coutJournalier.length - 1].cout <
                  coutJournalier[coutJournalier.length - 2].cout ? (
                  <p className="text-success text-center fw-bold">En dessous de la moyenne !</p>
                ) : (
                  <p className="text-danger text-center fw-bold">Au dessus de la moyenne...</p>
                )}
              </div>
              <div className="text-end mx-2">
                <Button variant="outline-primary" onClick={() => setShowGraph(!showGraph)}>
                  {showGraph ? 'Masquer Graph' : 'Afficher Graph'}
                </Button>
              </div>
            </Card.Title>
          </Col>
        </Row>

        {showGraph ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={coutJournalier}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} unit="€" />
              <Legend />
              <Line dataKey="cout" stroke="#D96F4E" name="Coût journalier" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          ''
        )}
      </Card>
    </div>
  )
}
export default CoutJournalier
