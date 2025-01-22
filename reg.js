var express = require("express")
var bcrypt = require("bcrypt")
var connection = require("./index1.js")
var app = express()
app.use(express.json())

app.post("/reg", (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.send({
                msg: err.message,
                statuscode: 400
            })
        }
        else {
            req.body.password = hash
            var query = "insert into userdata (user,email,password,location) values (?,?,?,?)"
            var { user, email, password, location } = req.body
            connection.query(query, [user, email, password, location], (err, data) => {
                if (err) {
                    res.send({
                        msg: err.message,
                        statuscode: 400
                    })
                } else {
                    res.send({
                        msg: "register successfull",
                        data: data,
                        statuscode: 200
                    })
                }
            })

        }
    })

})

app.get("/login", (req, res) => {
    connection.query(`select * from userdata where user=?`, [req.body.user], (err, data) => {
        if (err) {
            res.send({
                msg: err.message,
                statuscode: 400
            })
        } else {
            if (data.length > 0) {
                bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                    if (err) {
                        res.send({
                            msg: err.message,
                            statuscode: 400
                        })
                    } else {
                        res.send({
                            data: result,
                            statuscode: 200
                        })
                    }
                })
                res.send({
                    data: data,
                    statuscode: 200
                })
            } else {
                res.send("please register")
            }
        }
    })
})

app.listen(4000, () => {
    console.log("server started")
})