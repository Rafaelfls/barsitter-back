// como nao usamos o moedelo em função do firebase, pode apagar
// const jobModel = require('../../models/job')

// let collectionJobs = []


// const validateToken = require('../../config/security/tokenValidator')



module.exports = routes => {

    const db = routes.config.firebaseConfig.collection('Drink')

    // retorna todos os jobs    
    routes.get('/Drink', /*validateToken,*/ async (req, res) => {
        //sem o firebase
        // res.send(collectionJobs)

        //com o firebase
        try {
            let docs = await db.get()
            let drinks = []

            docs.forEach(doc => {
                drinks.push(extractDrink(doc))
            })

            return res.send(drinks)

        } catch (error) {
            return res.status(500).send(error)
        }
    })

    // retorna o job por id
    routes.get('/Drink/:DrinkId', async (req, res) => {
        // sem o fireBase
        // let job = collectionJobs.find(job => job.id == req.params.jobId)
        // if (job) {
        //     res.send(job)
        // } else {
        //     res.status(204).send('Job not found')
        // }

        // com fireBase
        try {
            // passa o documento como referencia e com o .get ele pega toda a informação do job
            let drinks = await db.doc(req.params.DrinkId).get()

            if (drinks.exists) {
                return res.send(extractDrink(drinks))
            } else {
                return res.status(404).send('Drink not found!')
            }
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    //acrescenta novos jobs
    routes.post('/Drink', async (req, res) => {
        // try {
        //     let job = new jobModel.Job(
        //         req.body.id,
        //         req.body.name,
        //         req.body.salary,
        //         req.body.description,
        //         req.body.skills,
        //         req.body.area,
        //         req.body.diferentials,
        //         req.body.isPcd,
        //         req.body.isActive
        //     )
        //     collectionJobs.push(job)
        //     res.send(job)
        // } catch (error) {
        //     res.status(500).send(error)
        // }

        try {
            // await db.doc().set(req.body)
            const result = await db.add(req.body)

            // return res.send('Job added successfuly!')
            return res.send(result.id)
            
        } catch (error) {
            return res.status(500).send(error)            
        }

    })

    // atualiza infomração do job
    routes.put('/Drink/:drinkId', async (req, res) => {
        //sem firebase
        // collectionJobs.forEach((job) => {
        //     if (job.id == req.params.idUsuario) {
        //         try {
        //             job.name = req.body.name,
        //             job.email = req.body.email,
        //             job.password = req.body.password

        //             res.send(job)

        //         } catch (error) {
        //             return res.status(500).send('Parametros invalidos!')
        //         }
        //     }

        try {
            await db.doc(req.params.drinkId).update(req.body)
            return res.send(`O drink ${req.params.drinkId} foi atualizado com sucesso`)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    // deleta job pelo ID
    routes.delete('/Drink/:drinkId', async (req, res) => {
        // sem firebase
        //     let jobExist = false

        //     collectionJobs.forEach((job, index) =>{
        //         if(job.id == req.params.jobId ){
        //             jobExist = true
        //             collectionJobs.splice(index, 1)

        //             res.send('ok')
        //         }
        //     })

        //     if(!jobExist)
        //         res.status(500).send(error)

        // com firebase
        try {
            await db.doc(req.params.drinkId).delete()
            return res.send(`O drink ${req.params.drinkId} foi removido com sucesso`)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    
    // function extractJob (job){} sem arrow function
    extractDrink = (Drink) => {
        let data = Drink.data()
        return {
            id: Drink.id,
            name: data.name,
            description: data.description
        }
    }

}