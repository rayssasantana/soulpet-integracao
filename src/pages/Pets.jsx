import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPets, deletePet } from "../api/pets";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Pets() {
  const [pets, setPets] = useState(null); 

  function carregarPets() {
    getPets().then((dados) => {
      setPets(dados); 
    });
  }

  function deletarPet(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");

    if(deletar) {
      deletePet(id)
      .then((resposta) => { 
        toast.success(resposta.message);
        carregarPets(); // traz nova lista sem o pet removido
      });
    }
  }  

  useEffect(() => { 
    carregarPets();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Pets</h1>
      <Button as={Link} to="/pets/novo">
        Adicionar Pet
      </Button>
      <hr />
      {pets ? (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Porte</th>
              <th>Data de Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => {
              return (
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.tipo}</td>
                  <td>{pet.porte}</td>
                  <td>
                    {pet.dataNasc 
                    ? new Date(
                      pet.dataNasc+"T00:00:00"
                    ).toLocaleDateString() : 
                    "-"}
                  </td>
                  <td>
                    <Button variant="danger me-2" size="sm" onClick={() => deletarPet(pet.id)}>
                      Excluir
                    </Button>
                    <Button size="sm" as={Link} to={`/pets/editar/${pet.id}`}> {/* Navegação através de link para a página de editar*/}
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

export default Pets;
