DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Donovan Mitchell Jersey', 'Jerseys', 200, 100), ('Rudy Gobert Jersey', 'Jerseys', 170, 120),
('Derrick Favors Jersey', 'Jerseys', 250, 90), ('Ricky Rubio Jersey', 'Jerseys', 220, 100),
('Donovan Issue #1 Shoes', 'Shoes', 50, 250), ('Spida Mitchell VENOM Shoes', 'Shoes', 30, 300),
('Utah Jazz Signed Basketball', 'Misc', 1, 1000), ('Epke Udoh Book Club Membership', 'Misc', 10000, 25); 

SELECT * FROM bamazon_DB.products;