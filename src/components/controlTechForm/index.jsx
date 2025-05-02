import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

function ControlTechForm({ vehicule, maj }) {
  const [showModal, setShowModal] = useState(false)

  const [datas, setDatas] = useState({
    date: '',
    kilometrage: '',
    prix: '',
  })
  const controlTechs = vehicule?.controlTechs || []

  const handleSubmit = e => {
    e.preventDefault()
    const newDatas = [...controlTechs, datas]
    newDatas.sort((a, b) => {
      if (a.date != b.date) return new Date(a.date) - new Date(b.date)
      return a.kilometrage - b.kilometrage
    })

    maj('controlTechs', newDatas)
    setShowModal(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setDatas({ ...datas, [name]: value })
  }

  return (
    <>
      <Button
        type="button"
        variant="outline-primary"
        className="h-100 w-100 mb-2"
        onClick={() => setShowModal(true)}
      >
        Ajouter un contrôle technique effectué
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nouveau contrôle technique</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Control
                type="date"
                value={datas.date}
                name="date"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Kilométrage au contrôle"
                type="number"
                step="1"
                name="kilometrage"
                value={datas.kilometrage}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Prix"
                type="number"
                step="0.01"
                name="prix"
                value={datas.prix}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date prochain contrôle</Form.Label>
              <Form.Control
                type="date"
                value={datas.dateProx}
                name="date"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit">Valider</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ControlTechForm
