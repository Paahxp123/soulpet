import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import avatar from "../../assets/vet.png";
import { toast } from "react-hot-toast";
import "./style.css";

export function PetSingle() {
  const [cliente, setCliente] = useState({});
  const [pet, setPet] = useState({});
  const [show, setShow] = useState(false);
  const [idPet, setIdPet] = useState(null);
  const navigate = useNavigate(); // adicionado

  const { id } = useParams();
  const dataNasc = new Date(`${pet.dataNasc}T00:00:00`);

  const handleClose = () => {
    setIdPet(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setIdPet(id);
    setShow(true);
  };

  function onDelete() {
    axios
      .delete(`http://localhost:3001/pets/${idPet}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/pets"); // adicionado
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/pets/${id}`)
      .then((response) => {
        setPet(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (pet.clienteId) {
      axios
        .get(`http://localhost:3001/clientes/${pet.clienteId}`)
        .then((response) => {
          setCliente(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pet]);

  return (
    <div className="container-singlePet">
      <div className="container">
        <Button as={Link} to="/pets" className="btn-brown mb-5">
          <i className="bi bi-arrow-bar-left"></i> Voltar
        </Button>
        <h1>Dados do pet</h1>
        <div className="card-container">
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="avatar-pet">
              <img src={avatar} alt="SoulPet" />
            </div>
            <h3>{pet.nome}</h3>
          </div>
          <Card key={pet.id} className="card-pet card-singlePage">
            <Card.Body className="card-body">
              <span>Nome:</span>
              <Card.Title>
                {pet.nome?.charAt(0).toUpperCase() + pet.nome?.slice(1)}
              </Card.Title>
              <span>Raça:</span>
              <Card.Title>
                {pet.tipo?.charAt(0).toUpperCase() + pet.tipo?.slice(1)}
              </Card.Title>
              <span>Porte:</span>
              <Card.Title>
                {pet.porte?.charAt(0).toUpperCase() + pet.porte?.slice(1)}
              </Card.Title>
              <span>Dono:</span>
              <Card.Title>
                {cliente.nome && cliente.nome.split(" ").slice(0, 2).join(" ")}
              </Card.Title>
              <span>Nascimento:</span>
              <Card.Title>{dataNasc.toLocaleDateString("pt-BR")}</Card.Title>
            </Card.Body>
            <div className="container-btn-pets">
              <Button onClick={() => handleShow(pet.id)}>
                <i className="bi bi-trash-fill"></i>
              </Button>
              <Link to={`/pets/editar/${pet.id}`}>
                <Button>
                  <i className="bi bi-pencil-fill"></i>
                </Button>
              </Link>
            </div>
          </Card>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja excluir o pet {pet.nome}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={onDelete}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
