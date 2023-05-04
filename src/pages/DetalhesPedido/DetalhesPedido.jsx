import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import avatar from "../../assets/icons/programmer.png";
import "./style.css";

export function DetalhesPedido() {
    const [pedidos, setPedidos] = useState({});
    const [produtos, setProdutos] = useState({});
    const [clientes, setClientes] = useState({});

    const { id } = useParams();

    function listarClientes() {
        axios
            .get("http://localhost:3001/clientes")
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function listarProdutos() {
        axios
            .get("http://localhost:3001/produtos")
            .then((response) => {
                setProdutos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function listarPedidos() {
        axios
            .get("http://localhost:3001/pedidos")
            .then((response) => {
                setPedidos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
            listarClientes();
            listarProdutos();
            listarPedidos();
    }, [id]);

    function getCliente(pedido) {
        return clientes.find(cliente => cliente.id === pedido.clienteId);
    }

    function getProduto(pedido) {
        return produtos.find(produto => produto.id === pedido.produtoId);
    }

    return (
        <>
            <div className="mt-3 ms-3">
                <Button as={Link} to="/pedidos" className="btn-brown mb-5">
                    <i className="bi bi-arrow-bar-left"></i> Voltar
                </Button>
                <h1>Detalhamento do pedido</h1>
            </div>

            <div className="d-flex mx-auto justify-content-center aligm-items-center mt-3">
                <div className="d-flex flex-column align-items-center gap-3">
                    <div className="avatar-pedidos" style={{border: "2px solid black", borderRadius: "50%", margin}}>
                        <img src={avatar} alt="Cliente" style={{width: "300px"}}/>
                    </div>
                {/* <h3>{cliente.nome}</h3> */}
                </div>
                
                <Card className="card-pedidos card-singlePage">
                    <Card.Body className="card-body">
                    <span>Nome:</span>
                        <Card.Title>
                            {/* {pet.nome?.charAt(0).toUpperCase() + pet.nome?.slice(1)} */}
                        </Card.Title>
                    <span>Produtos:</span>
                        <Card.Title>
                            {/* {pet.tipo?.charAt(0).toUpperCase() + pet.tipo?.slice(1)} */}
                        </Card.Title>
                    <span>Valor total do pedido:</span>
                        <Card.Title>
                            {/* {pet.porte?.charAt(0).toUpperCase() + pet.porte?.slice(1)} */}
                        </Card.Title>
                    </Card.Body>
                    <div className="container-btn-pedidos">
                    {/* <Button onClick={() => handleShow(pet.id)}>
                        <i className="bi bi-trash-fill"></i>
                    </Button> */}
                    {/* <Link to={`/pets/editar/${pet.id}`}>
                        <Button>
                        <i className="bi bi-pencil-fill"></i>
                        </Button>
                    </Link> */}
                    </div>
                </Card>
            </div>
        </>
    );
}
