const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const app = express();
const mysql = require ('mysql');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CoffeeDB',
    supportBigNumbers: true
})




const getUserById = (req, res) => {
  const id = req.params.id;
  const sqlSelect = `SELECT * FROM users WHERE id = '${id}';` 
  db.query(sqlSelect, (err, result) => {
      if (err){
          res.send(err);
          throw err;
      } 
      console.log(result);
      res.send(result);
  })  
}

const createUser = (req, res) => {    
  const uniqueId = uuidv4();
  const user = {
      username: req.body.username,
      password: req.body.password
  }
  const sqlInsert = `INSERT INTO users (id, username, password) VALUES ('${uniqueId}', '${user.username}', '${user.password}');`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error.');
    } else if (result.length === 0) {
      res.status(401).send('Invalid username or password.');
    } else {
      res.status(200).json({ id: uniqueId });
    }
      
      
  })
}

const login = (req, res) => {    
  const user = {
      username: req.body.username,
      password: req.body.password
  }
  const sqlSelect = `SELECT id FROM users WHERE username = '${user.username}' AND password = '${user.password}';`
  db.query(sqlSelect, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error.');
      } else if (result.length === 0) {
        res.status(401).send('Invalid username or password.');
      } else {
        res.status(200).json({ id: result[0].id });
      }
    });
}

const getAllProducts = (req, res) => {
  const sqlSelect = `SELECT * FROM products;` 
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Server error.');
        } else if (result.length === 0) {
          res.status(401).send('No items to show');
        } else {
          res.status(200).json(result);
        }
  });
}

app.post('/add-product', (req, res) => {    
  const orderId = req.body.orderId;
  const product = req.body.productId;
  const sqlInsert = `INSERT INTO order_details (order_id, product_id) VALUES ('${orderId}', '${product}');`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
        res.send(err);
        throw err;
    } else{
      res.send(result);
    }
    console.log(result);
  });
})

const getOrdersByUser = (req, res) => {
  const userId = req.params.userId;
  const sqlSelect = `SELECT * FROM orders WHERE user_id = '${userId}';`; 
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Server error.');
        } else if (result.length === 0) {
          res.status(401).send('No items to show');
        } else {
          res.status(200).json({id: result[0].id});
        }
  });
}

const getOrderDetails = (req, res) => {
  const orderId = req.params.orderId;
  const sqlSelect = `SELECT * FROM products WHERE products.id IN (SELECT product_id FROM order_details WHERE order_details.order_id = '${orderId}') ;`; 
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Server error.');
        } else if (result.length === 0) {
          res.status(401).send('No items to show');
        } else {
          res.status(200).json(result);
        }
  });
}

const createOrder = (req, res) => {    
  const userId = req.params.userId;

  const sqlInsert = `INSERT INTO orders (user_id, total_price) VALUES ('${userId}', '0');`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
        res.send(err);
        throw err;
    } else{
      
      res.send(result);
    }
    console.log(result);
    
  });
}

const deleteItemFromCart = (req, res) => {
  const prodId = req.params.prodId;
  const orderId = req.params.orderId;
  const sqlSelect = `DELETE FROM order_details WHERE order_id = '${orderId}' AND product_id = '${prodId}';`; 
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Server error.');
        } else if (result.length === 0) {
          res.status(401).send('No items to show');
        } else {
          res.status(200).json(result);
        }
  });
}


//USERS

app.get('/user/:id', getUserById)

app.post('/user', createUser)

app.post('/login', login)


//PRODUCTS
const addProduct = 
app.get('/products', getAllProducts)  


//ORDERS

app.get('/order/:userId', getOrdersByUser)  

app.get('/order-details/:orderId', getOrderDetails)

app.post('/create-order/:userId', createOrder)
  
app.delete('/cart-item/:prodId/:orderId', deleteItemFromCart)  


app.listen(4001, () => console.log('Listening on port 4001...'));