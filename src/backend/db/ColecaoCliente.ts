import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";



export default class  ColecaoCliente  implements ClienteRepositorio {

   #conversor = {   // conversor vai converter a classe cliente para algo que vai ser persistido no firestore
                    
        toFirestore(cliente: Cliente) {
            return{
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
                // recebe algo do firestore e converte pra classe 
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) : Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id )

        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
                if(cliente?.id) { //caso o id esteja setado ele vai alterar
                     await this.colecao().doc(cliente.id).set(cliente)
                     return cliente
                } else { // senao ele vai adicionar novo cliente na coleção e vai retornar o id já setado pelo firebase
                   const docRef = await this.colecao().add(cliente)
                   const doc = await docRef.get()
                   return doc.data()
                }
    }
    async excluir(cliente: Cliente): Promise<void> { // dentro da coleção de clientes, acessa um cliente eespecífico que é um documento a partir do ID
        return this.colecao().doc(cliente.id).delete()
    }
    
    async obterTodos(): Promise<Cliente[]> {
       const query = await this.colecao().get()
      return query.docs.map(doc => doc.data()) ?? []
        
    }

    private colecao() {  
        return firebase.firestore().collection('clientes').withConverter(this.#conversor)
    }


}