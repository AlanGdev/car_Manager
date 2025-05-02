import { Card, Alert } from 'react-bootstrap'
function Vehicule({ vehicule }) {
  if (!vehicule || !vehicule.params) {
    return <Alert variant="warning">Pas de véhicule enregistré</Alert>
  }

  return (
    <Card className="p-2">
      <Card.Title>
        {vehicule.params.marque} {vehicule.params.modele}
      </Card.Title>
      <Card.Body>Immatriculation: {vehicule.params.immatriculation}</Card.Body>
    </Card>
  )
}
export default Vehicule
