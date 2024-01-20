import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/authContext';
import { TbShoppingCart } from 'react-icons/tb';
import { BsPerson } from 'react-icons/bs';
import { useCartContext } from '../context/cartContext2';

const Header = () => {
  const [auth] = useAuth();
  const { cart } = useCartContext();

  let total_item = 0;

  cart.map((item) => {
    total_item = total_item + item.amount;
  });

  return (
    <Wrapper>
      <nav className='navbar navbar-expand navbar-light bg-light'>
        <div className='container'>
          <Link to={'/'} className='navbar-brand'>
            <img
              src='https://res.cloudinary.com/dopxkndjf/image/upload/v1705681347/hmcuvsjtjxxh2zntmrvm.png'
              alt='logo'
            />
          </Link>
          <ul className='navbar-nav ms-auto'>
            {!auth.user ? (
              <>
                <li className='nav-item'>
                  <NavLink to={'/login'} className='nav-link'>
                    <BsPerson className='icon' />
                    Login
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to={'/register'} className='nav-link'>
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? 'admin/profile' : 'user/profile'
                    }`}
                    className='nav-link'
                  >
                    <BsPerson className='icon' />
                    <span>{auth?.user?.role === 1 ? 'Admin' : 'Account'}</span>
                  </NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? 'admin/orders' : 'user/orders'
                    }`}
                    className='nav-link'
                  >
                    Orders
                  </NavLink>
                </li>
              </>
            )}
            <li className='nav-item'>
              <NavLink to='/cart' className='nav-link'>
                <div className='cart-btn'>
                  <TbShoppingCart className='cart-icon' />
                  <span className='cart-total'>{total_item}</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .navbar {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    padding: 12px;
    text-transform: uppercase;
    box-shadow: 0 8px 6px -6px #717171;
    .navbar-brand {
      margin: 0;
      padding: 0;
      img {
        margin: 0;
        padding: 0;
        width: 150px;

        /* Small Screen  */
        @media (max-width: 768px) {
          width: 100px;
        }
      }
    }
    .navbar-nav {
      .nav-item {
        margin: auto 5px;
        .nav-link {
          font-weight: 500;
          font-size: 16px;
          margin: auto;
          border-radius: 20px;
          padding: 3px 10px;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            background: #efe6e6;
          }
          .icon {
            font-size: 18px;
            margin-right: 3px;
            stroke-width: 0.25;
          }

          .cart-btn {
            position: relative;
            .cart-icon {
              font-size: 25px;
            }
            .cart-total {
              font-size: 12px;
              background: #ff1212;
              padding: 0px 5px;
              font-weight: 600;
              color: #fff;
              border-radius: 50%;
              position: absolute;
              top: -11px;
              right: -11px;
            }
          }
          @media (max-width: 768px) {
            font-size: 14px;
            .icon {
              font-size: 15px;
              margin-right: 2px;
            }

            .cart-btn {
              .cart-icon {
                font-size: 20px;
              }
              .cart-total {
                font-size: 9px;
                top: -8px;
                right: -8px;
              }
            }
          }
        }
      }
      .active {
        background: #efe6e6;
      }
    }
  }
`;
export default Header;
