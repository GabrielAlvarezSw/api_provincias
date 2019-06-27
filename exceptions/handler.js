const exceptions = require("./exceptions.js")
const mongoose= require("mongoose")
function handle(err, req, resp, next){
	console.log("error hanlder!!! ")
	console.log(err)
	if(err instanceof mongoose.Error.ValidationError){

		let payload ={}
		if(err.errors){
			for(let k in err.errors){
				payload[k]=parseMessage(err.errors[k].message)
			}

		}


		resp.status(402).json({
			success:false,
			message:parseMessage(err.message),
			errors:payload
		})
	}else if(err instanceof exceptions.ProvinciaNotFoundException){
		resp.status(404).json({
			success:false,
			message:err.message?err.message : "No se encuentra el recurso seleccionado."
		})
	}else{
		resp.status(500).json({
			success:false,
			message:"Rompiste el server! Comunicate con el administrador."
		})
	}

}



function parseMessage(message){
	return message.replace("Path","Field") //Esto no es lindo para nada
			//En un codigo real de produccion debería usarse un diccionario de mensajes de 
			//validacion para distintos idiomas. 
}

module.exports.handle = handle