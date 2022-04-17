import mysql from "mysql";

var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });



  /* 
  
  1. how to connect myseqel to sequl pro fro local host
  2. reset mysql pw
  3. add it to ENV-file
  4. ACCESS ENV-file
  5. library authentication
  6. https://codeshack.io/basic-login-system-nodejs-express-mysql/
            express session() - session storage,

  7. encrypt using BCRYPT
  8. make sure I'm creating tables inside nodejs - so so they update the tables
  9. 
  
  */