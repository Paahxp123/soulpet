import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { ModalDelete } from "../../components/Modal/Modal";
import { toast } from "react-hot-toast";
import produtoAvatar from "../../assets/icons/produtoAvatar.png";

export function Produtos() {
  const [produtos, setProdutos] = useState(null);
  const [show, setShow] = useState(false);
  const [idProduto, setIdProduto] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setIdProduto(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setIdProduto(id);
    setShow(true);
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onDelete() {
    axios
      .delete(`http://localhost:3001/produtos/${idProduto}`)
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
        <h1>Produtos</h1>
        <Button as={Link} to="/produto/novo" className="btn-brown">
          <i className="bi bi-plus-lg me-2"></i> Produto
        </Button>
      </div>
      <div class="card-container">
        {produtos === null ? (
          <Loader />
        ) : (
          produtos.map((produto) => {
            return (
              <div key={produto.id}>
                <Card className="card-shadow">
                  <div
                    onClick={() => navigate(`#`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-img">
                      <img src={produtoAvatar} alt="" />
                    </div>
                    <Card.Body className="card-body">
                      <span>Nome:</span>
                      <Card.Title className="resumo-tit">
                        {produto.nome.charAt(0).toUpperCase() +
                          produto.nome.slice(1)}
                      </Card.Title>
                      <span>Preço:</span>
                      <Card.Title>R$ {produto.preco},00</Card.Title>
                      <span>Categoria:</span>
                      <Card.Title>{produto.categoria}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                      <span>Descrição:</span>
                      <Card.Title className="resumo">
                        {produto.descricao}
                      </Card.Title>
                    </Card.Footer>
                  </div>
                  <div className="container-btn-pets">
                    <Button onClick={() => handleShow(produto.id)}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Link to={`/produtos/editar/${produto.id}`}>
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
        mensagem={`Tem certeza que deseja excluir o produto ${
          idProduto &&
          produtos.find((produto) => produto.id === idProduto)?.nome
        } ?`}
      />
    </div>
  );
}
