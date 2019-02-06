var mysql = require("mysql");
var inquirer = require("inquirer");
var total = 0;

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Ridgewood1*",
    database: "bamazon_DB"
});
connection.connect(function(err) {
    if (err) throw err;
    shopItems();
  });

function shopItems() {
    connection.query("SELECT id, product_name, stock_quantity, price FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + "|", "Product: " + res[i].product_name + "|", "Quantity: " + res[i].stock_quantity + "|", "Price: $" + res[i].price);
        }
        console.log("--------------------");
        inquirer
            .prompt([
                {
                    name: "item",
                    type: "input",
                    message: "Please enter id of item to purchase:",
                    validate: function (value) {
                        if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?",
                    validate: function (value) {
                        if (isNaN(value)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
            ])
            .then(function (answer) {
                var itemStock = "SELECT stock_quantity FROM products WHERE id = " + parseInt(answer.item);
                var itemPrice = "SELECT price FROM products WHERE id = " + parseInt(answer.item);
                var quantity = parseInt(answer.quantity);
                console.log("Desired quantity: " + quantity);
                connection.query(itemPrice, function (err, result) {
                    if (err) throw err;
                    var cost = result[0].price * quantity;
                    console.log("Cost: " + cost);
                    total += cost;
                    console.log("Total: " + total);
                });
                connection.query(itemStock, function (err, result) {
                    if (err) throw err;
                    var stock = result[0].stock_quantity;
                    console.log("Quantity in stock: " + stock);
                    if (quantity <= stock && quantity > 0) {
                        var newQuantity = parseInt(stock) - quantity;
                        console.log("Remaining quantity: " + newQuantity);
                        var newSql = "UPDATE products SET stock_quantity = " + newQuantity + " WHERE id = " + parseInt(answer.item);
                        connection.query(newSql, function (err, result) {
                            if (err) throw err;
                        });
                    }
                    else {
                        console.log("Sorry, we don't have enough of that in stock.")
                    }
                    shopMore();
                });
            })
    })
};
function shopMore() {
    inquirer
        .prompt([{
            type: "confirm",
            name: "more",
            message: "Would you like to continue shopping?",
        }]).then(function (answer) {
            if (answer.more) {
                shopItems();
            } else {
                console.log("Thank you for your business.")
                console.log("Your total is: $ " + total);
                connection.end();
            }
        })
};
