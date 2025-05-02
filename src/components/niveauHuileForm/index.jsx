import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

function NiveauHuileForm({ vehicule, maj }) {
  const [showModal, setShowModal] = useState(false)

  const [datas, setDatas] = useState({
    date: '',
    kilometrage: '',
    prix: '',
  })
  const vidanges = vehicule?.vidanges || []

  const handleSubmit = e => {
    e.preventDefault()
    const newDatas = [...vidanges, datas]
    newDatas.sort((a, b) => {
      if (a.date != b.date) return new Date(a.date) - new Date(b.date)
      return a.kilometrage - b.kilometrage
    })

    maj('vidanges', newDatas)
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
        Vérification du niveau d'huile
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Vérification du niveau d'huile</Modal.Title>
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
                placeholder="Kilométrage lors de la vérif."
                type="number"
                step="1"
                name="kilometrage"
                value={datas.kilometrage}
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

export default NiveauHuileForm
