import { useAuth } from '../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../components/Api';
import toast from 'react-hot-toast';
import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Radio, Checkbox } from 'antd';
import { useCartContext } from '../context/cartContext2';
import Amount from '../components/Amount';

const CartPage2 = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const location = useLocation();
  const { cart, clearCart, shipping_fee, total_price } = useCartContext();
  const { setDecrement, setIncrement, removeItem } = useCartContext();

  // set payment method
  const onChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // selected Product for order
  const handleSelectProduct = (value, p) => {
    let all = [...selectedProduct];
    if (value) {
      all.push(p);
    } else {
      all = all.filter((c) => {
        return c !== p;
      });
    }
    setSelectedProduct(all);
  };

  // find selected product for price calculate
  let selectedProductForOrder = [];
  selectedProduct?.map((item) => {
    if (item) {
      cart.filter((p) => {
        if (p.id === item) {
          selectedProductForOrder.push(p);
        }
      });
    }
  });

  // total item selected
  let total_item_selected = 0;

  selectedProductForOrder.map((item) => {
    total_item_selected = total_item_selected + item.amount;
  });
  // total item
  let total_item = 0;
  cart.map((item) => {
    total_item = total_item + item.amount;
  });

  // sub total Price
  let subtotal = [];
  selectedProductForOrder.map((item) => {
    subtotal.push(item.product.price * item.amount);
  });
  // final Price calculate
  let finalPrice = 0;
  subtotal.map((item) => {
    finalPrice = finalPrice + item;
  });

  // shipping Fee
  let shippingFee = selectedProduct?.length < 1 ? 0 : shipping_fee;

  // total price
  let totalPrice = finalPrice + shippingFee;

  // handle check out
  const handleCheckOutWithPayment = async () => {
    try {
      const { data } = await axios.post(`${API}/api/product/order-checkout`, {
        product: selectedProductForOrder,
        user: auth.user,
        totalPrice: totalPrice,
      });
      if (data) {
        window.location.replace(data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle check out
  const handleCheckOutWithOutPayment = async () => {
    try {
      const { data } = await axios.post(
        `${API}/api/product/order-checkout-without-payment`,
        {
          product: selectedProductForOrder,
          user: auth.user,
          totalPrice: totalPrice,
        }
      );
      if (data?.success) {
        // clearCart();
        navigate('/dashboard/user/orders');
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(cart);
  return (
    <Wrapper>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='border card my-3 p-2'>
              {total_item ? (
                <span>
                  Total {total_item} item{total_item > 1 ? 's are ' : ' is '}
                  available in your cart | ({total_item_selected} item
                  {total_item_selected > 1 ? 's are ' : ' is '} selected)
                </span>
              ) : (
                <span>Your Cart Is Empty</span>
              )}
            </div>
            {cart
              ?.map((item, i) => {
                return (
                  <Checkbox
                    key={i}
                    onChange={(e) =>
                      handleSelectProduct(e.target.checked, item.id)
                    }
                    className='check-box border my-2'
                    id={item?._id}
                  >
                    <div className='row'>
                      <div className='col-2 m-auto'>
                        <img
                          src={item?.product?.images[0].url}
                          width='100px'
                          height='100px'
                          alt={item?.product?.name}
                          className='border image'
                        />
                      </div>
                      <div className='col-10 m-auto'>
                        <div className='card-body p-1'>
                          <div className='d-flex text-capitalize align-items-center justify-content-between'>
                            <h5 className='text-capitalize'>
                              {item?.product?.name}
                            </h5>
                            <span className='fw-bold'>
                              color: {item?.product?.color}
                            </span>
                          </div>

                          <div className='d-flex text-capitalize align-items-center justify-content-between'>
                            <span className='price text-danger fw-bold '>
                              {(
                                item?.product?.price * item?.amount
                              ).toLocaleString('bn-bd', {
                                style: 'currency',
                                currency: 'BDT',
                              })}
                            </span>

                            <Amount
                              amount={item?.amount}
                              setDecrement={() => setDecrement(item?.id)}
                              setIncrement={() => setIncrement(item?.id)}
                            />
                            <button
                              className='btn btn-outline-danger'
                              onClick={() => removeItem(item?.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Checkbox>
                );
              })
              .reverse()}
          </div>
          <div className='col-md-4 '>
            <div className='card p-3 my-3'>
              <h5>Order Summary</h5>
              <hr />
              <div>
                <p className='d-flex justify-content-between'>
                  <span>
                    Subtotal
                    <span className='fw-bold'>
                      ({total_item_selected} item
                      {total_item_selected > 1 && 's'})
                    </span>
                  </span>
                  <span>
                    {finalPrice.toLocaleString('bn-bd', {
                      style: 'currency',
                      currency: 'BDT',
                    })}
                  </span>
                </p>
                <p className='d-flex justify-content-between'>
                  <span>Shipping Fee </span>{' '}
                  <span>
                    {shippingFee.toLocaleString('bn-bd', {
                      style: 'currency',
                      currency: 'BDT',
                    })}
                  </span>
                </p>
                <hr />
                <p className='d-flex justify-content-between'>
                  <span className='fw-bold'>Total Price</span>
                  <span className='fw-bold'>
                    {totalPrice.toLocaleString('bn-bd', {
                      style: 'currency',
                      currency: 'BDT',
                    })}
                  </span>
                </p>
              </div>
              <hr />
              <div className='payment-option'>
                <Radio.Group
                  onChange={onChange}
                  value={paymentMethod}
                  className='d-flex flex-column justify-content-between align-items-start'
                >
                  <Radio value={0} className='my-2'>
                    Cash On Delivery
                  </Radio>
                  <Radio value={1}>Payment Online</Radio>
                </Radio.Group>
              </div>
              {auth?.user?.address ? (
                <div className='mt-3'>
                  <div className='checkOut d-flex justify-content-between'>
                    <div className='button-to-order m-auto'>
                      <button
                        className='btn btn-primary text-uppercase'
                        onClick={() =>
                          paymentMethod === 0
                            ? handleCheckOutWithOutPayment()
                            : handleCheckOutWithPayment()
                        }
                        disabled={
                          !auth?.user?.address ||
                          selectedProductForOrder?.length < 1
                        }
                      >
                        Place Order
                      </button>
                    </div>
                  </div>

                  <span className='text-center mt-3  d-block text-danger'>
                    {selectedProductForOrder?.length === 0 &&
                      'Select product to order'}
                  </span>
                </div>
              ) : (
                <div className='my-3'>
                  {auth?.token ? (
                    <button
                      className='btn btn-warning'
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className='btn btn-warning'
                      onClick={() =>
                        navigate('/login', {
                          state: '/cart',
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className='my-3'>
                <div className='delivered-to '>
                  <span className='fw-bold'>Delivered To: </span>
                  <div className='text-muted d-flex flex-column'>
                    <span>
                      {auth?.user?.name} | {auth?.user?.phone}
                    </span>
                    <span>{auth?.user?.address}</span>
                    <span
                      onClick={() => navigate('/dashboard/user/profile')}
                      style={{ cursor: 'pointer' }}
                      className='link-danger'
                    >
                      Change
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .ant-checkbox-wrapper {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 15px -10px #555;
    transition: all 0.4s linear;
    &:hover {
      box-shadow: 0 0 15px -5px #555;
    }
    .ant-checkbox + span {
      width: 100%;
      .image {
        /* Small Screen */
        @media (max-width: 992px) {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
`;
export default CartPage2;
