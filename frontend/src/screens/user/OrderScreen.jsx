import { useState } from "react"

const OrderScreen = () => {

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  return (
    <div>OrderScreen</div>
  )
}

export default OrderScreen