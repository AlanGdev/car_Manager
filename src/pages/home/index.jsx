import { Container, Alert, Button, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import VehiculeForm from '../../components/vehiculeForm'
import Vehicule from '../vehicule'
import PleinForm from '../../components/pleinForm'
import HistoPleins from '../../components/histoPleins'

function Home() {
  const [vehicule, setVehicule] = useState({})
  const [modalVehicule, setModalVehicule] = useState(false)

  const [modalPlein, setModalPlein] = useState(false)

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

  const showModalPlein = () => {
    setModalPlein(true)
  }
  const closeModalPlein = datas => {
    console.log(datas, vehicule)
    setModalPlein(false)
    let newDatas = []
    try {
      const pleins = vehicule.pleins
      console.log(`pleins: ${pleins}`)
      if (pleins === undefined) {
        throw new Error("Pas de données pleins dans l'historique")
      }
      newDatas = [...pleins, datas]
    } catch (err) {
      console.log(err.message)
      newDatas = [{ ...datas }]
      console.log(newDatas)
    }
    newDatas.sort((a, b) => {
      if (a.date < b.date) return 1
      if (a.date > b.date) return -1
      return b.kilometrage - a.kilometrage
    })
    const vehiculeUpdated = { ...vehicule, ['pleins']: newDatas }
    setVehicule(vehiculeUpdated)
    console.log(vehiculeUpdated)
    localStorage.setItem('vehicule', JSON.stringify(vehiculeUpdated))
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
        <div>
          <div className="d-flex m-2">
            <Vehicule vehicule={vehicule} />
            <Button variant="primary" onClick={showModalPlein}>
              Ajouter un plein
            </Button>
          </div>
          {modalPlein && <PleinForm showModal={modalPlein} closeModalPlein={closeModalPlein} />}
          <HistoPleins pleins={vehicule.pleins} />
        </div>
      )}
    </Container>
  )
}
export default Home
