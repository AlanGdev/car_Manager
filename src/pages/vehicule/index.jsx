import { Container, Button } from 'react-bootstrap'
import { useState } from 'react'
import VehicleForm from '../../components/vehicleForm'
import Vehicle from '../../components/vehicle'
import CarburantForm from '../../components/carburantForm'

function Vehicule() {
  const [enregistrementVehicule, showEnregistrementVehicule] = useState(false)
  const [priseCarburant, showPriseCarburant] = useState(false)
  return (
    <>
      <Container className="mb-3 gap-3">
        <Vehicle />
        <Button
          variant="danger"
          onClick={() => {
            showEnregistrementVehicule(true)
          }}
        >
          Enregistrement ou mise à jour du véhicule
        </Button>
        {enregistrementVehicule && (
          <VehicleForm onSubmitForm={() => showEnregistrementVehicule(false)} />
        )}
      </Container>
      <Container>
        <Button variant="primary" onClick={() => showPriseCarburant(true)}>
          Enregistrer une prise de carburant
        </Button>
        {priseCarburant && <CarburantForm onSubmitForm={() => showPriseCarburant(false)} />}
      </Container>
    </>
  )
}
export default Vehicule
