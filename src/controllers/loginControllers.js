const bcrypt = require('bcrypt')

//Schemas
const UserSchema = require('../models/users')

exports.createUser = async (req,res) => {
	const EmailAlreadyInUse = Boolean((await UserSchema.find({ email: req.body.email })).length)
	try{
		if(!EmailAlreadyInUse){
			const hashedPassword = await bcrypt.hash(req.body.password, 10)
			const  NewUserData = { name: req.body.name, password: hashedPassword, email : req.body.email}
			UserSchema(NewUserData)
				.save()
				.then( () => res.status(201).send('User was created sucsefully'))
				.catch( (err) => res.status(500).send(err))
		}
		else{
			res.status(409).send('Email alrady in use')
		}
	}catch(err){
			res.status(500).send(err)
	}
}

exports.aunthenticateUser = async (req,res) => {

	const User = UserSchema.find({ email: req.body.email})

	if( User == null){
		return res.status(400).send('Cannnot find user')
	}

	try{
		if( await bcrypt.compare(req.body.pass, User.pass)){
			res.status(200).send('Success')
		}else{
			res.status(401).send('Not allowed')
		}
	}catch(err) {
		res.status(500).send(err)
	}
}

exports.updateUser = async (req,res) => {
	const {id} = req.params
	const {name,password,email} = req.body

	const User =	await UserSchema
	.findById(id)
	.then( (data) => data)
	.catch( () => false)

	if( User == false){
		res.status(404).send('User not found')
	}else{
		const EmailAlreadyInUse = Boolean((await UserSchema.find({ email: email })).length)
		const VerifiedPassword = await bcrypt.compare(password, User.password)
		if(!EmailAlreadyInUse){
			if(VerifiedPassword){
				UserSchema
				.updateOne(
					{ _id : id },
					{	$set : {name,email} })
				.then( () => res.status(200).send('User updated sucsefully'))
				.catch( (err) => res.status(500).send(err))
			}else{
				res.status(401).send('Not Allowed')
			}
		}else{
			res.status(409).send('Email alrady in use')
		}
		
	}
}
