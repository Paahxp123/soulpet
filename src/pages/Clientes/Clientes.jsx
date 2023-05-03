import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import { ModalDelete } from "../../components/Modal/Modal";
import user from "../../assets/icons/user.png"

export function Clientes() {
  const [clientes, setClientes] = useState(null);
  const [show, setShow] = useState(false);
  const [idCliente, setIdCliente] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setIdCliente(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setIdCliente(id);
    setShow(true);
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onDelete() {
    axios
      .delete(`http://localhost:3001/clientes/${idCliente}`)
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
    <div className="section-container container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Clientes</h1>
        <Button as={Link} to="/clientes/novo" className="btn-brown">
          <i className="bi bi-plus-lg me-2"></i> Cliente
        </Button>
      </div>
      <div class="card-container">
        {clientes === null ? (
          <Loader />
        ) : (
          clientes.map((cliente)=>{
            return (
              <div key={cliente.id}>
                <Card className="card-shadow">
                  <div
                    onClick={() => navigate(`#`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-img">
                      <img src={user} alt="" />
                    </div>
                    <Card.Body className="card-body">
                      <span>Nome:</span>
                      <Card.Title className="resumo-tit">
                        {cliente.nome.charAt(0).toUpperCase() +
                          cliente.nome.slice(1)}
                      </Card.Title>
                      <span>E-mail:</span>
                      <Card.Title className="resumo-tit">
                        {cliente.email}
                      </Card.Title>
                      <span>Telefone:</span>
                      <Card.Title>
                        ({cliente.telefone.substr(0, 2)}){" "}
                        {cliente.telefone.substr(2, 4)}-
                        {cliente.telefone.substr(6)}
                      </Card.Title>
                    </Card.Body>
                  </div>
                  <div className="container-btn-pets">
                    <Button onClick={() => handleShow(cliente.id)}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Link to={`/clientes/editar/${cliente.id}`}>
                      <Button>
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            );
          })
        )}
      </div>
      <ModalDelete
        show={show}
        handleClose={handleClose}
        onDelete={onDelete}
        mensagem={`Tem certeza que deseja excluir cliente ${
          idCliente &&
          clientes.find((cliente) => cliente.id === idCliente)?.nome
        } ?`}
      />
    </div>
  );
}
