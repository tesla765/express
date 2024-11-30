import express from 'express'
const app = express()
const port = 3000
app.use(express.json())

let teaData = []
let nextId = 1

//add a new tea
app.post('/teas', (req, res) => {

    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(teaData)
})

//get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

//get all tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Sorry Bro, Not Available')
    }
    res.status(200).send(tea)
})

//update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Sorry')
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

//delete
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('Tea not found to be deleted')
    }
    teaData.splice(index, 1)
    return res.status(204).send('Deleted')
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`)
})