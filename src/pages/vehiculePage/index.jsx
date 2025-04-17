import { Card, Container } from 'react-bootstrap'
import Vehicule from '../../components/vehicule'
function VehiculePage() {
  const vehicule = JSON.parse(localStorage.getItem('vehicule'))
  const pleins = vehicule.pleins
  const finalIndex = pleins.length - 1
  const initialDate = pleins[0].date
  const initialKms = pleins[0].kilometrage
  const finalKms = pleins[finalIndex].kilometrage

  const formatDate = date => {
    const [aaaa, mm, dd] = date.split('-')
    return `${dd}-${mm}-${aaaa}`
  }
  const coutTotal = pleins.reduce((acc, plein) => Number(acc) + Number(plein.prix), 0)
  return (
    <>
      <Container className="flex-grow-1">
        <Vehicule vehicule={vehicule} />
        <Card>
          <Card.Body>
            <Card.Title>Informations</Card.Title>
            <Card.Text>
              <p>
                Total kms parcourus depuis le {formatDate(initialDate)} : {finalKms - initialKms}
              </p>
              <p>Total dépensé dans le vehicule: {coutTotal.toFixed(2)}€</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
export default VehiculePage
