function CoutTotalCarburant({ vehicule }) {
  const pleins = vehicule.pleins
  const coutTotal = pleins.reduce((total, plein) => {
    return Number(total) + Number(plein.prix)
  }, 0)
  return <h2>Coût total du carburant: {coutTotal} € </h2>
}
export default CoutTotalCarburant
