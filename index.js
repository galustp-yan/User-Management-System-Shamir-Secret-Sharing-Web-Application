require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cookieParser = require('cookie-parser');
// const clipboardy = require('clipboardy');


var app = express();

const PORT = process.env.PORT || 3000;
const urlBD = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(urlBD);
const dbName = 'users';

//////////////////////////////////////////////////////////

async function DBAdminCreate() {
    userDataForAdmin = {
        userName: "admin0",
        password: "Admin0",
        level: "admin",
        secretKey: {
            one: "",
            two: ""
        }
    }
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('uniqUser');
    const options = {
        projection: { _id: 0 }
    };
    //   console.log(data.login);
    userOne = await collection.findOne({ userName: "admin0" }, options);
    // console.log(userOne);
    if (userOne == null) {
        userOne = await collection.insertOne(userDataForAdmin);
    }
}
DBAdminCreate();

//////////////////////////////////////////////////////////

app.set('view engine', 'ejs');
app.use("/public", express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());


var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', function (req, res) {
    res.render('signIn_page');
});

app.get('/signIn_page', function (req, res) {
    res.render('signIn_page');
});

app.get('/createUser_page', function (req, res) {
    res.render('createUser_page');
});

app.post('/acceptList', urlencodedParser, function (req, res) {
    async function DBaccept() {
        await client.connect();
        const db = client.db(dbName);
        const options = {
            projection: { _id: 0 }
        };
        acceptData = {
            userName: req.body.userName
        }
        // const collection = db.collection('uniqUser');
        collection = db.collection('secretAccepted');
        let userFound = await collection.findOne({ userName: req.body.userName }, options);
        // console.log(userFound);
        if (userFound == null) {
            userOne = await collection.insertOne(acceptData);
            res.json({ successful: true });
        } else {
            res.json({ successful: true });
        }
    }
    DBaccept();
});

app.post('/cancelUniqAcceptList', urlencodedParser, function (req, res) {
    async function DBaccept() {
        await client.connect();
        const db = client.db(dbName);
        const options = {
            projection: { _id: 0 }
        };
        let acceptData = {
            userName: req.body.userName
        }
        // const collection = db.collection('uniqUser');
        collection = db.collection('secretAccepted');
        let userFound = await collection.findOne({ userName: req.body.userName }, options);
        // console.log(userFound);
        if (userFound != null) {
            let result = await collection.deleteOne(acceptData);
            res.json({ successful: true });
        } else {
            res.json({ successful: true });
        }
    }
    DBaccept();
});

app.post('/userinfo', urlencodedParser, function (req, res) {
    async function DBuserGetInfo() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('uniqUser');
        const options = {
            projection: { _id: 0 }
        };
        //   console.log(data.login);
        let userFound = await collection.findOne({ userName: req.body.userName }, options);
        // console.log(userFound);
        if (userFound == null) {
            res.json({ successful: true });
        } else {
            if (userFound.level == "user") {
                res.json({ firstName: userFound.firstName, lastName: userFound.lastName, secretKey: [userFound.secretKey.one] });
            } else {
                res.json({ firstName: userFound.firstName, lastName: userFound.lastName, secretKey: [userFound.secretKey.one, userFound.secretKey.two] });
            }
        }
    }
    DBuserGetInfo();
});

app.post('/deletAllUsersAllKeys', urlencodedParser, function (req, res) {
    async function DBDeleteAllKeysFunkAsync() {
        await client.connect();
        const db = client.db(dbName);
        let collection = db.collection('uniqUser');
        let update = {
            $set: {
                secretKey: {
                    one: "",
                    two: ""
                }
            }
        };
        let usersFounded = await collection.updateMany({ userName: { $ne: req.body.userName } }, update);
        collection = db.collection('secretAccepted');
        let result = await collection.deleteMany({});
        res.json({ successful: false });
    }
    DBDeleteAllKeysFunkAsync();
});

