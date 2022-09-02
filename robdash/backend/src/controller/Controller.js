const MenuModel = require('../model/MenuModel');
const TokenModel = require('../model/TokenModel');
const LogintstModel = require('../model/LogintstModel')

class Controller {
    
    async create(req,res){
        const menu = new MenuModel(req.body);
        await menu
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async update(req,res){
        await MenuModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        })
    }

    async getAll(req,res){
        await MenuModel.find({})
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async getMenu(req,res){
        await MenuModel.find({ codigo: {'$in': req.params.codigo} })
        .then(response =>{
            if(response.length === 0){
                return res.status(200).json({status:"error",name:"Menu invalido"})

            }else{
                return res.status(200).json({status: "sucess",menu: response})
            }
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async deleteAll(req,res){
        await MenuModel.deleteMany({})
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async deleteOne(req,res){
        await MenuModel.deleteOne({'_id': req.params.id })
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }


    async createToken(req,res){
        const token = new TokenModel(req.body);
        await token
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async authToken(req,res){
        await TokenModel.find({ token: {'$in': req.params.token} })
        .then(response =>{
            const resToken = {
                status: "sucess",
                company: response[0].company,
                menu: response[0].menu
            }
            return res.status(200).json(resToken)
        })
        .catch(() =>{
            return res.status(200).json({status:"error",name:"Token de autenticacao invalido"})
        })
    }

    async deleteToken(req,res){
        await TokenModel.deleteOne({'_id': req.params.id })
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    /*****  login teste  *****/

    async createLoginteste(req,res){
        const loginteste = new LogintstModel(req.body);
        await loginteste
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async authLoginteste(req,res){
        await LogintstModel.findOne({user: req.body.user})
            .then((userAuth) =>{
                if(userAuth.pass === req.body.pass){
                    const response = {
                        status:"sucess",
                        token:userAuth.token,
                        user:userAuth.user,
                        name:userAuth.name
                    }
                    return res.status(200).json(response);
                }else{
                    return res.status(200).json({status:"error",name:"Senha Invalida"})
                }
            })
            .catch(()=>{
                return res.status(200).json({status:"error",name:"Usuario invalido"})
            })
    }

    async deleteLoginteste(req,res){
        await LogintstModel.deleteOne({'_id': req.params.id })
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

}

module.exports = new Controller();