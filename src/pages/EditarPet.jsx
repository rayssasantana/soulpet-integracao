import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getPet, updatePet } from "../api/pets";
import { getClientes } from "../api/clientes";

function EditarPet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  function atualizarPet(data) {
    if (data.dataNasc === "") data.dataNasc = null;

    updatePet(id, data).then((resposta) => {
      toast.success(resposta.message);
      navigate("/pets");
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
  }

  function carregarPet() {
    getPet(id).then((dados) => {
      reset(dados);
      console.log(dados);
    }).catch((err) => {
      navigate("/pets");
    });
  }


  useEffect(() => {
    carregarPet();
  }, []);


  const [clientes, setClientes] = useState([]);

  function carregarClientes() {
    getClientes().then((dados) => {
      setClientes(dados); // dados que vem lá do back-end
    }).catch((err) => {
      console.error('Erro ao carregar clientes:', err);
    });
  }

  useEffect(() => {
    carregarClientes();
  }, []);


  return (
    <main className="mt-4 container">
      <h1>Editar pet</h1>
      <hr />
      <form onSubmit={handleSubmit(atualizarPet)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="tipo">Tipo</label>
          <input
            type="text"
            id="tipo"
            className="form-control"
            {...register("tipo", { required: true, maxLength: 200 })}
          />
          {errors.tipo && (
            <small className="text-danger">O tipo é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="porte">Porte</label>
          <input
            type="text"
            id="porte"
            className="form-control"
            {...register("porte", { required: true, maxLength: 200 })}
          />
          {errors.porte && (
            <small className="text-danger">O porte é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="dataNasc">Data de nascimento</label>
          <input
            type="date"
            id="dataNasc"
            className="form-control"
            {...register("dataNasc")}
          />
          {errors.dataNasc && (
            <small className="text-danger">A data é inválida!</small>
          )}
        </div>
        <Button className="mt-3" type="submit">
          Atualizar
        </Button>
      </form>
    </main>
  );
}

export default EditarPet;
