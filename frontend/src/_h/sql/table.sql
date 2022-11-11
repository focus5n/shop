CREATE TABLE user(                              
  id INT(50) NOT NULL AUTO_INCREMENT,                 
  name VARCHAR(100) NOT NULL,        
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,         
  user_registered  DATETIME,                                     
  CONSTRAINT user PRIMARY KEY(id)             
);


