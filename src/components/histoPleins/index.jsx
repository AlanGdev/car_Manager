import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
function HistoPleins({ pleins, suppressionPlein }) {
  const [show, setShow] = useState(false)
  console.log(pleins)
  const formatedDate = dateToFormate => {
    const [annee, mois, jour] = dateToFormate.split('-')
    return `${jour}/${mois}/${annee}`
  }
  const suppPlein = index => suppressionPlein(index)

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShow(!show)}>
        Historique des pleins
      </Button>
      {show &&
        pleins.map((plein, index) => (
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
