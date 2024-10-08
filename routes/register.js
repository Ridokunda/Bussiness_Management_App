var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
 const connection = require('../database/connection');

// GET registeruser page
router.get('/registeruser', function(req, res, next) {
  res.render('registeruser', { title: 'Register Page', message: null });
});
// GET registerCustomer page
router.get('/register', function(req, res, next) {
    res.render('registerCustomer', { title: 'Register Page', message: null });
});



/* POST add a user*/
router.post('/register', async (req, res) =>{
    const { name, surname , address, email, password} = req.body;
    const query1 = "INSERT INTO users (name,surname,address,email,password) VALUES (?,?,?,?,?)";
    
    const query2 = `SELECT * FROM users WHERE email='${email}'`;
    try{

      const hash = await bcrypt.hash(password,10);
      connection.query(query1, [name,surname,address,email,hash], (err,result) =>{
        if(err){
          console.error('Error while searching for user in the database', err);
          return res.status(501).send('internal server error');
        }
        
        res.render('registerCustomer', { title: 'Register Page', message: "Registration successful" });
        
  
      });
    }catch(err){
      console.error('error hashing password', err);
      return res.status(500).send('error with hashing');
    }
    
});
/* POST add a user*/
router.post('/registeruser', async (req, res) =>{
  const { name, surname , usertype, email, password} = req.body;
  const query1 = "INSERT INTO users (name,surname,usertype,email,password) VALUES (?,?,?,?,?)";
  
  const query2 = `SELECT * FROM users WHERE email='${email}'`;
  try{

    const hash = await bcrypt.hash(password,10);
    connection.query(query1, [name,surname,usertype,email,hash], (err,result) =>{
      if(err){
        console.error('Error while searching for user in the database', err);
        return res.status(501).send('internal server error');
      }
      
      res.status(200).send('User successfully registered');
      

    });
  }catch(err){
    console.error('error hashing password', err);
    return res.status(500).send('error with hashing');
  }
  
});
module.exports = router;


