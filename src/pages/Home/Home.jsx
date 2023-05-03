import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import agendamento from "../../assets/icons/agendamento.png";
import cliente from "../../assets/icons/cliente.png";
import pet from "../../assets/icons/pet.png";
import produto from "../../assets/icons/produto.png";
import servico from "../../assets/icons/servico.png";
import pedidos from "../../assets/icons/pedidos.png";
import "./Home.css";

export function Home() {
  const [dados, setDados] = useState("");

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/dashboard")
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="home">
      <div className="container">
        <h1>Dashboard</h1>
        <div className="card-container-dashboard">
          <Card className="card-pet card-home">
            <div className="card-body">
              <div className="card-img-home">
                <img src={pet} alt="" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{dados.totalPets}</Card.Title>
                <Card.Text>Pets</Card.Text>
              </Card.Body>
              <div className="overlay overlay-hidden">
                <Link to={"/pets"} className="overlay-link">
                  Ver Todos
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </Card>
          <Card className="card-pet card-home">
            <div className="card-body">
              <div className="card-img-home">
                <img src={cliente} alt="" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{dados.totalClientes}</Card.Title>
                <Card.Text>Clientes</Card.Text>
              </Card.Body>
              <div className="overlay overlay-hidden">
                <Link to={"/clientes"} className="overlay-link">
                  Ver Todos
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </Card>
          <Card className="card-pet card-home">
            <div className="card-body">
              <div className="card-img-home">
                <img src={produto} alt="" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{dados.totalProdutos}</Card.Title>
                <Card.Text>Produtos</Card.Text>
              </Card.Body>
              <div className="overlay overlay-hidden">
                <Link to={"/produto"} className="overlay-link">
                  Ver Todos
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </Card>
          <Card className="card-pet card-home">
            <div className="card-body">
              <div className="card-img-home">
                <img src={agendamento} alt="" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{dados.totalAgendamentos}</Card.Title>
                <Card.Text>Agendamentos</Card.Text>
              </Card.Body>
              <div className="overlay overlay-hidden">
                <Link to={"/"} className="overlay-link">
                  Ver Todos
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </Card>
          <Card className="card-pet card-home">
            <div className="card-body">
              <div className="card-img-home">
                <img src={servico} alt="" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{dados.totalServicos}</Card.Title>
                <Card.Text>Serviços</Card.Text>
              </Card.Body>
              <div className="overlay overlay-hidden">
                <Link to={"/servicos"} className="overlay-link">
                  Ver Todos
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </Card>
          <Card className="card-pet card-home">
            <div className="card-body">
              <div className="card-img-home">
                <img src={pedidos} alt="" />
              </div>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{dados.totalPedidos}</Card.Title>
                <Card.Text>Pedidos</Card.Text>
              </Card.Body>
              <div className="overlay overlay-hidden">
                <Link to={"/"} className="overlay-link">
                  Ver Todos
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
