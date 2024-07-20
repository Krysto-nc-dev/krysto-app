import path from 'path'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import multer from 'multer'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const port = process.env.PORT || 5000

connectDB()
const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// Cookie parser middleware
app.use(cookieParser())

// Define routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/articles', articleRoutes)
app.use('/api/v1/upload', uploadRoutes)

// faire le même systeme avec dollapikey ! pour ne pas stocker dans le frontend ??
app.get('/api/v1/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})
app.get('/api/v1/config/dolibarr', (req, res) => {
  res.send({ DOLAPIKEY: process.env.DOLAPIKEY })
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Configuration pour la production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

// Middleware pour gérer les erreurs 404
app.use(notFound)

// Middleware pour gérer les autres erreurs
app.use(errorHandler)

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
