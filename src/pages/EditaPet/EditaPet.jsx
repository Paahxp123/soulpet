import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import avatar from "../../assets/icons/id-card.png";
import { useNavigate, useParams } from "react-router-dom";

export function EditaPet() {
 const [clientes, setClientes] = useState([]);
 const [dono, setDono] = useState([]);
 const [nome, setNome] = useState("");

 function handleNomeChange(event) {
   setNome(event.target.value);
 }

 function handleClienteChange(event) {
   setDono(event.target.value);
 }

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
      .get(`http://localhost:3001/pets/${id}`)
      .then((response) => {
        const { nome, tipo, porte, dataNasc, clienteId } = response.data;
        reset({ nome, tipo, porte, dataNasc, clienteId });
        setNome(nome);
        setDono(response.data.clienteId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, reset]);

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


async function onSubmit(data) {
  const modifiedData = { ...data, clienteId: parseInt(data.clienteId) };
  axios
    .put(`http://localhost:3001/pets/${id}`, modifiedData)
    .then((response) => {
      toast.success(`Pet ${nome} editado.`, {
        position: "bottom-right",
        duration: 2000,
      });
      navigate(`/pets/pet/${id}`);
    })
    .catch((error) => {
      toast.error("Algo deu errado.", {
        position: "bottom-right",
        duration: 2000,
      });
      console.log(error);
    });
}


  return (
    <div className="form mt-5">
      <div className="container">
        <Button as={Link} to={`/pets/pet/${id}`} className="btn-brown">
          <i className="bi bi-arrow-bar-left"></i> Voltar
        </Button>
        <div className="container-form">
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="avatar-pet">
              <img src={avatar} alt="SoulPet" />
            </div>
            <h3>{nome ? nome : "Meu nome é"}</h3>
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
                  onChange={handleClienteChange}
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
                Salvar alteraçoes
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
