import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";

export function EditaPedidos() {
  const [cliente, setCliente] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [filtrarProduto, setFiltrarProduto] = useState("");
  const [selectedProduto, setSelectedProduto] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

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

  function onSubmit(data) {
    data.clienteId = Number(data.clienteId);
    data.produtoId = Number(data.produtoId);
    axios
      .put(`http://localhost:3001/pedidos/${id}`, data)
      .then((Response) => {
        toast.success("Pedido editado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/pedidos");
      })
      .catch((error) => {
        toast.error("Algo errado aconteceu", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/clientes/${clienteId}`)
      .then((response) => {
        setCliente(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clienteId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/pedidos/${id}`)
      .then((response) => {
        const { clienteId, produtoId, quantidade, data } = response.data;
        reset({ clienteId, produtoId, quantidade, data });
        setClienteId(clienteId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, reset]);

  return (
    <div className="mt-5">
      <div className="container">
        <Button as={Link} to="/pedidos" className="btn-brown">
          <i className="bi bi-arrow-bar-left"></i> Voltar
        </Button>
        <div className="container-form-center">
          <div className="form-content">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Cliente</Form.Label>
                <Form.Select
                  aria-label="Selecione o dono do pet"
                  {...register("clienteId", {
                    required: true,
                    message: "O dono do pet é obrigatório",
                  })}
                  isInvalid={errors.clienteId ? true : false}
                >
                  <option value="">Selecione o dono do pet</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </Form.Select>
                {errors.clienteId && (
                  <Form.Text className="invalid-feedback">
                    {errors.clienteId.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Produto</Form.Label>
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
                {errors.produtoId && (
                  <Form.Text className="invalid-feedback">
                    {errors.produtoId.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  type="number"
                  className={errors.quantidade && "is-invalid"}
                  {...register("quantidade", {
                    required: "A quantidade é obrigatório.",
                    maxLength: {
                      value: 20,
                      message: "Limite de 20 caracteres.",
                    },
                  })}
                />
                {errors.quantidade && (
                  <Form.Text className="invalid-feedback">
                    {errors.quantidade.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Button className="btn-formPet" type="submit">
                Editar
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
