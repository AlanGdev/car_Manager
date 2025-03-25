import { Container, Alert, Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function CarburantForm({ onSubmitForm }) {
  // Initialisation des datas
  const [datas, setDatas] = useState({
    date: '',
    kilometrage: '',
    litres: '',
    prix: '',
  })

  //Initialisation du tableau des datas
  const [tabDatas, setTabDatas] = useState([])

  //Initialisation de l'Alerte de données enregistrées
  const [showAlert, setShowAlert] = useState(false)

  //Initialisation du dernier plein effectué
  const [dernierPlein, setDernierPlein] = useState({})

  // Récupération des données en local Storage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('pleins'))

    if (Array.isArray(savedData)) {
      savedData.sort((a, b) => {
        if (a.date < b.date) return 1
        if (a.date > b.date) return -1
        return b.kilometrage - a.kilometrage
      })
      setTabDatas(savedData)
    } else {
      setTabDatas([])
    }
    console.log(savedData)
  }, [])

  useEffect(() => {
    setDernierPlein(tabDatas[0])
  }, [tabDatas])

  //Mise à jour des données lors de la soumission
  const handleSubmit = e => {
    e.preventDefault()
    const updated = [...tabDatas, datas]
    localStorage.setItem('pleins', JSON.stringify(updated))
    setTabDatas(updated)

    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
      onSubmitForm()
    }, 2000)
  }
  const handleChange = e => {
    const { name, value } = e.target
    setDatas(prevDatas => ({ ...prevDatas, [name]: value }))
  }
  return (
    <>
      <Container className="mt-3">
        {tabDatas.length === 0 && <Alert variant="danger">Pas de données pour le moment</Alert>}
        {showAlert && <Alert variant="success">Données enregistrées avec succès</Alert>}
        {dernierPlein && (
          <p>{`Dernier plein effectué le ${dernierPlein.date} à ${dernierPlein.kilometrage} Km.`}</p>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Date du plein</FormLabel>
            <FormControl type="date" name="date" value={datas.date} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <FormLabel>Kilométrage</FormLabel>
            <FormControl
              type="number"
              name="kilometrage"
              value={datas.kilometrage}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Volume en litres</FormLabel>
            <FormControl
              type="number"
              step="0.01"
              name="litres"
              value={datas.litres}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Prix</FormLabel>
            <FormControl
              type="number"
              step="0.01"
              name="prix"
              value={datas.prix}
              onChange={handleChange}
            />
          </FormGroup>
          <Button variant="primary" type="submit">
            Enregistrer
          </Button>
        </Form>
      </Container>
    </>
  )
}
export default CarburantForm
