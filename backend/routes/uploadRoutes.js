// // import path from 'path'
// // import express from 'express'
// // import multer from 'multer'

// // const router = express.Router()

// // const storage = multer.diskStorage({
// //   destination(req, file, cb) {
// //     cb(null, 'uploads/')
// //   },
// //   filename(req, file, cb) {
// //     cb(
// //       null,
// //       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
// //     )
// //   },
// // })

// // function fileFilter(req, file, cb) {
// //   const filetypes = /jpe?g|png|webp/
// //   const mimetypes = /image\/jpe?g|image\/png|image\/webp/

// //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
// //   const mimetype = mimetypes.test(file.mimetype)

// //   if (extname && mimetype) {
// //     cb(null, true)
// //   } else {
// //     cb(new Error("Ce fichier n'est pas valide ! "), false)
// //   }
// // }

// // const upload = multer({ storage, fileFilter })
// // const uploadSingleImage = upload.single('image')

// // router.post('/', (req, res) => {
// //   uploadSingleImage(req, res, function (err) {
// //     if (err) {
// //       res.status(400).send({ message: err.message })
// //     }

// //     res.status(200).send({
// //       message: 'Image telechargée avec succès',
// //       image: `/${req.file.path}`,
// //     })
// //   })
// // })

// // export default router

// // ============================== MULTIPLES IMAGES
// import path from 'path'
// import express from 'express'
// import multer from 'multer'

// const router = express.Router()

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
//     )
//   },
// })

// function fileFilter(req, file, cb) {
//   // Ajouter SVG aux types de fichiers acceptés
//   const filetypes = /jpe?g|png|webp|svg/
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp|image\/svg\+xml/

//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = mimetypes.test(file.mimetype)

//   if (extname && mimetype) {
//     cb(null, true)
//   } else {
//     cb(new Error("Ce fichier n'est pas valide ! "), false)
//   }
// }

// const upload = multer({ storage, fileFilter })
// const uploadMultipleImages = upload.array('images', 10)

// router.post('/', (req, res) => {
//   uploadMultipleImages(req, res, function (err) {
//     if (err) {
//       return res.status(400).send({ message: err.message })
//     }

//     // Array contenant les chemins des fichiers téléchargés
//     const paths = req.files.map((file) => `/${file.path}`)

//     res.status(200).send({
//       message: 'Images téléchargées avec succès',
//       images: paths,
//     })
//   })
// })

// export default router
import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

// Configuration de multer pour le stockage des fichiers
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

// Filtrage des types de fichiers pour les images
function imageFileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp|svg/
  const mimetypes = /image\/jpe?g|image\/png|image\/webp|image\/svg\+xml/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = mimetypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error("Ce fichier n'est pas valide pour les images !"), false)
  }
}

// Filtrage des types de fichiers pour les documents (PDF, Word, Excel, PowerPoint, Archives)
function documentFileFilter(req, file, cb) {
  const filetypes = /pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar/
  const mimetypes = /application\/pdf|application\/vnd\.ms\-word|application\/vnd\.openxmlformats\-officedocument\.wordprocessingml\.document|application\/vnd\.ms\-excel|application\/vnd\.openxmlformats\-officedocument\.spreadsheetml\.sheet|application\/vnd\.ms\-powerpoint|application\/vnd\.openxmlformats\-officedocument\.presentationml\.presentation|application\/zip|application\/x\-rar\-compressed/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = mimetypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error("Ce fichier n'est pas valide pour les documents !"), false)
  }
}

// Initialisation des uploaders pour les images et les documents
const imageUpload = multer({ storage, fileFilter: imageFileFilter })
const documentUpload = multer({ storage, fileFilter: documentFileFilter })

// Route pour télécharger des images
router.post('/', (req, res) => {
  const uploadMultipleImages = imageUpload.array('images', 10)

  uploadMultipleImages(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message })
    }

    const paths = req.files.map((file) => `/${file.path}`)
    res.status(200).send({
      message: 'Images téléchargées avec succès',
      images: paths,
    })
  })
})

// Route pour télécharger des documents (PDF, Word, Excel, PowerPoint, Archives)
router.post('/documents', (req, res) => {
  const uploadMultipleDocuments = documentUpload.array('documents', 10)

  uploadMultipleDocuments(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message })
    }

    const paths = req.files.map((file) => `/${file.path}`)
    res.status(200).send({
      message: 'Documents téléchargés avec succès',
      documents: paths,
    })
  })
})

export default router
