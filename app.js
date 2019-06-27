const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controllers/provincias.js').controller
const mongoose = require("mongoose")
const configs = require('./configs.js')
const handler = require("./exceptions/handler.js")
mongoose.connect(configs.dbName,{useNewUrlParser:true},(err, conn)=>{
	if(err){
		console.log("Error de conexion con MongoDB")
		console.log(err)
		process.exit()
	}else{
		console.log("Conectado con MongoDB")
	}
})


const app = express()


app.use(bodyParser.json())
app.get('/', function(req, res){

})
app.get('/provincias',  function(req, res){
	 controller.getAll(req, res)
})
app.post('/provincias', async function(req, res, next){
	try{
		await controller.create(req,res)
	}catch(err){
		next(err)
	}
})
app.get('/provincias/:provincia',  function(req, res){
	try{
	 controller.get(req,res)
	}catch(err){
		next(err)
	}
})
app.post('/provincias/:provincia',async  function(req,res, next){
	try{
		await controller.update(req, res)
	}catch(err){
		next(err)
	}
})
app.delete('/provincias/:provincia', async function(req, res, next){
	try{
		await controller.delete(req,res)
	}catch(err){
		next(err)
	}
})

app.use(handler.handle)

app.listen(8000)
console.log("server started")

