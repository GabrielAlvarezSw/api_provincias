const model = require('../models/provincia.js')
const exceptions = require("../exceptions/exceptions.js")
const mongoose = require("mongoose")

class ProvinciasDao{

	
	all(){
		return new Promise((resolve, reject)=>{
			let provincias = model.Provincia.find({},(err, provincias)=>{
				if(err){
					reject(err)
					return
				}
				resolve(provincias)
			})
		})		
	}

	find(id){
		return new Promise((resolve, reject)=>{
			 model.Provincia.findById(id, (err, provincia)=>{
			 	if(err){
			 		//cuando se envia un ObjectId invalido , tira un CastError.
			 		//Debe castearse como nulo para no romper la logica de la app
			 		if(err instanceof mongoose.Error.CastError){
			 			resolve(null)
			 			return
			 		}
			 		reject(err)
			 		return
			 	}
			 	resolve(provincia)
			 	return
			 })
		})
		
	}
	delete(id){
		return new Promise(async (resolve, reject)=>{
			let provincia = undefined	
			try{
				provincia = await this.find(id)
			}catch(err){
				reject(err)
				return
			}
			if(!provincia){
				reject(new exceptions.ProvinciaNotFoundException("No se encuentra la provicincia seleccionada."))
				return
			}

			model.Provincia.deleteOne({_id:id}, (err, doc)=>{
				console.log(doc)
				if(err){
					reject(err)
					return
				}
				resolve(provincia)
			})	

		})
		
	}
	create(provincia){
		return new Promise((resolve, reject)=>{
			let provinciaModel 	= new model.Provincia({
				name:provincia.name,
				country:provincia.country	
			})

			provinciaModel.save(function(err, prov){
				if(err){
					reject(err)
					return
				}
				resolve(prov)
				return
			})
		})
	}
	update(provincia, id){
		return new Promise(async (resolve, reject)=>{
			let provinciaModel = undefined
			try{
				 provinciaModel = await this.find(id)
			}catch(err){
				//reject(new exceptions.ProvinciaNotFoundException("Recurso no encotnrado"))
				reject(err)
				return
			}
			if(!provinciaModel){
				reject(new exceptions.ProvinciaNotFoundException("No se encuentra la provicincia seleccionada."))
				return
			}
			provinciaModel.name = provincia.name
			provinciaModel.country = provincia.country
			try{
			await provinciaModel.save()
			}catch(err){
				reject(err)
				return
			}
			resolve(provinciaModel)

		})
	}

}

exports.dao = new ProvinciasDao()