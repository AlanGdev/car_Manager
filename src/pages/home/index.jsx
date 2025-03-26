import { Container, Alert, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import VehiculeForm from '../../components/vehiculeForm'

function Home() {
  const [vehicule, setVehicule] = useState({})
  const [modalVehicule, setModalVehicule] = useState(false)

  useEffect(() => {
    try {
      const localVehicule = localStorage.getItem('vehicule')
      const vehiculeData = localVehicule ? JSON.parse(localVehicule) : {}
      setVehicule(vehiculeData)
    } catch (error) {
      console.log({ 'Erreur:': error.message })
    }
  }, [])

  const showModalVehicule = () => {
    setModalVehicule(true)
  }
  const closeModalVehicule = () => {
    setModalVehicule(false)
  }

  return (
    <Container className="m-2">
      {!Object.keys(vehicule).length ? (
        <>
          <Alert variant="warning">Aucun véhicule identifié</Alert>
          <Button variant="outline-warning" onClick={showModalVehicule}>
            Déclarer un véhicule
          </Button>
          {modalVehicule && (
            <VehiculeForm show={modalVehicule} closeModalVehicule={() => closeModalVehicule()} />
          )}
        </>
      ) : (
        ''
      )}
    </Container>
  )
}
export default Home
