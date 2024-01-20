import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API from '../../components/Api';
import { Modal } from 'antd';
import UpdateProduct from './UpdateProduct';
import AdminMenu from '../../components/AdminMenu';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [auth, setAuth] = useAuth();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/product/get-all`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Someething Went Wrong');
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  const handleClick = (slug) => {
    setVisible(true);
    setSelected(slug);
  };
  //delete a product
  const handleDelete = async (pId) => {
    try {
      let answer = window.prompt(
        'If You want to delete this product, Write "yes".'
      );
      if (!answer) return;
      const { data } = await axios.delete(`${API}/api/product/delete/${pId}`);
      if (data?.success) {
        toast.success('Product Deleted Successfully');
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  return (
    <div className='container-fluid p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products List</h1>
          <div className='row'>
            {products?.map((p) => (
              <div key={p._id} className='col-6 col-md-4'>
                <div className='card m-2'>
                  <img
                    src={p.images[0].url}
                    className='card-img-top'
                    style={{ height: '150px' }}
                    alt={p.name}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{p.name}</h5>
                    <p className='card-text'>
                      {p.description.substring(0, 30)}...
                    </p>
                    <p>
                      Price:{' '}
                      <span>
                        {p.price.toLocaleString('bn-bd', {
                          style: 'currency',
                          currency: 'BDT',
                        })}
                      </span>
                    </p>

                    <div className='d-flex flex-column flex-md-row justify-content-between'>
                      <NavLink
                        to={`/product-details/${p.slug}`}
                        className='btn btn-outline-secondary my-1'
                      >
                        More Option
                      </NavLink>
                      <div className='my-1 d-flex justify-content-between'>
                        <button
                          className='btn btn-outline-primary mx-1'
                          onClick={() => handleClick(p.slug)}
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-outline-danger mx-1'
                          onClick={() => {
                            handleDelete(p._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
            width={700}
          >
            <UpdateProduct
              selected={selected}
              setVisible={setVisible}
              getAllProducts={getAllProducts}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Products;
