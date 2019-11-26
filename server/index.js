const express = require('express')
const app = express()
const port = 3456
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', (req, res) => res.send('Hello! This is the motion sensor testing app.'))

const queueSize = 3
let queue_x = []
let queue_y = []

// Returns true if list is ascending, false if descending, null if neither
function aord(arr) {
    if (!arr) return null
    asc = true
    des = true
    let prev = arr[0]
    for (const e in arr) {
        if (arr[e] > prev) {
            des = false
        } else if (arr[e] < prev) {
            asc = false
        }
    }
    return (asc ^ des) ? asc : null
}

app.post('/reflect', (req, res) => {
    const { motion_center_x, motion_center_y } = req.body
    const x = +motion_center_x
    const y = +motion_center_y
    if (queue_x.length == 0 || Math.abs(queue_x[queue_x.length - 1] - x) > 3) queue_x.push(x)
    if (queue_y.length == 0 || Math.abs(queue_y[queue_y.length - 1] - y) > 3) queue_y.push(y)
    if (queue_x.length > queueSize) queue_x.shift()
    if (queue_y.length > queueSize) queue_y.shift()
    const asc = aord(queue_x)
    if (asc === null || queue_x.length < queueSize) {
        // pass
    } else if (!asc) {
        console.log("right")
        queue_x = []
    } else {
        console.log("left")
        queue_x = []
    }
    res.send(req.body)
})

app.listen(port, () => console.log(`Listening on port ${port}!`))

