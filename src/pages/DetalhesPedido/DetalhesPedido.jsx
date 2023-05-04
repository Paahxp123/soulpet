import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import avatar from "../../assets/icons/programmer.png";
import "./style.css";
import { Loader } from "../../components/Loader/Loader";

export function DetalhesPedido() {
    const [pedidos, setPedidos] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [idPedido, setIdPedido] = useState(null);
    const [show, setShow] = useState(false);

    const { id } = useParams();

    // function listarClientes() {
    //     axios
    //         .get("http://localhost:3001/clientes")
    //         .then((response) => {
    //             setClientes(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    // function listarProdutos() {
    //     axios
    //         .get("http://localhost:3001/produtos")
    //         .then((response) => {
    //             setProdutos(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    const handleShow = (id) => {
        setIdPedido(id);
        setShow(true);
    };

    function listarPedidos() {
        axios
            .get(`http://localhost:3001/pedidos/${id}`)
            .then((response) => {
                setPedidos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        // listarClientes();
        // listarProdutos();
        listarPedidos();
    }, [id]);

    // function getCliente(pedido) {
    //     return clientes.find(cliente => cliente.id === pedido.clienteId);
    // }

    // function getProduto(pedido) {
    //     return produtos.find(produto => produto.id === pedido.produtoId);
    // }

    return (
        <>
            {pedidos === null ? (
                <Loader />
            ) : (
                <>
                    <div className="mt-3 ms-3">
                        <Button
                            as={Link}
                            to="/pedidos"
                            className="btn-brown mb-5"
                        >
                            <i className="bi bi-arrow-bar-left"></i> Voltar
                        </Button>
                        <h1>Detalhamento do pedido</h1>
                    </div>

                    <div className="d-flex mx-auto justify-content-center aligm-items-center mt-3">
                        <div className="d-flex flex-column align-items-center gap-3">
                            <div className="avatar-pet">
                                <img src={avatar} alt="Cliente" />
                            </div>
                            <h3>{pedidos.cliente.nome}</h3>
                        </div>
                        <br />
                        <Card
                            className="card-pedidos card-singlePage"
                            style={{ marginLeft: "32px" }}
                        >
                            <Card.Body className="card-body">
                                <span>Nome:</span>
                                <Card.Title>{pedidos.cliente.nome}</Card.Title>
                                <span>Produto:</span>
                                <Card.Title>{pedidos.produto.nome}</Card.Title>
                                <span>Valor total do pedido:</span>
                                <Card.Title>
                                    {pedidos.produto.preco * pedidos.quantidade}
                                </Card.Title>
                            </Card.Body>
                            <div className="container-btn-between">
                                <Button
                                    className="btn-brown"
                                    onClick={() => handleShow(pedidos.pedidoId)}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </Button>
                                <Link to={`/pedidos/editar/${pedidos.pedidoId}`}>
                                    <Button className="btn-brown">
                                        <i className="bi bi-pencil-fill"></i>
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </>
    );
}
