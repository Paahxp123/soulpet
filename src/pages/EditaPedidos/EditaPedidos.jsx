import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditaPedidos() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/pedidos/${id}`, data)
        .then(Response => {
            toast.success("Pediddo editado.", { position: "bottom-right", duration: 2000 });
            navigate("/pedidos");
        })
        .catch(error => {
            toast.error("Algo errado aconteceu", { position: "bottom-right", duration: 2000 });
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/pedidos/${id}`)
        .then(response => {
            const { cliente, produto, quantidade, data } = response.data;
            reset({ cliente, produto, quantidade, data });
        })
    }, [id, reset])

    return (
        <div className="container">
            <h1>Editar Pedido</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control type="text" className={errors.cliente && "is-invalid"} {...register("cliente", { required: "O cliente é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."} })} />
                    {errors.cliente && <Form.Text className="invalid-feedback">{errors.cliente.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Produto</Form.Label>
                    <Form.Control type="text" className={errors.produto && "is-invalid"} {...register("produto", { required: "O produto é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres."} })} />
                    {errors.produto && <Form.Text className="invalid-feedback">{errors.produto.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control type="number" className={errors.quantidade && "is-invalid"} {...register("quantidade", { required: "A quantidade é obrigatório.", maxLength: { value: 20, message: "Limite de 20 caracteres."} })} />
                    {errors.quantidade && <Form.Text className="invalid-feedback">{errors.quantidade.message}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Editar
                </Button>
            </Form>
        </div>
    );

}
