import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/shared/Button'
import { Check, CheckCheck, Info, Loader, X } from 'lucide-react'
import { useProfileMutation } from '../../slices/userApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'
import { useGetMyOrdersQuery } from '../../slices/orderApiSlice'
import Card from '../../components/shared/Card'
import Messages from '../FeedbackScreens/Messages'
const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const {userInfo} = useSelector((state) => state.auth)
  
  
  useEffect(() => {
      if(userInfo) {
          setName(userInfo.name)
          setLastname(userInfo.lastname)
          setEmail(userInfo.email)
        }
    }, [userInfo , userInfo.name, userInfo.lastname, userInfo.email])
    
    const [updateProfile , {isLoading:loadingUpdateProfile}] = useProfileMutation()
    const {data:orders, isLoading: ordersLoading , error:ordersError} = useGetMyOrdersQuery()

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ name, lastname, email, password, confirmPassword }); // Vérifiez les valeurs des états
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
    } else {
      try {
        const res = await updateProfile({ 
          _id: userInfo._id, 
          name, 
          lastname, 
          email, 
          password 
        }).unwrap();
        console.log('Response:', res); // Vérifiez la réponse de l'API
        dispatch(setCredentials(res));
        toast.success('Profile mis à jour avec succès');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }
  
  return (  
  <>
  <h1 className=" text-gray-700 text-2xl">Mon profile</h1>
  <div>
    <form  onSubmit={submitHandler}>
      <div className='flex flex-col mb-6'>
        <label className='mb-1' htmlFor="name">Prénom</label>
        <input className='p-2 rounded-md' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='flex flex-col mb-6'>
        <label className='mb-1' htmlFor="lastname">Nom</label>
        <input className='p-2 rounded-md' type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      </div>
      <div className='flex flex-col mb-6'>
        <label className='mb-1' htmlFor="email">Email</label>
        <input className='p-2 rounded-md' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='flex flex-col mb-6'>
        <label className='mb-1' htmlFor="password">Mot de passe</label>
        <input className='p-2 rounded-md' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <small className='text-dangerColor mt-2 flex items-center gap-2' > <Info/>8 caractères minimum, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (!@#$%^&*)</small>
        <div className='flex flex-col mb-6'>
          <label className='mb-1' htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input className='p-2 rounded-md' type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <Button  type="submit">
            {loadingUpdateProfile ? <Loader/> : "Enregistrer"}
        </Button>
        
      </div>
      
    </form>
  </div>

  <div>
    <h2 className="text-gray-700 text-2xl mb-6">Mes commandes</h2>
    {ordersLoading? <Loader/> : ordersError? <p>{ordersError.message}</p> : orders?.length? orders.map(order => (
      <Card url={`/commande/${order._id}`} variant={'dark'} key={order._id} className="border-b p-4 mb-4">
        <p>Commande n°{order._id}</p>
        <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Montant total : {order.totalPrice} XPF</p>
        {order.isPaid ? (
            <>
           
            <p className='flex items-center gap-2'>  <CheckCheck className='text-green-400'/>  Payé le {new Date (order.paidAt).toLocaleDateString()}</p>
            </>
        ) : (
            <X className='text-red-400'/>
        )}
        {order.isDeliverd ? (
            <>
           
            <p className='flex items-center gap-2'>  <CheckCheck className='text-green-400'/>  Délivrer le {new Date (order.deliveredAt).toLocaleDateString()}</p>
            </>
        ) : (
            <p className='flex items-center gap-2'>   <X className='text-red-400'/>  Non livrée</p>
           
        )}
      </Card>
    )) : <Messages message={"Vous n'avez pas encore passé de commande."}/>}
  </div>
  </>
  
)
}

export default ProfileScreen
