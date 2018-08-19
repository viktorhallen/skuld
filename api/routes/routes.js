var faker = require("faker");

var appRouter = function (app) {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get("/", function (req, res) {
        res.status(200).send({ message: 'Welcome to our restful API' });
    });

    app.get("/user", function (req, res) {
        var data = ({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email()
        });
        res.status(200).send(data);
    });

    app.get("/users/:num", function (req, res) {
        var users = [];
        var num = req.params.num;

        if (isFinite(num) && num  > 0 ) {
            for (i = 0; i <= num-1; i++) {
                users.push({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    debts: {
                        beer:1,
                        pizza:-1
                    }
                });
            }

            res.status(200).send(users);

        } else {
            res.status(400).send({ message: 'invalid number supplied' });
        }

    });
}

module.exports = appRouter;