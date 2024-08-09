import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteCliente, getClientes } from "../api/clientes";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Clientes() {
  const [clientes, setClientes] = useState(null); // nulo pois estou carregando ainda a lista de clientes

  function carregarClientes() {
    getClientes().then((dados) => {
      setClientes(dados); // dados que vem lá do back-end
    });
  }

  // Pegar o id do cliente
  function deletarCliente(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if(deletar) {
      deleteCliente(id)
      .then((resposta) => { // essa é uma função de callback. Porque eu defino ela aqui, pra ser chamada depois
        toast.success(resposta.message);
        carregarClientes();
      });
    }
  }

  useEffect(() => { // chama só uma vez a função (quando entrra na página)
    carregarClientes();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Clientes</h1>
      <Button as={Link} to="/clientes/novo">
        Adicionar Cliente
      </Button>
      <hr />
      {clientes ? (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => {
              return (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>
                    <Button variant="danger me-2" size="sm" onClick={() => deletarCliente(cliente.id)}>
                      Excluir
                    </Button>
                    <Button size="sm" as={Link} to={`/clientes/editar/${cliente.id}`}> {/* Navegação através de link para a página de editar*/}
                      Editar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}
    </main>
  );
}

export default Clientes;
