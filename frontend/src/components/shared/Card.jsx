import React from 'react'
import Rating from './Rating'

const Card = () => {
  return (
    <article className="bg-white  rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Card Title</h2>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          lacus non dui scelerisque, vel efficitur lacus congue. Donec vulputate
          lectus id eros placerat, ac ultricies purus fermentum. Nulla facilisi.
          Sed sagittis, nisi vel dictum dictum, neque velit ultrices erat, in
          pulvinar enim ipsum at neque.
        </p>
        <Rating value={1.5} text={"test"}/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
          Read More
        </button>
      </div>
    </article>
  )
}

export default Card
