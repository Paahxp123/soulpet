import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import avatar from "../../assets/icons/produtoAvatar.png";


export function AtualizarProduto() {
  const [nome, setNome] = useState("");

  function handleNomeChange(event) {
    setNome(event.target.value);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  function onSubmit(data) {
    axios
      .put(`http://localhost:3001/produtos/${id}`, data)
      .then((response) => {
        toast.success("Produto editado com sucesso", {
          position: "bottom-right",
          duration: 2000,
        });
      navigate(`/produto`);

      })
      .catch((error) => {
        toast.error("Aconteceu um erro", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/produtos/${id}`).then((response) => {
      const { nome, preco, descricao, desconto, dataDesconto, categoria } =
        response.data;
      reset({ nome, preco, descricao, desconto, dataDesconto, categoria });
      setNome(nome);
    });
  }, [id, reset]);

  return (
    <div className="form mt-5">
      <div className="container">
        <Button as={Link} to="/produto" className="btn-brown">
          <i className="bi bi-arrow-bar-left"></i> Voltar
        </Button>
        <div className="container-form">
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="avatar-pet">
              <img src={avatar} alt="SoulPet" />
            </div>
            <h3>{nome ? nome : "Produto"}</h3>
          </div>
          <div className="form-content">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.nome && "is-invalid"}
                  {...register("nome", {
                    required: "O nome é obrigatório.",
                    maxLength: {
                      value: 130,
                      message: "Limite de 130 caracteres.",
                    },
                  })}
                  onChange={handleNomeChange}
                />
                {errors.nome && (
                  <Form.Text className="invalid-feedback">
                    {errors.nome.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  className={errors.preco && "is-invalid"}
                  {...register("preco", {
                    required: "O preço é obrigatório.",
                    maxLength: {
                      value: 10,
                      message: "Limite de 10 caracteres.",
                    },
                  })}
                />
                {errors.preco && (
                  <Form.Text className="invalid-feedback">
                    {errors.preco.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.descricao && "is-invalid"}
                  {...register("descricao", {
                    required: "A descrição é obrigatória.",
                    maxLength: {
                      value: 255,
                      message: "Limite de 255 caracteres.",
                    },
                  })}
                />
                {errors.descricao && (
                  <Form.Text className="invalid-feedback">
                    {errors.descricao.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Desconto</Form.Label>
                <Form.Control
                  type="number"
                  className={errors.desconto && "is-invalid"}
                  {...register("desconto", {
                    required: "O desconto é obrigatório.",
                    maxLength: {
                      value: 10,
                      message: "Limite de 10 caracteres.",
                    },
                  })}
                />
                {errors.desconto && (
                  <Form.Text className="invalid-feedback">
                    {errors.desconto.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data do desconto</Form.Label>
                <Form.Control
                  type="date"
                  className={errors.dataDesconto && "is-invalid"}
                  {...register("dataDesconto", {
                    required: "A data do desconto é obrigatória.",
                    maxLength: {
                      value: 10,
                      message: "Limite de 10 caracteres.",
                    },
                  })}
                />
                {errors.dataDesconto && (
                  <Form.Text className="invalid-feedback">
                    {errors.dataDesconto.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.categoria && "is-invalid"}
                  {...register("categoria", {
                    required: "A categoria é obrigatória.",
                    maxLength: {
                      value: 100,
                      message: "Limite de 100 caracteres.",
                    },
                  })}
                />
                {errors.categoria && (
                  <Form.Text className="invalid-feedback">
                    {errors.categoria.message}
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
