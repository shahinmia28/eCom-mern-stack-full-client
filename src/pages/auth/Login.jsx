import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import API from '../../components/Api';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/authContext';

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    email: '',
    address: '',
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${API}/api/auth/login`, {
        email: user.email,
        password: user.password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.userData,
          token: res.data.accessToken,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Something wants wrong');
      console.log(error);
    }
  };
  return (
    <Wrapper className='bg-d-color login'>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content='login form shahin Optical' />
        <meta
          name='keywords'
          content='ecommerce, sungalss, chosma, eye glass, shahin optical'
        />
        <meta name='author' content='shahin mia' />
        <title>Login form</title>
      </Helmet>
      <div className='container'>
        <div className='form-wrapper'>
          <form onSubmit={handleSubmit}>
            <h2 className='title'>Login Form</h2>
            <div className='mb-3 row'>
              <div className='col-12 my-2'>
                <input
                  type='email'
                  name='email'
                  value={user.email}
                  onChange={onChange}
                  className='form-control'
                  placeholder={`example@gmail.com *`}
                  required
                />
              </div>

              <div className='col-12 my-2'>
                <input
                  type='password'
                  name='password'
                  value={user.password}
                  onChange={onChange}
                  className='form-control'
                  placeholder='password *'
                  required
                />
              </div>

              <div className='col-12 my-2 text-center button-group'>
                <button type='submit' className='btn btn-dark'>
                  Login
                </button>
                <NavLink to={'/forget-password'}>Forget Password</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .container {
    .form-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 85vh;
      form {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        width: 40%;
        box-shadow: 0 0px 10px -2px #333;
        .title {
          color: #333;
          text-align: center;
          text-transform: uppercase;
          padding: 15px;
        }
        .form-control,
        .form-select,
        .btn {
          outline: none;
          border-bottom: 2px solid #666;
          padding: 8px;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          button {
            text-transform: uppercase;
            width: 100%;
          }
          a {
            padding-top: 10px;
          }
        }
        @media (max-width: 772px) {
          width: 85%;
        }
      }
    }
  }
`;
export default Login;
