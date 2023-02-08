const express = require('express');
const app = express();
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

app.get('/users', (req,res) => {
	res.json(users)
})

//Creacion de Usuario
app.post('/users', async (req,res) => {
	try{
		const hashedPassword = await bcrypt.hash(req.body.pass, 10)
		const user = { name: req.body.name, pass: hashedPassword}
		users.push(user)
		res.status(201).send()

	}catch{
		res.status(500).send()
	}
})

//Autentificacion de usuario
app.post('/login', async (req,res) => {

	const user = users.find( user => user.name === req.body.name)

	if( user == null){
		return res.status(400).send('Cannnot find user')
	}
	try{
		if( await bcrypt.compare(req.body.pass, user.pass)){
			res.send('Success')
		}else{
			res.send('Not allowed')
		}
	}catch {
		res.status(500).send()
	}
})

app.listen(3000)