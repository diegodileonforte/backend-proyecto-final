const fs = require('fs')

class ProductoController {

    constructor() {

    }

    get() {
        try {
            const data = fs.readFileSync('productos.json', 'utf-8')
            return data
        } catch (error) {
            return []
        }
    }

    getById(id) {

        try {

            const productos = fs.readFileSync('productos.json', 'utf-8')
            let parsedJSON = JSON.parse(productos)
            let productoConId = parsedJSON.filter((producto) => producto.id === parseInt(id))
            return productoConId

        } catch (error) {
            return []
        }
    }

    post(data) {
        try {
            let listadoDeProductos = this.get()

            if (typeof listadoDeProductos == 'string') {

                let parsedJSON = JSON.parse(listadoDeProductos)
                let nuevoProducto = {
                    id: parsedJSON.length + 1,
                    timestamp: new Date(),
                    name: data.name,
                    description: data.description,
                    code: data.code,
                    thumbnail: data.thumbnail,
                    price: data.price,
                    stock: data.stock,

                }

                parsedJSON.push(nuevoProducto);
                fs.writeFileSync('productos.json', JSON.stringify(parsedJSON, null, 1))

            } else {

                let newFile = [{
                    id: 1,
                    timestamp: new Date(),
                    name: data.name,
                    description: data.description,
                    code: data.code,
                    thumbnail: data.thumbnail,
                    price: data.price,
                    stock: data.stock,
                }]

                fs.writeFileSync('productos.json', JSON.stringify(newFile, null, 1))
            }
        } catch (err) {
            console.log(err)
        }
    }

    put(id, data) {
        let productos = this.get();
        let parsedProductos = JSON.parse(productos);

        let nuevaListadeProductos = parsedProductos.map(producto => {
            if (producto.id === parseInt(id)) {
                producto.timestamp = new Date()
                producto.name = data.name
                producto.thumbnail = data.thumbnail
            }
            return producto
        })

        fs.writeFileSync('productos.json', JSON.stringify(nuevaListadeProductos, null, 1));
    }

    delete(id) {
        let productos = this.get()
        let parsedProductos = JSON.parse(productos);
        let nuevaListaDeProductos = parsedProductos.filter(prodId => prodId.id !== parseInt(id))
        fs.writeFileSync('productos.json', JSON.stringify(nuevaListaDeProductos, null, 1))
    }
}

module.exports = new ProductoController()