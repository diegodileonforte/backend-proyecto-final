const express = require('express')
const app = express()
const path = require('path')

app.use(express.json());
app.use(express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'ejs')

app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/', (req, res) => { res.render('../views/index'); })


const productRoutes = require('../routes/productos');
app.use('/productos', productRoutes)

const cartRoutes = require('../routes/carrito');
app.use('/carrito', cartRoutes)

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))