import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import avatar from "../../assets/icons/id-card.png";
import "./style.css";

export function NovoPet() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");

  function handleNomeChange(event) {
    setNome(event.target.value);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/pets", data)
      .then((response) => {
        const pet = response.data;
        toast.success(`Pet ${pet.nome} adicionado.`, {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/pets");
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Algo deu errado.";
        toast.error(message, {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  return (
    <div className="form-pet">
      <div className="container">
        <Button as={Link} to="/pets" className="btn-brown">
          <i className="bi bi-arrow-bar-left"></i> Voltar
        </Button>
        <div className="container-formPet">
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="avatar-pet">
              <img src={avatar} alt="SoulPet" />
            </div>
            <h3>{nome ? nome : "Meu nome é"}</h3>
          </div>
          <div className="formPet">
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
                <Form.Label>Raça</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.tipo && "is-invalid"}
                  {...register("tipo", {
                    required: "A raça é obrigatória.",
                    maxLength: {
                      value: 255,
                      message: "Limite de 255 caracteres.",
                    },
                  })}
                />
                {errors.tipo && (
                  <Form.Text className="invalid-feedback">
                    {errors.tipo.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Porte</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.porte && "is-invalid"}
                  {...register("porte", {
                    required: "O porte é obrigatório.",
                    maxLength: {
                      value: 255,
                      message: "Limite de 255 caracteres.",
                    },
                  })}
                />
                {errors.porte && (
                  <Form.Text className="invalid-feedback">
                    {errors.porte.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data de nascimento</Form.Label>
                <Form.Control
                  type="date"
                  className={errors.dataNasc && "is-invalid"}
                  {...register("dataNasc", {
                    required: "A data de nascimento é obrigatória.",
                    maxLength: {
                      value: 255,
                      message: "Limite de 255 caracteres.",
                    },
                  })}
                />
                {errors.dataNasc && (
                  <Form.Text className="invalid-feedback">
                    {errors.dataNasc.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mt-4">
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

              <Button className="btn-formPet" type="submit">
                Cadastrar
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
