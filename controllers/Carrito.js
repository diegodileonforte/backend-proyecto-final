const fs = require('fs')

class Carrito {

    constructor() {

    }

    get() {
        try {
            const data = fs.readFileSync('carrito.json', 'utf-8')
            return data
        } catch (error) {
            return []
        }
    }

    getById(id) {

        try {
            const productosEnCarrito = fs.readFileSync('carrito.json', 'utf-8')
            let parsedJSON = JSON.parse(productosEnCarrito)
            let productoConId = parsedJSON.filter((producto) => producto.id === parseInt(id))
            return productoConId
        } catch (error) {
            return []
        }
    }

    post(item) {
        try {
            let carrito = this.get()
            let carritoParseado = JSON.parse(carrito)

            if (typeof carrito == 'string') {

                carritoParseado.push(item);
                fs.writeFileSync('carrito.json', JSON.stringify(carritoParseado, null, 1))

            }
        } catch (err) {
            console.log(err)
        }
    }

    delete(id) {
        let carrito = this.get()
        let carritoParseado = JSON.parse(carrito);
        let nuevoCarrito = carritoParseado.filter(prodId => prodId.id !== parseInt(id))
        fs.writeFileSync('carrito.json', JSON.stringify(nuevoCarrito, null, 1))
    }
}

module.exports = new Carrito()