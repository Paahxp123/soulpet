import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import { ModalDelete } from "../../components/Modal/Modal";


export function Clientes() {

    const [clientes, setClientes] = useState(null);
    const [show, setShow] = useState(false);
    const [idCliente, setIdCliente] = useState(null);
  
    const handleClose = () => {
        setIdCliente(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdCliente(id);
        setShow(true)
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function onDelete() {
        axios.delete(`http://localhost:3001/clientes/${idCliente}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                initializeTable();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    return (
      <div className="clientes container">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Clientes</h1>
          <Button as={Link} to="/clientes/novo">
            <i className="bi bi-plus-lg me-2"></i> Cliente
          </Button>
        </div>
        {clientes === null ? (
          <Loader />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => {
                return (
                  <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone}</td>
                    <td className="d-flex gap-2">
                      <Button onClick={() => handleShow(cliente.id)}>
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button as={Link} to={`/clientes/editar/${cliente.id}`}>
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <ModalDelete
          show={show}
          handleClose={handleClose}
          onDelete={onDelete}
          mensagem={`Tem certeza que deseja excluir cliente ${
                    idCliente && clientes.find((cliente) => cliente.id === idCliente)?.nome
                  } ?`}
        />
      </div>
    );
}