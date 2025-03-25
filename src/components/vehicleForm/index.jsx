import { Container } from 'react-bootstrap'
import { Form, FormControl, FormGroup, FormLabel, Button, Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function VehicleForm({ onSubmitForm }) {
  const [vehicleData, setVehicleData] = useState({
    marque: '',
    model: '',
    immatriculation: '',
    dateMiseEnCirculation: '',
    kilometrage: '',
    carburant: '',
    controleTechnique: '',
  })
  const [showAlert, setShowAlert] = useState(false)

  //Chargement des données existantes
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('vehicleData'))
    if (savedData) {
      setVehicleData(savedData)
    }
  }, [])

  // Mise à jour des champs
  const handleChange = e => {
    const { name, value } = e.target
    setVehicleData(prevData => ({ ...prevData, [name]: value }))
  }

  // Enregistrement dans le localStorage
  const handleSubmit = e => {
    e.preventDefault()
    localStorage.setItem('vehicleData', JSON.stringify(vehicleData))
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
      onSubmitForm()
    }, 2000)
  }
  return (
    <>
      <Container>
        <h2>Enregistrement du véhicule</h2>
        {showAlert && <Alert variant="success">Données enregistrées avec succès !</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Marque</FormLabel>
            <FormControl
              type="text"
              name="marque"
              value={vehicleData.marque}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Modèle</FormLabel>
            <FormControl
              type="text"
              name="model"
              value={vehicleData.model}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Immatriculation</FormLabel>
            <FormControl
              type="text"
              name="immatriculation"
              value={vehicleData.immatriculation}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Date Mise En Circulation</FormLabel>
            <FormControl
              type="date"
              name="dateMiseEnCirculation"
              value={vehicleData.dateMiseEnCirculation}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Kilométrage</FormLabel>
            <FormControl
              type="number"
              name="kilometrage"
              value={vehicleData.kilometrage}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Form.Group className="mb-3">
            <Form.Label>Type de carburant</Form.Label>
            <Form.Select name="carburant" value={vehicleData.carburant} onChange={handleChange}>
              <option value="">-- Sélectionner --</option>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Électrique">Électrique</option>
              <option value="Hybride">Hybride</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date de prochain contrôle technique</Form.Label>
            <Form.Control
              type="date"
              name="controleTechnique"
              value={vehicleData.controleTechnique}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enregistrer
          </Button>
        </Form>
      </Container>
    </>
  )
}
export default VehicleForm
