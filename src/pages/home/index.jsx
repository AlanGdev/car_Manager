import { Container, Alert, Button, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import VehiculeForm from '../../components/vehiculeForm'
import Vehicule from '../vehicule'

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
  const closeModalVehicule = datas => {
    setModalVehicule(false)
    setVehicule(datas)
    console.log('retour au parent du véhicule:')
    console.log(datas)
    localStorage.setItem('vehicule', JSON.stringify(datas))
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
            <VehiculeForm
              show={modalVehicule}
              closeModalVehicule={datas => closeModalVehicule(datas)}
            />
          )}
        </>
      ) : (
        <div className="d-flex m-2">
          <Vehicule vehicule={vehicule} />
          <Button variant="primary">Ajouter un plein</Button>
        </div>
      )}
    </Container>
  )
}
export default Home
