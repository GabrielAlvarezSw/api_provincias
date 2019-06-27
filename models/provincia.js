const mongoose = require('mongoose')

let ProvinciaSchema = new mongoose.Schema({
	
	name:{
		type: String,
		trim:true,
		required: true
	},
	country:{
		type:String,
		trim:true,
		required:true
	},

	updated : {
		type: Date,
		default: Date.now()

	},
	created:{
		type: Date,
		default: Date.now()
	}
})

let Provincia = mongoose.model("Provincia",ProvinciaSchema)

module.exports={
	Provincia
}