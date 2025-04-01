import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

function PleinForm({ showModal, closeModalPlein }) {
  //console.log(vehicule)
  const [datas, setDatas] = useState({
    date: '',
    kilometrage: '',
    volume: '',
    prix: '',
  })

  const handleClose = () => {
    closeModalPlein(null)
  }

  const handleSubmit = e => {
    e.preventDefault()
    closeModalPlein(datas)
  }
  const handleChange = e => {
    const { name, value } = e.target
    const newDatas = { ...datas, [name]: value }
    setDatas(newDatas)
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nouveau Plein</Modal.Title>
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
                placeholder="Kilométrage lors du plein"
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
                placeholder="Volume en litres"
                type="number"
                step="0.01"
                name="volume"
                value={datas.volume}
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
            <Button type="submit">Valider</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default PleinForm
