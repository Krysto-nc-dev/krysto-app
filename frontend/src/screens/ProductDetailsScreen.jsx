import { useParams } from "react-router-dom"

const ProductDetailsScreen = () => {

  const {id: productId} = useParams()
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Product Details - {productId}
      </h1>
    </div>
  )
}

export default ProductDetailsScreen