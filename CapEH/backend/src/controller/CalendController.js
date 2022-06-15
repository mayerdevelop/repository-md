const { response } = require('express');
const CalendModel = require('../model/CalendModel');
const ParamCalendModel = require('../model/ParamCalendModel');
const LoginModel = require('../model/LoginModel');

class CalendController {
    
    async create(req,res){
        const calendar = new CalendModel(req.body);
        await calendar
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async update(req,res){
        await CalendModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        })
    }

    async getAll(req,res){
        await CalendModel.find({})
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async getDate(req,res){
        await CalendModel.find({ data: {'$in': req.params.data} })
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async deleteAll(req,res){
        await CalendModel.deleteMany({})
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async deleteOne(req,res){
        await CalendModel.deleteOne({'_id': req.params.id })
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async createParam(req,res){
        const paramcalendar = new ParamCalendModel(req.body);
        await paramcalendar
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async getAllParam(req,res){
        await ParamCalendModel.find({})
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async deleteAllParam(req,res){
        await ParamCalendModel.deleteMany({})
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async createLogin(req,res){
        const login = new LoginModel(req.body);
        await login
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            })
    }

    async authLogin(req,res){
        await LoginModel.find({ tokenvalid: {'$in': req.params.tokenvalid} })
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    async deleteLogin(req,res){
        await LoginModel.deleteOne({'_id': req.params.id })
        .then(response =>{
            return res.status(200).json(response)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

}

module.exports = new CalendController();