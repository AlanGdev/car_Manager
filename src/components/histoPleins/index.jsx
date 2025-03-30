import { Card } from 'react-bootstrap'
function HistoPleins({ pleins }) {
  console.log(pleins)

  return (
    <>
      {pleins.map((plein, index) => (
        <Card key={index}>
          <Card.Body>
            <Card.Title>{`Le ${plein.date} à ${plein.kilometrage}`}</Card.Title>
            <Card.Text>{`${plein.volume} L. pour ${plein.prix} €`}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}
export default HistoPleins
