import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text }) => {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star, index) => {
        // Vérifiez si la valeur actuelle doit afficher une étoile pleine, moitié ou vide
        const isFullStar = value >= star;
        const isHalfStar = value >= star - 0.5 && value < star;

        return (
          <span key={index}>
            {isFullStar ? (
              <FaStar className='text-yellow-500' />
            ) : isHalfStar ? (
              <FaStarHalfAlt className='text-yellow-500' />
            ) : (
              <FaRegStar className='text-yellow-500' />
            )}
          </span>
        )
      })}
      {text && <span className='ml-2 text-gray-700'>{text}</span>}
    </div>
  )
}

export default Rating
