import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
// import { useCartContext } from '../context/cartContext2';

const PaymentSuccess = () => {
  const trx_id = useParams();
  const navigate = useNavigate();
  // const { clearCart } = useCartContext();

  if (trx_id) {
    // clearCart();
    navigate('/dashboard/user/orders');
    toast.success('Payment Completed Successfully');
  }
  return;
};

export default PaymentSuccess;
