// const userModel = require('../../models/user')

let collectionUsers = []

module.exports = routes =>{


    // pegar todos os usuarios
    routes.get('/users',(req, res)=>{
        res.send(collectionUsers)
    })


    // pegar usuarios por id
    routes.get('/users/:idUsuario',(req, res)=>{

        // com essa função find é possivel pegar os drinks que nao foram feitos(filtrar)
        let user = collectionUsers.find(user=> user.id == req.params.idUsuario)

        if(user){
            res.send(user)
        }else{
            res.status(204).send("User not found")
        }

    })


    // salvar novos usuarios
    routes.post('/users', (req, res)=>{
        try{
            let user= new userModel.User(
                req.body.id,
                req.body.name,
                req.body.email,
	            req.body.password
            )
            collectionUsers.push(user)

            res.send(user)
        }
        catch(error){ res.status(500).send(error)}
    })

    // Atualiza os dados do banco
    routes.put('/users/:idUsuario',(req, res)=>{

        collectionUsers.forEach((user)=>{
            if(user.id == req.params.idUsuario){
                try {
                    user.name = req.body.name,
                    user.email = req.body.email,
                    user.password = req.body.password

                    res.send(user)

                } catch (error) {                    
                    return res.status(500).send('Parametros invalidos!')
                }
            }
        })
    })


    routes.delete('/users/:id', (req, res)=>{

        let userExist = false

        collectionUsers.forEach((user, index) =>{
            if(user.id == req.params.id ){
                userExist = true
                collectionUsers.splice(index, 1)

                res.send('ok')
            }
        })

        if(!userExist)
            res.status(404).send('Id não encontrado')

    })

}