const express = require('express')
const router = express.Router()
const producto = require('../controllers/Producto.js')

router.get("/", (req, res) => {
    const getProductos = producto.get()
    const productos = JSON.parse(getProductos)
    
    if (productos.length > 0) {
        res.render('../views/index', { productos })
    } else {
        res.status(404).json({
            error: 'no hay productos cargados'
        })
    }
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    const productos = producto.getById(id)
    res.render('../views/index', { productos })
})

router.post("/", (req, res) => {
    const data = req.body
    producto.post(data)
    res.send()    
})

router.put("/:id", (req, res) => {
    const data = req.body
    const { id } = req.params
    producto.put(id, data)
    res.send()
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    producto.delete(id)
    res.send()
})

module.exports = router