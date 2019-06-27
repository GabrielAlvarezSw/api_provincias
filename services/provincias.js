const dao = require('../daos/provincias.js').dao
const model=require('../models/provincia.js')
const exceptions=require('../exceptions/exceptions.js')
class ProvinciasService{
	constructor(){

	}

	getAll(){
		return dao.all()
	}
	get(id){
		return dao.find(id)
	}
	async delete(id){
		let deleted = await dao.delete(id)
		return deleted
	}
	async create(data){

		let provincia = undefined
		try{
			 provincia = await dao.create(data)
			
		}catch(err){
			console.log("err!")
			console.log(err)
			throw(err)
		}

		return provincia

	}
	async update(id,data){
	
		let provincia = await dao.update(data, id)
		
		return provincia
	}


}
var service = new ProvinciasService()

module.exports.service=service