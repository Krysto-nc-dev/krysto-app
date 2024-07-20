import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './_data/users.js'
import products from './_data/products.js'
import plasticTypes from './_data/plastic_types.js'
import plasticColors from './_data/plastic_colors.js'
import recyclableProducts from './_data/recyclable_products.js'
import projects from './_data/projects.js'
import emails from './_data/emails.js'

// Import des models
import Order from './models/orderModel.js'
import RecyclableProduct from './models/recyclableProductModel.js' // Correction ici
import Project from './models/ProjectModel.js' // Correction ici
import Product from './models/productModel.js'
import PlasticTypes from './models/plasticTypeModel.js'
import PlasticColors from './models/plasticColorModel.js'
import User from './models/userModel.js'
import EmailBank from './models/EmailBankModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    // await Product.deleteMany()
    // await User.deleteMany()

    // await PlasticTypes.deleteMany()
    await EmailBank.deleteMany()
    // const createdUsers = await User.insertMany(users)
    // const adminUser = createdUsers[0]._id
    // const sampleProducts = products.map((product) => ({
    //   ...product,
    //   user: adminUser,
    // }))
    // await Product.insertMany(sampleProducts)
    // await PlasticTypes.insertMany(plasticTypes)
    await EmailBank.insertMany(emails)
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // await Product.deleteMany()
    // await Order.deleteMany()
    // await User.deleteMany()
    // await PlasticType.deleteMany()
    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
