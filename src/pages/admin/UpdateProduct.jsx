import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import API from '../../components/Api';

const UpdateProduct = ({ selected, setVisible, getAllProducts }) => {
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    shipping: '',
    color: '',
    photo: '',
    photo2: '',
  });

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/get-single/${selected}`
      );
      setProduct({
        ...product,
        id: data.product._id,
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        category: data.product.category._id,
        quantity: data.product.quantity,
        shipping: data.product.shipping,
        color: data.product.color,
        photo: '',
        photo2: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (e) => {
    setProduct({ ...product, photo: e.target.files[0] });
  };
  const handleImage2 = (e) => {
    setProduct({ ...product, photo2: e.target.files[0] });
  };
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/category/get-all`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting category');
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
    //eslint-disable-next-line
  }, [selected]);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', product.name);
      productData.append('description', product.description);
      productData.append('price', product.price);
      productData.append('quantity', product.quantity);
      productData.append('shipping', product.shipping);
      productData.append('color', product.color);
      productData.append('category', product.category);
      if (product.photo) {
        productData.append('image', product.photo);
      }
      if (product.photo2) {
        productData.append('image', product.photo2);
      }
      const { data } = await axios.put(
        `${API}/api/product/update/${product.id}`,
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success(data.message);
        setVisible(false);
        getAllProducts();
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='container p-3'>
      <div className='row'>
        <h2 className='text-center'>Product Update Form</h2>
        <form onSubmit={handleUpdate}>
          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>
              Select category :
            </label>
            <select
              type='text'
              name='category'
              value={product.category}
              onChange={onChange}
              className='form-select'
            >
              <option value=''>Select a Category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-3 row'>
            <div className='col-12 col-md-6'>
              <label className='btn btn-outline-secondary w-100'>
                {product.photo ? product.photo.name : 'Upload Photo 1'}
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={handleImage}
                  hidden
                />
              </label>
              {product.photo && (
                <div className='text-center col-md-6'>
                  <img
                    src={URL.createObjectURL(product.photo)}
                    alt='product_photo'
                    height={'120px'}
                    className='img img-responsive my-3'
                    style={{ borderRadius: '5px' }}
                  />
                </div>
              )}
            </div>
            <div className='col-12 col-md-6'>
              <label className='btn btn-outline-secondary w-100'>
                {product.photo2 ? product.photo2.name : 'Upload Photo 2'}
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={handleImage2}
                  hidden
                />
              </label>
              {product.photo2 && (
                <div className='text-center col-md-6'>
                  <img
                    src={URL.createObjectURL(product.photo2)}
                    alt='product_photo2'
                    height={'120px'}
                    className='img img-responsive my-3'
                    style={{ borderRadius: '5px' }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Write Product Name :
            </label>
            <input
              type='text'
              name='name'
              value={product.name}
              placeholder='write a name'
              className='form-control'
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              write a Description :
            </label>
            <textarea
              type='text'
              name='description'
              value={product.description}
              placeholder='write a description'
              className='form-control'
              onChange={onChange}
            />
          </div>
          <div className='row mb-3'>
            <div className='col-12 col-md-3'>
              <label htmlFor='price' className='form-label'>
                Price :
              </label>

              <input
                type='number'
                name='price'
                value={product.price}
                placeholder={`Product's Price`}
                className='form-control'
                onChange={onChange}
              />
            </div>
            <div className='col-12 col-md-3'>
              <label htmlFor='quantity' className='form-label'>
                Quantity :
              </label>

              <input
                type='number'
                name='quantity'
                value={product.quantity}
                placeholder={`Product's Quantity`}
                className='form-control'
                onChange={onChange}
              />
            </div>
            <div className='col-12 col-md-3'>
              <label htmlFor='shipping' className='form-label'>
                Shipping :
              </label>
              <input
                type='number'
                name='shipping'
                value={product.shipping}
                placeholder='Shipping Coast'
                className='form-control'
                onChange={onChange}
              />
            </div>
            <div className='col-12 col-md-3'>
              <label htmlFor='color' className='form-label'>
                Color :
              </label>
              <input
                type='text'
                name='color'
                value={product.color}
                placeholder='Color'
                className='form-control'
                onChange={onChange}
              />
            </div>
          </div>
          <div className='mb-3'>
            <button className='btn btn-primary' type='submit'>
              UPDATE PRODUCT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
