import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import API from '../components/Api';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import Amount from '../components/Amount';
import { useCartContext } from '../context/cartContext2';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImg, setMainImg] = useState('');
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);

  const setDecrement = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const setIncrement = () => {
    amount < product?.quantity
      ? setAmount(amount + 1)
      : setAmount(product?.quantity);
  };

  const [product, setProduct] = useState({});

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/get-single/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleOrderNow = async () => {
  //   setCart([...cart, orderedProduct]);
  //   localStorage.setItem('cart', JSON.stringify([...cart, orderedProduct]));
  //   navigate('/cart', {
  //     state: orderedProduct,
  //   });
  // };
  // const handleAddToCart = async () => {
  //   setCart([...cart, orderedProduct]);
  //   localStorage.setItem('cart', JSON.stringify([...cart, orderedProduct]));
  //   toast.success('Item Added to cart');
  // };

  //initial details

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //initial main ing
  useEffect(() => {
    if (product.images) {
      setMainImg(product?.images[0].url);
    }
  }, [product]);

  return (
    <Wrapper className=' mt-1 mt-md-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 image'>
            <div className='main-img-container'>
              <img src={mainImg} alt='main-img' className='main-img shadow' />
            </div>
            <div className='all-img-container'>
              {product?.images?.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  className='all-img shadow'
                  alt={product.name}
                  onClick={() => setMainImg(img.url)}
                />
              ))}
            </div>
          </div>
          <div className='col-md-6 product-info'>
            <h3 className='title'> {product.name}</h3>
            <div className='price-section d-flex flex-column'>
              <h6 className='d-flex text-primary'>
                Deal Of The Day :
                <span className='price mx-1 '>
                  {product?.price?.toLocaleString('bn-bd', {
                    style: 'currency',
                    currency: 'BDT',
                  })}
                </span>
              </h6>
              <h6 className='d-flex text-muted'>
                MRP :
                <del className='regular-price mx-1'>
                  (
                  {(product?.price + 110)?.toLocaleString('bn-bd', {
                    style: 'currency',
                    currency: 'BDT',
                  })}
                  )
                </del>
              </h6>
            </div>
            <hr />
            <p className='text-muted'>{product.description}</p>
            <h6 className='category'>
              Category : <span>{product?.category?.name}</span>
            </h6>
            <h6 className='color'>
              Color : <span>{product?.color}</span>
            </h6>
            <Amount
              amount={amount}
              setDecrement={setDecrement}
              setIncrement={setIncrement}
            />
            <hr />
            <div className='button-group d-flex justify-content-between'>
              <button
                className='btn btn-primary'
                style={{ fontSize: '14px', width: '45%' }}
                onClick={() => {
                  addToCart({ id: product._id, amount, product });
                  navigate('/cart');
                }}
              >
                ORDER NOW
              </button>

              <button
                className='btn btn-danger '
                style={{ fontSize: '14px', width: '45%' }}
                onClick={() => addToCart({ id: product._id, amount, product })}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        <hr />
        <div className='similar-products'>
          <div>
            <h4>Similar Products ➡️</h4>
            {relatedProducts.length < 1 && (
              <p className='text-center'>No Similar Products found</p>
            )}
          </div>

          <div className='row'>
            {relatedProducts?.map((p) => (
              <div key={p._id} className='col-6 col-md-3'>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .image {
    padding: 10px;
    .main-img-container {
      margin: auto;
      max-width: 600px;
      height: 300px;
      margin: 10px;
      .main-img {
        width: 100%;
        height: 300px;
        border-radius: 5px;
      }
    }
    .all-img-container {
      max-width: 600px;
      margin: 0 10px;
      .all-img {
        margin-right: 10px;
        width: 80px;
        height: 80px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.4s linear;
        &:hover {
          box-shadow: 0 0 15px -5px #444 !important;
        }
      }
    }
  }
  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-weight: 400;
      font-size: 30px;
      color: #444;
      text-transform: capitalize;
    }
    .price-section {
      .price {
        font-size: 17px;
        font-weight: 500;
        color: #ff2e2e;
      }
      .regular-price {
        font-size: 15px;
        font-weight: 400;
        color: #666;
      }
    }
    .category {
      text-transform: capitalize;
    }
  }
`;
export default ProductDetails;
