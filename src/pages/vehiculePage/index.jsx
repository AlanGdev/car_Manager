import Vehicule from '../../components/vehicule'
function VehiculePage() {
  const vehicule = JSON.parse(localStorage.getItem('vehicule'))

  return (
    <>
      <Vehicule vehicule={vehicule} />
    </>
  )
}
export default VehiculePage
