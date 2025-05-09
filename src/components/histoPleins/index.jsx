import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

function HistoPleins({ vehicule, suppressionPlein }) {
  const pleins = vehicule.pleins
  const pleinsTries = pleins.sort((a, b) => {
    return a.date !== b.date ? new Date(a.date) - new Date(b.date) : a.kilometrage - b.kilometrage
  })
  const [show, setShow] = useState(false)
  console.log(pleins)
  const formatedDate = dateToFormate => {
    const [annee, mois, jour] = dateToFormate.split('-')
    return `${jour}/${mois}/${annee}`
  }
  const suppPlein = index => suppressionPlein(index)

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShow(!show)} className="my-2">
        Historique des pleins
      </Button>
      {show &&
        pleinsTries.map((plein, index) => (
          <div key={index} className="d-flex w-100">
            <Card className="m-4 flex-grow-1">
              <Card.Body>
                <Card.Title>{`Le ${formatedDate(plein.date)} à ${plein.kilometrage}`}</Card.Title>
                <Card.Text>{`${plein.volume} L. pour ${plein.prix} €`}</Card.Text>
              </Card.Body>
            </Card>
            <Button className="my-4" variant="outline-warning" onClick={() => suppPlein(index)}>
              Suppression du plein
            </Button>
          </div>
        ))}
    </>
  )
}
export default HistoPleins
