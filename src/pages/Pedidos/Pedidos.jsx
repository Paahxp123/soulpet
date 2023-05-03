import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import { ModalDelete } from "../../components/Modal/Modal";

export function Pedidos() {
  const [pedidos, setPedidos] = useState(null);
  const [show, setShow] = useState(false);
  const [idPedido, setIdPedido] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [filtrarCliente, setFiltrarCliente] = useState("");
  const [filtrarProduto, setFiltrarProduto] = useState("");

  const handleClose = () => {
    setIdPedido(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setIdPedido(id);
    setShow(true);
  };

  const resetFiltros = () => {
    setFiltrarCliente("");
    setFiltrarProduto("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3001/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    initializeTable();
  }, [filtrarCliente, filtrarProduto]);

  function initializeTable() {
    const query = {};

    if (filtrarCliente !== "") {
      query.clienteId = filtrarCliente;
    }

    if (filtrarProduto !== "") {
      query.produtoId = filtrarProduto;
    }

    const queryString = Object.keys(query)
      .map((key) => key + "=" + query[key])
      .join("&");

    const url = "http://localhost:3001/pedidos?" + queryString;

    axios
      .get(url)
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onDelete() {
    axios
      .delete(`http://localhost:3001/pedidos/${idPedido}`)
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
        <h1>Pedidos</h1>
        <Button as={Link} to="/pedidos/novo" className="btn-brown">
          <i className="bi bi-plus-lg me-2"></i> Pedido
        </Button>
      </div>

      {pedidos === null ? (
        <Loader />
      ) : (
        <Row className="d-flex justify-content-around align-items-center mx-auto mt-3">
          <Col className="mb-3">
            <Form.Control
              as="select"
              value={filtrarCliente}
              onChange={(event) => setFiltrarCliente(event.target.value)}
            >
              <option value="">Todos os clientes</option>
              {clientes.map((cliente) => (
                <option key={cliente.clienteId} value={cliente.clienteId}>
                  {cliente.nome}
                </option>
              ))}
            </Form.Control>
          </Col>

          <Col className="mb-3">
            <Form.Control
              as="select"
              value={filtrarProduto}
              onChange={(event) => setFiltrarProduto(event.target.value)}
            >
              <option value="">Todos os produtos</option>
              {produtos.map((produto) => (
                <option key={produto.produtoId} value={produto.produtoId}>
                  {produto.nome}
                </option>
              ))}
            </Form.Control>
          </Col>

          <Col className="mb-3">
            <Button onClick={() => resetFiltros()} className="btn-brown">
              Limpar
            </Button>
          </Col>

          <Table striped bordered hover align="center">
            <thead align="center">
              <tr>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody align="center">
              {pedidos
                .filter(
                  (pedido) =>
                    pedido.cliente.nome.includes(filtrarCliente) &&
                    pedido.produto.nome.includes(filtrarProduto)
                )
                .map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.cliente.nome}</td>
                    <td>{pedido.produto.nome}</td>
                    <td>{pedido.quantidade}</td>
                    <td className="d-flex justify-content-around align-items-center mx-auto">
                      <Button
                        onClick={() => handleShow(pedido.id)}
                        className="btn-brown"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button
                        as={Link}
                        to={`/pedidos/editar/${pedido.id}`}
                        className="btn-brown"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button
                        as={Link}
                        to={`/pedidos/detalhes/${pedido.id}`}
                        className="btn-brown"
                      >
                        <i class="bi bi-three-dots-vertical"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      )}
      <ModalDelete
        show={show}
        handleClose={handleClose}
        onDelete={onDelete}
        mensagem={`Tem certeza que deseja excluir esse pedido?`}
      />
    </div>
  );
}
