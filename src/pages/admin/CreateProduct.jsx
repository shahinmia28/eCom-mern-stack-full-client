import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import API from '../../components/Api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminMenu from '../../components/AdminMenu';

const CreateProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
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

  const [categories, setCategories] = useState([]);

  const handleImage = (e) => {
    setProduct({
      ...product,
      photo: e.target.files[0],
    });
  };
  const handleImage2 = (e) => {
    setProduct({
      ...product,
      photo2: e.target.files[0],
    });
  };
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/category/get-all`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something wwent wrong in getting catgeory');
    }
  };
  //create product function
  const handleCreate = async (e) => {
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
      const { data } = await axios.post(
        `${API}/api/product/create`,
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data?.success) {
        toast.success('Product Created Successfully');
        navigate('/dashboard/admin/all-products');
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Wrapper>
      <div className='container-fluid p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className='p-3 w-100 w-lg-75'>
              <h1 className='title'>Create Product</h1>
              <form onSubmit={handleCreate}>
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
                    required
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
                        required
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
                    required
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
                    required
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                  </div>
                </div>

                <div className='mb-3'>
                  <button className='btn btn-primary' type='submit'>
                    CREATE PRODUCT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .title {
    text-transform: uppercase;
    color: #333;
    text-align: center;
    padding: 15px;
  }
`;
export default CreateProduct;
