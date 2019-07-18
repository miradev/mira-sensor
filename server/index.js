const express = require('express')
const app = express()
const port = 3456
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', (req, res) => res.send('Hello! This is the motion sensor testing app.'))

app.post('/reflect', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.listen(port, () => console.log(`Listening on port ${port}!`))

