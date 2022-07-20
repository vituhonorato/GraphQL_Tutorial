const {gql, ApolloServer} = require("apollo-server")

const db = [
    {
        id:1,
        nome:'Victor',
        email:'victor@gmail.com',
        telefone_fixo:"31 1234 5678",
        perfil:1
    },
    {
        id:2,
        nome:'Agda',
        email:'agda@gmail.com',
        telefone:"71 1245 4878",
        perfil:2
    },
]
const perfis = [
    {id:1, descricao:"ADMIN"},
    {id:2, descricao:"NORMAL"}
]


const typeDefs = gql`
type User {
id: Int
nome: String
email: String
telefone: String
perfil:Perfil

}
type Perfil {
    id: Int
    descricao: String
}


type Query {


    usuario(id:Int): User
    perfis:[Perfil]
    
}

`
const resolvers = {
    User:{
        telefone(obj) {
            return obj.telefone_fixo
        },
        perfil(usuario) {
            return perfis.find((p) => p.id === usuario.perfil)
        }
    },
    Query:{
     
       usuario(_, args) {
       return db.find(db => db.id === args.id);
       },
       perfis() {
        return perfis
       }
   
    
    }
}

const server = new ApolloServer({
    typeDefs,resolvers
    
})

server.listen()