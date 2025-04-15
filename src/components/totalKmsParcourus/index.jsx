function TotalKmsParcourus({ vehicule }) {
  const pleins = vehicule.pleins || []
  if (pleins.length < 2) {
    return <h2>Pas assez de données pour évaluer le nombre de kilomètres parcourus</h2>
  }
  const dernierPlein = pleins[0]
  const premierPlein = pleins[pleins.length - 1]
  const totalKms = dernierPlein.kilometrage - premierPlein.kilometrage
  return <h2>Total kms parcourus: {totalKms}</h2>
}
export default TotalKmsParcourus
