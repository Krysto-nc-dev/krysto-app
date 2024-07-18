import { Link } from 'react-router-dom'
import Button from '../shared/Button'
import { Check, EuroIcon, LogInIcon, Plane } from 'lucide-react'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex items-center justify-center gap-5 mb-4">
      {step1 ? (
        <Button version={'primary'}  icon={LogInIcon} >

          <Link to={'/connexion'}>Connexion</Link>
        </Button>
      ) : (
        <Button isDisabled={true}>
          <p>Connexion</p>
        </Button>
      )}
      {step2 ? (
        <Button version={'primary'}  icon={Plane} >
          <Link to={'/adresse-de-livraison'}>Livraison</Link>
        </Button>
      ) : (
        <Button isDisabled={true}>
          <p>Livraison</p>
        </Button>
      )}
      {step3 ? (
        <Button version={'primary'}  icon={EuroIcon} >
          <Link to={'/paiment'}>Réglement</Link>
        </Button>
      ) : (
        <Button isDisabled={true}>
          <p>Réglement</p>
        </Button>
      )}
      {step4 ? (
        <Button version={'primary'} icon={Check} >
          <Link to={'/validation-commande'}>Validation</Link>
        </Button>
      ) : (
        <Button isDisabled={true}>
          <p>Validation</p>
        </Button>
      )}
     
    </nav>
  )
}

export default CheckoutSteps
