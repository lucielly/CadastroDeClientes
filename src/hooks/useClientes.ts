import { useEffect, useState } from "react"
import ColecaoCliente from "../backend/db/ColecaoCliente"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"



export default function useClientes() {
    const repo: ClienteRepositorio= new ColecaoCliente()

    const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()


const [cliente, setCliente] = useState(Cliente.vazio())
const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(obterTodos, []) // vai chamar a função automaticamente na inicialização do componente

function obterTodos() { 
    repo.obterTodos().then(clientes => { // obter todos os clientes
      setClientes(clientes)   // quando ele receber ele seta os clientes e coloca a tabela como visível
        exibirTabela()
    })

}


    function selecionarCliente(cliente: Cliente) {
    setCliente(cliente)
    exibirFormulario()
}

    async function excluirCliente(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
}

async function salvarCliente(cliente: Cliente) {
   await repo.salvar(cliente) // depois que ele salvar chama o obter todos
    obterTodos()
}

function novoCliente(cliente: Cliente) {
    setCliente(Cliente.vazio())
    exibirFormulario()
    } 
    
    return {
        cliente,
        clientes,
        salvarCliente,
        novoCliente,
        excluirCliente,
        selecionarCliente,
        obterTodos,
        tabelaVisivel,
        exibirTabela
        
        
    }
}