function MoyenneConsommation({ vehicule }) {
  const pleins = vehicule.pleins
  const premierPlein = pleins[0]
  const dernierPlein = pleins[pleins.length - 1]
  const kmsParcourus = dernierPlein.kilometrage - premierPlein.kilometrage
  const consommation =
    pleins.reduce((totalConsomme, plein) => {
      return Number(totalConsomme) + Number(plein.volume)
    }, 0) - Number(premierPlein.volume)
  const consoMoyenne = (consommation / kmsParcourus) * 100
  return (
    <>
      <h2>Conso Moyenne: {consoMoyenne.toFixed(2)}L/100</h2>
    </>
  )
}
export default MoyenneConsommation
