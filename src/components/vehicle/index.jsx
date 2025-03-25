function Vehicle() {
  const vehicleData = JSON.parse(localStorage.getItem('vehicleData'))

  console.log(vehicleData)
  return (
    <>
      <h2>{`${vehicleData.marque} ${vehicleData.model}`}</h2>
    </>
  )
}
export default Vehicle
