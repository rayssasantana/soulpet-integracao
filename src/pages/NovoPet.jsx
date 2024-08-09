import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addPet } from "../api/pets";
import toast from "react-hot-toast";
import React, { useEffect, useState } from 'react';
import { getClientes } from "../api/clientes";
import axios from "axios";

function NovoPet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);

  function salvarPet(data) {
    if(data.dataNasc === "") data.dataNasc = null;

    addPet(data).then((resposta) => {
      toast.success(resposta.message);
      navigate("/pets");
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

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
      <h1>Novo pet</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarPet)}>
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
        <div>
          <label htmlFor="clienteId">Nome cliente</label>
          <select
            id="clienteId"
            className="form-select"
            {...register("clienteId", { required: true, valueAsNumber: true  })} 
          >
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome} - {cliente.email}
              </option>
            ))}
          </select>
          {errors.clienteId && (
            <small className="text-danger">Selecione um cliente!</small>
          )}
        </div>
        <Button className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoPet;
