import { Card } from 'react-bootstrap'
function Vehicule({ vehicule }) {
  return (
    <Card className="p-2">
      <Card.Title>
        {vehicule.marque} {vehicule.modele}
      </Card.Title>
      <Card.Body>Immatriculation: {vehicule.immatriculation}</Card.Body>
    </Card>
  )
}
export default Vehicule
