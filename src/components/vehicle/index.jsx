import { Alert } from 'react-bootstrap'
function Vehicle() {
  const vehicleData = JSON.parse(localStorage.getItem('vehicleData'))

  console.log(vehicleData)
  return (
    <>
      {!vehicleData && <Alert variant="danger">Aucun véhicule enregistré...</Alert>}
      {vehicleData && <h2>{`${vehicleData.marque} ${vehicleData.model}`}</h2>}
    </>
  )
}
export default Vehicle