app.post('/addAndDeleteAndSuperChangeURL', urlencodedParser, function (req, res) {
    const params = {
        userName: req.body.userName,
        requetBody: req.body.requetBody,
        secretKey: req.body.secretKey
    }
    // console.log(params);
    filter = { userName: params.userName };
    update = {
        $set: {
            level: "super",
            secretKey: {
                one: "",
                two: ""
            }
        }
    };
    if (params.requetBody == "super") {
        update.$set.level = "super";
    } else if (params.requetBody == "disableSuper") {
        // update.$set.level = "user";
        update.$set = {
            "level": "user",
            'secretKey.two': ""
        }
    } else if (params.requetBody == "delete") {
        update.$set = {
            secretKey: {
                one: "",
                two: ""
            }
        }
    } else if (params.requetBody == "add1" || params.requetBody == "change1") {
        update.$set = {
            'secretKey.one': params.secretKey
        }
        // update.$set.secretKey.one = params.secretKey;
    } else if (params.requetBody == "add2" || params.requetBody == "change2") {
        // update.$set.secretKey.two = params.secretKey;
        update.$set = {
            'secretKey.two': params.secretKey
        }
    }

    if (params.requetBody == "change1" || params.requetBody == "change2") {
        async function DBDelUniqAccept() {
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection('secretAccepted');
            let result = await collection.deleteOne({ userName: params.userName });
        }
        DBDelUniqAccept();
    }

    async function DBuserGetInfo() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('uniqUser');
        if (params.requetBody == "super") {
            // update.$set.level == "super"
            const options = {
                projection: { _id: 0 }
            };
            let usersFounded = await collection.find({ level: "super" }, options);
            let usersFoundedList = await usersFounded.toArray();
            if (usersFoundedList.length == 0) {
                let updateOne = await collection.updateOne(filter, update);
                res.json({ successful: params.requetBody });
            } else {
                res.json({ successful: true });
            }
        } else if (params.requetBody == "disableSuper" || params.requetBody == "delete") {
            // console.log(update);
            let updateOne = await collection.updateOne(filter, update);
            res.json({ successful: params.requetBody });
        } else if (params.requetBody == "add1" || params.requetBody == "change1") {
            // console.log("update");
            // // console.log(update);
            let updateOne = await collection.updateOne(filter, update);
            res.json({ successful: params.requetBody });
        } else if (params.requetBody == "add2" || params.requetBody == "change2") {
            // console.log(params);
            let updateOne = await collection.updateOne(filter, update);
            res.json({ successful: params.requetBody });
        }

    }
    DBuserGetInfo();
});

app.post('/usersInfo', urlencodedParser, function (req, res) {
    async function DBuserGetInfo() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('uniqUser');
        const options = {
            projection: { _id: 0 }
        };
        //   console.log(data.login);
        // let userFound = await collection.findOne({userName: req.body.userName}, options);
        let usersFounded = await collection.find({ userName: { $ne: req.body.userName } }, options);
        let usersFoundedList = await usersFounded.toArray();
        // console.log(usersFoundedList.length);
        // res.json({successful: usersFounded});
        if (usersFoundedList.length === 0) {
            res.json({ successful: true });
        } else {
            res.json({ successful: usersFoundedList });
        }
    }
    DBuserGetInfo();
});

app.post('/acceptedChack', urlencodedParser, function (req, res) {
    async function DBacceptChack() {
        await client.connect();
        const db = client.db(dbName);
        const options = {
            projection: { _id: 0 }
        };
        // let acceptData = {
        //     userName: req.body.userName
        // }
        collection = db.collection('secretAccepted');
        let usersFounded = await collection.find({}, options).toArray();
        if (usersFounded != null) {
            collection = db.collection('uniqUser');
            var arr = [];
            for (let i = 0; i < usersFounded.length; i++) {
                let userFound = await collection.findOne({ userName: usersFounded[i].userName }, options);
                arr.push(userFound);
            }
            res.json({ successful: arr });
        } else {
            res.json({ successful: true });
        }
    }
    DBacceptChack();
});

app.post('/signIn', urlencodedParser, function (req, res) {
    signInData = {
        userName: req.body.userName,
        password: req.body.password
    };

    async function DbSignInUser() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('uniqUser');
        const options = {
            projection: { _id: 0 }
        };
        let userFound = await collection.findOne({ userName: signInData.userName, password: signInData.password }, options);
        if (userFound == null) {
            res.json({ successful: true });
        } else {
            if (userFound.level == "user") {
                cookie_name = "user";
                let minute = 3600 * 1000;
                res.cookie(cookie_name, userFound.userName, { maxAge: minute });
                res.json({ level: userFound.level });
            } else if (userFound.level == "admin") {
                cookie_name = "admin";
                let minute = 3600 * 1000;
                res.cookie(cookie_name, userFound.userName, { maxAge: minute });
                res.json({ level: userFound.level });
            } else {
                cookie_name = "super";
                let minute = 3600 * 1000;
                res.cookie(cookie_name, userFound.userName, { maxAge: minute });
                res.json({ level: userFound.level });
            }
        }
    }
    DbSignInUser();
});

app.get('/adminCabinet_page', function (req, res) {
    res.render('adminCabinet_page');
});

app.get('/user_verified_keys', function (req, res) {
    res.render('user_verified_keys');
});

app.get('/example', function (req, res) {
    res.render('example');
});

app.get('/userCabinet_page', function (req, res) {
    res.render('userCabinet_page');
});


app.post('/createUser', urlencodedParser, function (req, res) {
    userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        level: "user",
        secretKey: {
            one: "",
            two: ""
        }
    };

    async function DbCreateUser() {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('uniqUser');
        const options = {
            projection: { _id: 0 }
        };
        //   console.log(data.login);
        userOne = await collection.findOne({ userName: userData.userName }, options);
        // console.log(userOne);
        if (userOne == null) {
            userOne = await collection.insertOne(userData);
            res.json({ successful: true });
        } else {
            res.json({ successful: false });
        }
    }
    DbCreateUser();
});





app.listen(PORT);