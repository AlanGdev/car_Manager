import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
function HistoPleins({ pleins }) {
  const [show, setShow] = useState(false)
  console.log(pleins)
  const formatedDate = dateToFormate => {
    const [annee, mois, jour] = dateToFormate.split('-')
    return `${jour}/${mois}/${annee}`
  }
  return (
    <>
      <Button variant="outline-primary" onClick={() => setShow(!show)}>
        {' '}
        Historique des pleins
      </Button>
      {show &&
        pleins.map((plein, index) => (
          <Card className="m-4" key={index}>
            <Card.Body>
              <Card.Title>{`Le ${formatedDate(plein.date)} à ${plein.kilometrage}`}</Card.Title>
              <Card.Text>{`${plein.volume} L. pour ${plein.prix} €`}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </>
  )
}
export default HistoPleins
