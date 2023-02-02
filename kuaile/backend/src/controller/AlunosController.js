const { response } = require('express');
const AlunosModel = require('../model/AlunosModel');
const ListsModel = require('../model/ListsModel');
const LoginModel = require('../model/LoginModel');

class AlunosController {
    
    async create(req,res){
        const alunos = new AlunosModel(req.body);
        await alunos
            .save()
            .then(response => {
                return res.status(200).json({message:'sucesso', item: response});
            })
            .catch(error =>{
                return res.status(200).json({message:'error', item: error})
            })
    }

    async update(req,res){
        await AlunosModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
        .then(response => {
            return res.status(200).json({message:'sucesso', item: response});
        })
        .catch(error =>{
            return res.status(200).json({message:'error', item: error})
        })
    }

    async getAll(req,res){
        await AlunosModel.find({})
        .then(response =>{
            return res.status(200).json({message:response.length > 0 ? 'sucesso' : 'error', item: response})
        })
        .catch(error =>{
            return res.status(200).json({message:'error', item: error})
        })
    }

    async getAluno(req,res){
        await AlunosModel.find({'_id': req.params.id})
        .then(response =>{
            return res.status(200).json({message:response.length > 0 ? 'sucesso' : 'error', item: response})
        })
        .catch(error =>{
            return res.status(200).json({message:'error', item: error})
        })
    }

    async deleteAll(req,res){
        await AlunosModel.deleteMany({})
        .then(response =>{
            return res.status(200).json({message:'sucesso', item: response})
        })
        .catch(error =>{
            return res.status(200).json({message:'error', item: error})
        })
    }

    async deleteOne(req,res){
        await AlunosModel.deleteOne({'_id': req.params.id })
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(200).json({message:'error', item: error})
        })
    }


    async createLists(req,res){
        const lists = new ListsModel(req.body);
        await lists
            .save()
            .then(response => {
                return res.status(200).json({message:'sucesso', item: response})
            })
            .catch(error =>{
                return res.status(200).json({message:'error', item: error})
            })
    }

    async getAllLists(req,res){
        await ListsModel.find({})
        .then(response =>{
            return res.status(200).json({message:response.length > 0 ? 'sucesso' : 'error', item: response})
        })
        .catch(error =>{
            return res.status(200).json({message:'error', item: error})
        })
    }

    async getList(req,res){
        await ListsModel.find({'_id': req.params.id})
        .then(response =>{
            return res.status(200).json({message:response.length > 0 ? 'sucesso' : 'error', item: response})
        })
        .catch(error =>{
            return res.status(200).json({message:'error', item: error})
        })
    }


    async createLogin(req,res){
        const login = new LoginModel(req.body);
        await login
            .save()
            .then(response => {
                return res.json({message:'sucesso', item: response})
            })
            .catch(error =>{
                return res.json({message:'error', item: error})
            })
    }

    async authLogin(req,res){
        await LoginModel.find({ tokenvalid: {'$in': req.params.tokenvalid} })
        .then(response =>{
            return res.json({message:response.length > 0 ? 'sucesso' : 'error', item: response})
        })
        .catch(error =>{
            return res.json({message:'error', item: error})
        })
    }

    async deleteLogin(req,res){
        await LoginModel.deleteOne({'_id': req.params.id })
        .then(response =>{
            return res.json({message:'sucesso', item: response})
        })
        .catch(error =>{
            return res.json({message:'error', item: error})
        })
    }


}

module.exports = new AlunosController();