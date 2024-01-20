import { NavLink } from 'react-router-dom';
import API from '../components/Api';
import { useSearch } from '../context/searchContext';
import ProductCard from '../components/ProductCard';

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <div className='container'>
      <div className='text-center'>
        <h1>Search Results</h1>
        <h6>
          {values?.results.length < 1
            ? 'No Products Found'
            : `Found ${values?.results.length} items`}
        </h6>
        <div className='d-flex flex-wrap mt-4'>
          {values?.results.map((p, i) => (
            <div key={i} className='col-6 col-md-4 col-lg-3'>
              <ProductCard p={p} />
            </div>

            // <div key={p._id} className='col col-md-4'>
            //   <div className='card m-2'>
            //     <img
            //       src={`${API}/api/product/product-photo/${p._id}`}
            //       className='card-img-top'
            //       style={{ height: '150px' }}
            //       alt={p.name}
            //     />
            //     <div className='card-body'>
            //       <h5 className='card-title'>{p.name}</h5>
            //       <p className='card-text'>
            //         {p.description.substring(0, 30)}...
            //       </p>
            //       <p>Price: ${p.price}</p>
            //       <div className='group-btn '>
            //         <div className='user-btn d-flex mt-2 justify-content-between'>
            //           <NavLink
            //             to={'/singleProduct'}
            //             className='btn btn-dark w-50'
            //           >
            //             More Option
            //           </NavLink>
            //           <button class='btn btn-secondary w-50'>
            //             ADD TO CART
            //           </button>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
