const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 3000  // CASO MUDE, LEMBRE DE MUDAR OS FETCH'S NO MAIN.JS

app.use(cors({
    origin: 'http://127.0.0.1:5500' //CASO SEU INDEX.HTML RODE EM OUTRO ENDEREÇO MUDE AQUI
  }));
app.use(express.json())

app.listen(port, ()=>{
    //link do cluster MONGODB'
    mongoose.connect('troque pelo link'); 
    console.log('Servidor ativo')
})

const filmSchema = new mongoose.Schema({
    imgUrl: {type: String},
    title: {type: String, unique: true, required: true},
    year: {type: Number, min: 1888},
    description: {type: String},
})

const filmModel = new mongoose.model('filmModel', filmSchema)

//Criar um film
app.post('/create', async (req, res)=>{
    try{
        // const newFilm = new filmModel(req.body)
        const newFilm = new filmModel(req.body)
        await newFilm.save()
        res.status(200).send({message: 'Salvo'})
    } catch(err){
        return res.send(err)
    }
})

//Listar todos os films
app.get('/list', async (req, res)=>{
    const listFilms = await filmModel.find()
    return res.send(listFilms)
})

//Achar um film
app.get('/find/:title', async (req, res)=>{
    const listFilms = await filmModel.find({title: req.params.title})
    return res.send(listFilms)
})

//Update film
app.put('/update/:title', async (req, res)=>{
    const updateFilm = await filmModel.findOneAndUpdate({title: req.params.title}, req.body, {new: true})
    res.send(updateFilm)
})

//Delete film
app.delete('/delete/:title', async (req, res)=>{
    const deleteFilm = await filmModel.findOneAndDelete({title: req.params.title}, {new:true})
    res.status(200).send({message:'Deletado'})
})