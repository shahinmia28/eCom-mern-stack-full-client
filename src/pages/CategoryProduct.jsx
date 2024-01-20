import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import API from '../components/Api';
import Categories from './Categories';
import ProductCard from '../components/ProductCard';

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  return (
    <div>
      <div className='container '>
        <Categories />
        <div className='text-center'>
          <h4>Category - {category?.name}</h4>
          <h6>{products?.length} result found </h6>
        </div>

        <div className='row'>
          {products?.map((p) => (
            <div key={p._id} className='col-6 col-md-3'>
              <ProductCard p={p} />
            </div>
          ))}
        </div>
        {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
      </div>
    </div>
  );
};

export default CategoryProduct;
