const express = require('express')
const router = express.Router()
const Carrito = require('../controllers/Carrito')
const Producto = require('../controllers/Producto')

router.get('/', (req, res) => {
    const getCarrito = Carrito.get()
    const carrito = JSON.parse(getCarrito)

    if (carrito.length > 0) {
        res.render('../views/carrito', { carrito })
    } else {
        res.status(404).json({
            error: 'no hay productos en el carrito'
        })
    }
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    const carrito = Carrito.getById(id)
    res.render('../views/carrito', { carrito })
})

router.post('/:id', (req, res) => {
    const getCarrito = Carrito.get()
    const carrito = JSON.parse(getCarrito)
    const { id } = req.params
    const productoConId = Producto.getById(id)[0]
    const nuevoItem = {
        id: carrito.length + 1,
        timestamp: new Date(),
        producto: {
            id: productoConId.id,
            timestamp: productoConId.timestamp,
            name: productoConId.name,
            description: productoConId.description,
            code: productoConId.code,
            thumbnail: productoConId.thumbnail,
            price: productoConId.price,
            stock: productoConId.stock,
        }
    }
    Carrito.post(nuevoItem)
    res.send()
});

router.delete("/:id", (req, res) => {
    const { id } = req.params
    Carrito.delete(id)
    res.send()
});

module.exports = router;