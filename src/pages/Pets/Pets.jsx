import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import avatar from "../../assets/icons/id-card.png";
import { toast } from "react-hot-toast";
import { ModalDelete } from "../../components/Modal/Modal";
import "./style.css";

export function Pets() {
  const [pets, setPets] = useState(null);
  const [show, setShow] = useState(false);
  const [idPet, setIdPet] = useState(null);
  
  const navigate = useNavigate();
  const handleClose = () => {
    setIdPet(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setIdPet(id);
    setShow(true);
  };


  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/pets")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function onDelete() {
    axios
      .delete(`http://localhost:3001/pets/${idPet}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeTable();
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

  return (
    <div className="container container-lista-pets">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Lista de Pets</h1>
        <Button as={Link} to="/pets/novo" className="btn-brown">
          <i className="bi bi-plus-lg me-2"></i> Pet
        </Button>
      </div>
      <div className="card-container">
        {pets === null ? (
          <Loader />
        ) : (
          pets.map((pet) => {
            return (
              <div key={pet.id}>
                <Card className="card-pet">
                  <div
                    onClick={() => navigate(`/pets/pet/${pet.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-img">
                      <img src={avatar} alt="" />
                    </div>
                    <Card.Body className="card-body">
                      <span>Nome:</span>
                      <Card.Title>
                        {pet.nome.charAt(0).toUpperCase() + pet.nome.slice(1)}
                      </Card.Title>
                      <span>Raça:</span>
                      <Card.Title>
                        {pet.tipo.split(" ")[0].charAt(0).toUpperCase() +
                          pet.tipo.split(" ")[0].slice(1)}
                      </Card.Title>
                      <span>Porte:</span>
                      <Card.Title>
                        {pet.porte.charAt(0).toUpperCase() + pet.porte.slice(1)}
                      </Card.Title>
                      <span>Nascimento:</span>
                      <Card.Title>
                        {new Date(
                          `${pet.dataNasc}T00:00:00`
                        ).toLocaleDateString("pt-BR")}
                      </Card.Title>
                    </Card.Body>
                  </div>
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
                <ModalDelete
                  show={show}
                  handleClose={handleClose}
                  onDelete={onDelete}
                  mensagem={`Tem certeza que deseja excluir o pet ${
                    idPet && pets.find((pet) => pet.id === idPet)?.nome
                  } ?`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
