import { Button, Modal } from "react-bootstrap";
import "./Modal.css";

export function ModalDelete(props) {
  const { show, handleClose, onDelete, mensagem, id } = props;

  return (
    <Modal show={show} onHide={handleClose} centered className="modal-centered">
      <Modal.Header>
        <Modal.Title>
          <i className="bi bi-x-octagon bi-lg delete-icon"></i>
        <Modal.Body className="modal-body">{mensagem}</Modal.Body>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => onDelete(id)}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
