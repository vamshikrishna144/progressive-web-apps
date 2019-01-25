const express = require('express')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')

const app = express()
const port = 4567

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  )
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next();
})

let items = [
  { id: uuidv4(), item: 'Learn about PWAs' },
  { id: uuidv4(), item: 'Make an awesome app' }
]

app.get('/items.json', (req, res) => {
  console.log(`Get ----- ${new Date()}`)
console.log(`Getting items`)
  res.json(items)
})

app.post('/items.json', (req, res) => {
  items.push({
    id: uuidv4(),
    item: req.body.item
  })

  console.log(`Adding ----- ${new Date()}`)
  console.log(`Adding item ${req}`)
  res.json(items)
})

app.delete('/items.json', (req, res) => {
  items = items.filter(item => {
    if(item.id !== req.body.id) {
      return item
    }
  })
  console.log(`Deleting ----- ${new Date()}`)
  console.log(`Deleting ${req.body.id}`)
  res.json(items)
})

app.listen(port, () => console.log(`Listening on ${port}...`))
