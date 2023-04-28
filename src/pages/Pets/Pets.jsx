import axios from "axios";
import { useEffect, useState } from "react";
import { Button,Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import avatar from "../../assets/vet.png";
import "./style.css";

export function Pets() {
  const [pets, setPets] = useState(null);

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
              <Card key={pet.id} className="card-pet">
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
                    {pet.tipo.charAt(0).toUpperCase() + pet.tipo.slice(1)}
                  </Card.Title>
                  <span>Porte:</span>
                  <Card.Title>
                    {pet.porte.charAt(0).toUpperCase() + pet.porte.slice(1)}
                  </Card.Title>
                  <span>Nascimento:</span>
                  <Card.Title>
                    {new Date(pet.dataNasc).toLocaleDateString("pt-BR")}
                  </Card.Title>
                </Card.Body>
                <div className="container-btn-pets">
                  <Button>
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                  <Button>
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
