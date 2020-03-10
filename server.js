var soap = require('soap');
var express = require('express');
var app = express();

// Server side
var service = {
    calculator_service: {
        caclulator_port: {
            calculate: (args) => {
                return {response: `Answer of ${args.a} + ${args.b} is ${+args.a + +args.b}`};
            }
        }
    }
}
// xml data is extracted from wsdl file created
var xml = require('fs').readFileSync('./calculator.wsdl', 'utf8');

var server = app.listen(3030);
soap.listen(server, '/calculator', service, xml);


// Client side
var url = "http://localhost:3030/calculator?wsdl";
var args = { a: 5, b: 10 };
soap.createClient(url, function (err, client) {
    if (err)
        console.error(err);
    else {
        client.calculate(args, function (err, response) {
            if (err)
                console.error(err);
            else {
                console.log(response);
            }
        })
    }
});