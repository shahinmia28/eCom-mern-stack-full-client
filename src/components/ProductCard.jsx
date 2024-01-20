import API from './Api';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const ProductCard = ({ p }) => {
  return (
    <Wrapper>
      <NavLink to={`/product-details/${p.slug}`} className='navlink-cart'>
        <div className='card-my my-2'>
          <img
            src={p.images[0].url}
            className='card-img-top'
            style={{ height: '180px' }}
            alt={p.name}
          />
          <div className='text-body mt-1'>
            <p className='title'>{p.name.substring(0, 20)}...</p>

            <div className='price-section d-flex flex-column'>
              <span className='price '>
                {p.price.toLocaleString('bn-bd', {
                  style: 'currency',
                  currency: 'BDT',
                })}
              </span>
              <del className='regular-price '>
                (
                {(p.price + 110).toLocaleString('bn-bd', {
                  style: 'currency',
                  currency: 'BDT',
                })}
                )
              </del>
            </div>
          </div>
        </div>
      </NavLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .navlink-cart {
    text-decoration: none;
    color: inherit;
    .card-my {
      transition: all 0.4s linear;
      padding: 5px;
      border-radius: 5px;

      .card-img-top {
        border-radius: 5px;
        margin-bottom: 7px;
        box-shadow: 0 0 15px -8px #666;
      }
      .text-body {
        height: 130px;
        padding: 10px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: start;
        box-shadow: 0 0 15px -5px #666;

        .title {
          font-size: 16px;
          font-weight: 500;
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
      }
      &:hover {
        transform: scale(1.01);
        .card-img-top {
          box-shadow: 0 0 15px -3px #666;
        }
      }
    }
  }
`;
export default ProductCard;
