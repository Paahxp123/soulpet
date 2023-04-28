import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import avatar from "../../assets/vet.png";
import "./style.css";

export function PetSingle() {
  const [cliente, setCliente] = useState({});
  const [pet, setPet] = useState({})
  const [nome, setNome] = useState("");
  
  function handleNomeChange(event) {
    setNome(event.target.value);
  }
  
  const { id } = useParams();
  console.log(cliente);
  const idCliente = pet.clienteId;
  
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
          <i class="bi bi-arrow-bar-left"></i> Voltar
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
        </div>
      </div>
    </div>
  );
}
