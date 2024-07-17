import React from 'react'
import Rating from './Rating'

const Card = ({product}) => {
    console.log(product);
  return (
    <article className="bg-white  rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mb-4">
         {product.description}
        </p>
        <Rating value={product.rating} text={"test"}/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
          Read More
        </button>
      </div>
    </article>
  )
}

export default Card
