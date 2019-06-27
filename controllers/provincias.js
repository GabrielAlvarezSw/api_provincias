const service = require('../services/provincias.js').service
const utils = require('../utils')
const { check, validationResult } = require('express-validator/check');

class ProvinciasController{
	constructor(){

	}
	async getAll(req, resp){
		let provincias = await service.getAll()
		console.log(provincias)
		resp.send(provincias)
	}
	async get(req, resp){
		let provincia = await service.get(req.params.provincia)
		resp.json(provincia)
	}
	async delete(req, resp){
		let deleted = await service.delete(req.params.provincia)
		resp.json(utils.responses.success(deleted))

	}
	async update(req, resp){
		let id = req.params.provincia
		let data=req.body
		
		resp.json(utils.responses.success(await service.update(id,data)))
		
		
	}
	async create(req,resp){
		try{
		
			resp.json(utils.responses.success(await service.create(req.body)))
		}catch(err){
			console.log("here")
			throw(err)
		}
	}

}
var controller=new ProvinciasController()

module.exports.controller=controller