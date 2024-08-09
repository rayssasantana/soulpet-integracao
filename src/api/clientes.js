// Este arquivo possui funções para realizar as operações do CRUD de clientes
import axios from "axios";

// Fazer a chamada para o localhost:3000/clientes e retornar  a lista dos clientes
export async function getClientes() { 
    const response = await axios.get("http://localhost:3000/clientes"); // endereço do back-end
    // Dentro de 'data'está o JSON de resposta do back-end. Data é o corpo da resposta do JSON
    return response.data;
}

//Adiconar cliente
export async function addCliente(data) {
    // o 2° parâmetro do POST é o corpo da requisição. | A conversão JSON é automática
    const response = await axios.post("http://localhost:3000/clientes", data);
    return response.data;
}

// Deletar cliente
export async function deleteCliente(id) {
    const response = await axios.delete(`http://localhost:3000/clientes/${id}`);
    return response.data;
}

// Detalhe cliente
export async function getCliente(id) {
    const response = await axios.get(`http://localhost:3000/clientes/${id}`);
    return response.data;
}

// Atualizar cliente
export async function updateCliente(id, data) {
    const response = await axios.put(`http://localhost:3000/clientes/${id}`, data);
    return response.data;
}