import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation
} from '../../slices/orderApiSlice'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Messages from '../FeedbackScreens/Messages'
import Loader from '../FeedbackScreens/Loader'
import { useSelector } from 'react-redux'
import Button from '../../components/shared/Button'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'

const OrderDetailsScreen = () => {
  const { id: orderId } = useParams()
  const {
    data: orderDetails,
    error: orderDetailsError,
    isLoading: loadingOrderDetails,
    refetch,
  } = useGetOrderDetailsQuery(orderId)

  console.log(orderDetails);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypal.clientId,
            currency: 'EUR',
          },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      if (orderDetails && !orderDetails.isPaid) {
        if (!window.paypal) {
          loadPayPalScript()
        }
      }
    }
  }, [orderDetails, paypal, paypalDispatch, loadingPayPal, errorPayPal])

  async function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success('paimnent effectué avec succès')
      } catch (err) {
        toast.error(err?.data?.message.err.message)
      }
    })
  }

  async function onApproveTest() {
    await payOrder({
      orderId,
      details: { payer: {} },
    })
    refetch()
    toast.success('Paiement effectué avec succès')
  }

  function onError(err) {
    toast.error(err.message)
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderDetails.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId
      })
  }

  const deliveredHandler = async () => {
    try {
      await deliverOrder({ orderId })
      refetch()
      toast.success('Commande livrée.')
    } catch (err) {
      toast.error(err?.data?.message.err.message || err.message)
    }
  }

  if (loadingOrderDetails) {
    return <Loader />
  }

  if (orderDetailsError) {
    return (
      <Messages type={'danger'} message="Impossible de trouver la commande" />
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-primaryColor font-bold mb-4">
        Commande n°: {orderDetails._id}
      </h1>
      {orderDetails && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Date:{' '}
              <span className="font-normal">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </span>
            </p>
            <p className="text-lg font-semibold">
              Article:{' '}
              <span className="font-normal">{orderDetails.itemsPrice} XPF</span>
            </p>
            <p className="text-lg font-semibold">
              Taxe:{' '}
              <span className="font-normal">{orderDetails.taxPrice} XPF</span>
            </p>
            <p className="text-lg font-semibold">
              Livraison:{' '}
              <span className="font-normal">
                {orderDetails.shippingPrice} XPF
              </span>
            </p>
            <p className="text-lg font-semibold">
              Total:{' '}
              <span className="font-normal">{orderDetails.totalPrice} XPF</span>
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">Articles:</h2>
            <ul className="list-disc list-inside">
              {orderDetails.orderItems.map((item) => (
                <li key={item._id} className="flex items-center mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm">
                      {item.qty} x {item.price} Xpf = {item.qty * item.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">Adresse de livraison:</h2>
            <p>
              {orderDetails.user.name} {orderDetails.user.lastname}
            </p>
            <p className="text-lg">
              {orderDetails.shippingAddress.address},{' '}
              {orderDetails.shippingAddress.city}
            </p>
            <p className="text-lg">
              {orderDetails.shippingAddress.postalCode},{' '}
              {orderDetails.shippingAddress.country}
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">Méthode de paiement:</h2>
            <p className="text-lg">{orderDetails.paymentMethod}</p>
            <Messages
              type={orderDetails.isPaid ? 'success' : 'danger'}
              message={
                orderDetails.isPaid
                  ? `payée le ${new Date(
                      orderDetails.paidAt,
                    ).toLocaleDateString()}`
                  : 'Non payée'
              }
            />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">Livraison</h2>
            <Messages
              type={orderDetails.isDelivered ? 'success' : 'danger'}
              message={orderDetails.isDelivered ? 'Livrée' : 'Non livrée'}
            />
          </div>
        </div>
      )}
      {!orderDetails.isPaid && (
        <>
          {loadingPay && <Loader />}
          {isPending ? (
            <Loader />
          ) : (
            <div className="mt-6">
              <Button onClick={onApproveTest} version={'primary'}>
                Tester le paiement
              </Button>
              <div className="mt-7">
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              </div>
            </div>
          )}
        </>
      )}

      {
        userInfo && userInfo.isAdmin && (
    <Link to={"/admin-administration-du-site"}>Reour a l'administration</Link>
        )
      }

     
      {userInfo && userInfo.isAdmin  && orderDetails.isPaid && !orderDetails.isDelivered && (
        <div className="mt-6">
          <Button onClick={deliveredHandler} version={'primary'}>
          {loadingDeliver ? ( <Loader2/>) : ('Marqué comme livrée')}  
          </Button>
        </div>
      )}
    </div>
  )
}

export default OrderDetailsScreen
