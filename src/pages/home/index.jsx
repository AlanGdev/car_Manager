import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Vehicule from '../../components/vehicule'
import VehiculeForm from '../../components/vehiculeForm'
import PleinForm from '../../components/pleinForm'
import Consommation from '../../components/consommation'
import CoutJournalier from '../../components/coutJournalier'
import KmsJournalier from '../../components/kmsJournalier'
import PrixAuLitre from '../../components/prixAuLitre'
import fichier from '../../assets/vehicule_honda_civic_sport.json'
import HistoPleins from '../../components/histoPleins'

function Home() {
  const [vehicule, setVehicule] = useState(null)
  /*useEffect(() => {
    localStorage.setItem('vehicule', JSON.stringify(fichier))
  })*/

  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem('vehicule'))
    console.log(JSON.stringify(datas))
    datas
      ? console.log('vehicule présent')
      : localStorage.setItem('vehicule', JSON.stringify(fichier))
    setVehicule(datas)
  }, [])

  const maj = (key, datas) => {
    const newDatas = { ...vehicule, [key]: datas }
    setVehicule(newDatas)
    localStorage.setItem('vehicule', JSON.stringify(newDatas))
  }

  return (
    <Container className="flex-grow-1">
      {/*<p>{JSON.stringify(vehicule)}</p>*/}
      {vehicule?.params ? (
        <>
          <Row className="g-2 mb-2">
            {' '}
            <Col xs={9}>
              <Vehicule vehicule={vehicule} />
            </Col>
            <Col xs={3} className="flex-grow-1">
              <PleinForm vehicule={vehicule} maj={maj} />
            </Col>
          </Row>
          <Row>
            <HistoPleins vehicule={vehicule} />
          </Row>
          <Row className="g-2 mb-2">
            <Col md={6}>
              <Consommation vehicule={vehicule} />
            </Col>
            <Col md={6}>
              <CoutJournalier vehicule={vehicule} />
            </Col>
          </Row>
          <Row className="g-2 mb-2">
            <Col md={6}>
              <KmsJournalier vehicule={vehicule} />
            </Col>
            <Col md={6}>
              <PrixAuLitre vehicule={vehicule} />
            </Col>
          </Row>
        </>
      ) : (
        <VehiculeForm maj={maj} />
      )}
    </Container>
  )
}
export default Home
