import { Container, Alert, Button, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import VehiculeForm from '../../components/vehiculeForm'
import Vehicule from '../../components/vehicule'
import PleinForm from '../../components/pleinForm'
import HistoPleins from '../../components/histoPleins'
import GraphKilometrageEvolution from '../../components/graphKilometrage'
import GraphPrixLitre from '../../components/graphPrixLitre'

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
    setModalPlein(false)

    if (!datas) return
    console.log(datas, vehicule)
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
  const handleDeletePlein = index => {
    const pleins = vehicule.pleins || []
    const newDatas = pleins.filter((_, i) => i !== index)
    const newVehicule = { ...vehicule, pleins: newDatas }
    setVehicule(newVehicule)
    localStorage.setItem('vehicule', JSON.stringify(newVehicule))
  }
  return (
    <Container className="w-100">
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
          <div className="p-2 d-flex w-100">
            <Vehicule vehicule={vehicule} className="flex-grow-1" />
            <Button variant="primary" onClick={showModalPlein}>
              Ajouter un plein
            </Button>
          </div>
          {modalPlein && <PleinForm showModal={modalPlein} closeModalPlein={closeModalPlein} />}
          <HistoPleins pleins={vehicule.pleins} suppressionPlein={handleDeletePlein} />
          <GraphKilometrageEvolution pleins={vehicule.pleins} />
          <GraphPrixLitre pleins={vehicule.pleins} />
        </div>
      )}
    </Container>
  )
}
export default Home
