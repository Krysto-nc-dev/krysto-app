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
app.use('/api-v1/users', userRoutes)

const __dirname = path.resolve()

// Middleware de Multer pour téléverser des fichiers dans le répertoire 'uploads'
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/
  const mimetype = filetypes.test(file.mimetype)
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  if (mimetype && extname) {
    return cb(null, true)
  }
  cb('Error: Images Only!')
}

const upload = multer({
  storage,
  fileFilter,
})

// Route pour téléverser une image
app.post('/upload', upload.single('cover'), (req, res) => {
  res.send({
    message: 'Image téléchargée avec succès',
    image: `/${req.file.filename}`,
  })
})

// Middleware pour servir les fichiers statiques dans le répertoire 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Route pour télécharger un fichier
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename)
  res.download(filePath)
})

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
