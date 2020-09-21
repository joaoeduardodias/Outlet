const Connection = require("../../database");
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken');


module.exports = {

   async create (req, res) {
      const [,hash] =  req.headers.authorization.split(' ')
      const [email, password] = Buffer.from(hash, 'base64')
      .toString()
      .split(':')
      
      
      const verifyUser = await Connection('Users').select('email', 'password','id','name','administrador').where('email', email).first()
      if(!verifyUser) {return res.json({message: 'Email incorrect'}) }

      bcrypt.compare(password,verifyUser.password, function(err, result) {
        if(err){ return res.json({message: "Ocorreu um erro"})}
        
        if(result == true) {
         const {id,administrador,name }= verifyUser; //esse id vem do banco de dados
         
         const token = jwt.sign({ id, administrador, name}, process.env.SECRET, {
           expiresIn: 86400 // expires in 24 hr
         });
         //  res.json({ auth: true, token: token });
        return   res.header('auth-token' ,token).send()

        }
        if(result == false) {
           return res.status(401).json({message: "Invalid  Password"})
        }
                                 
      })
      

   },

   
  
   
}