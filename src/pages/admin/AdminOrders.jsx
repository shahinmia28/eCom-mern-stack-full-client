import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import moment from 'moment';
import { Select } from 'antd';
import API from '../../components/Api';
import styled from 'styled-components';
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    'Not Process',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancel',
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/api/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`${API}/api/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper className='admin-orders'>
      <div className='container'>
        {orders?.map((o, i) => {
          return (
            <div
              key={i}
              className='border shadow my-4 p-3'
              style={{ borderRadius: '5px' }}
            >
              <div className='container'>
                <div className='row'>
                  <div className='col-12 col-lg-4'>
                    <div className='mb-3'>
                      <div className='my-2 text-center border'>
                        <h5>Order Details</h5>
                      </div>
                      <div className='d-flex my-2  align-items-center justify-content-start border'>
                        <span className='p-2 fw-bold'>Status:</span>
                        <span className='p-2 text-capitalize fw-bold'>
                          {' '}
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </span>
                      </div>
                      <div className='d-flex my-2  align-items-center justify-content-start border'>
                        <span className='p-2 fw-bold'>Order Date :</span>
                        <span className='p-2'>
                          <span>{moment(o?.createdAt).fromNow()} </span>
                          {' / '}
                          <span className='fw-bold text-primary fst-italic'>
                            {o?.createdAt.slice(0, 10)}
                          </span>
                        </span>
                      </div>
                      <div className='d-flex my-2  align-items-center justify-content-start border'>
                        <span className='p-2 fw-bold'>Total Price:</span>
                        <span className='price text-danger fw-bold'>
                          {o?.totalPrice?.toLocaleString('bn-bd', {
                            style: 'currency',
                            currency: 'BDT',
                          })}
                          .00৳
                        </span>
                      </div>
                      <div className='d-flex my-2  align-items-center justify-content-start border'>
                        <span className='p-2 fw-bold'>Payment:</span>
                        <span className='p-2'>
                          {o?.payment ? (
                            <>
                              <span style={{ fontSize: '12px' }}>SUCCESS</span>
                              <br />
                              <span style={{ fontSize: '12px' }}>
                                TRX_ID: {o?.transaction_id}
                              </span>
                            </>
                          ) : (
                            'Cash On Delivery'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-lg-5'>
                    {o?.products?.map((p, i) => (
                      <div className='card my-2' key={i}>
                        <div className='row'>
                          <div className='col-md-3'>
                            <img
                              src={p?.product?.images[0]?.url}
                              alt={p?.product.name}
                              width='100px'
                              height='100px'
                              className='m-1 border'
                            />
                          </div>
                          <div className='col-md-9'>
                            <div className='card-body'>
                              <h6 className='text-capitalize'>
                                {p.product.name}
                              </h6>
                              {/* <p>{p.product.description.substring(0, 30)}...</p> */}
                              <div className='py-2 d-flex justify-content-between align-items-center fw-bold text-capitalize'>
                                <span className='price text-danger'>
                                  {p.product.price.toLocaleString('bn-bd', {
                                    style: 'currency',
                                    currency: 'BDT',
                                  })}
                                </span>
                                <span>color: {p.product.color}</span>
                                <span>QTY: {p.amount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='col-12 col-lg-3'>
                    <div className='my-2  text-center border'>
                      <h5>Buyer Details</h5>
                    </div>
                    <div className='d-flex my-2  align-items-center justify-content-start border'>
                      <span className='p-2 fw-bold'>Name :</span>
                      <span className='p-2 text-capitalize'>
                        {o?.buyer?.name}
                      </span>
                    </div>
                    <div className='d-flex my-2  align-items-center justify-content-start border'>
                      <span className='p-2 fw-bold'>Email:</span>
                      <span className='p-2 '>{o?.buyer?.email}</span>
                    </div>
                    <div className='d-flex my-2  align-items-center justify-content-start border'>
                      <span className='p-2 fw-bold'>Phone:</span>
                      <span className='p-2 '>{o?.buyer?.phone}</span>
                    </div>
                    <div className='d-flex my-2  align-items-center justify-content-start border'>
                      <span className='p-2 fw-bold'>Address:</span>
                      <span className='p-2 '>{o?.buyer?.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;
export default AdminOrders;
