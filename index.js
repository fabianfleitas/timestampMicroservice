const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")

app.use(cors({ optionSuccessStatus: 200 }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})

/* Receive a date */
app.get("/api/:date", (req, res) => {
    let result = transformTime(req.params.date)
    res.json(result)

})

/*Actual date*/
app.get("/api/", (req, res) => {
    let result = transformTime(Date())
    res.json(result)
})

const transformTime = date => {
    if (/-|[a-zA-Z]/.test(date)) { //if date has "-" or words
        date = new Date(date).getTime()
    } else {
        date = parseInt(date)
    }

    let unix = date;
    let utc = new Date(date).toUTCString(); // convert date to UTC format
    let result;

    if (!unix) {
        result = { "error": "Invalid Date" };
    } else {
        result = { "unix": unix, "utc": utc };
    }
    return result
}