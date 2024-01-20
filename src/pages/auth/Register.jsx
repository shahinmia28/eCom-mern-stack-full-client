import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import API from '../../components/Api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    answer: '',
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${API}/api/auth/register`, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: user.password,
        answer: user.answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error('Something wants wrong');
      console.log(error);
    }
  };
  return (
    <Wrapper className='bg-d-color register'>
      <Helmet>
        <meta charSet='UTF-8' />
        <meta name='description' content='registration form shahin Optical' />
        <meta
          name='keywords'
          content='ecommerce, sungalss, chosma, eye glass, shahin optical'
        />
        <meta name='author' content='shahin mia' />
        <title>Registration form</title>
      </Helmet>
      <div className='container'>
        <div className='form-wrapper'>
          <form onSubmit={handleSubmit}>
            <h2 className='title'>Registration Form </h2>
            <div className='mb-3 row'>
              <div className='col-12 my-2'>
                <input
                  type='text'
                  name='name'
                  value={user.name}
                  onChange={onChange}
                  className='form-control'
                  placeholder='Full Name *'
                  required
                />
              </div>
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
                  type='number'
                  name='phone'
                  value={user.phone}
                  onChange={onChange}
                  className='form-control'
                  placeholder={`Phone Number *`}
                  required
                />
              </div>
              <div className='col-12 my-2'>
                <input
                  type='text'
                  name='address'
                  value={user.address}
                  onChange={onChange}
                  className='form-control'
                  placeholder='Address *'
                  required
                />
              </div>
              <div className='col-12 my-2'>
                <input
                  type='text'
                  name='answer'
                  value={user.answer}
                  onChange={onChange}
                  className='form-control'
                  placeholder='What is your favorite sport? *'
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

              <div className='col-12 my-2'>
                <button type='submit' className='btn btn-dark'>
                  Register
                </button>
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
      min-height: 100vh;
      form {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        width: 40%;
        box-shadow: 0 0px 10px -2px #333;
        .title {
          text-transform: uppercase;
          color: #333;
          text-align: center;
          padding: 15px;
        }
        .form-control,
        .form-select,
        .btn {
          outline: none;
          border-bottom: 2px solid #666;
          padding: 8px;
        }
        button {
          text-transform: uppercase;
          width: 100%;
        }
        @media (max-width: 772px) {
          width: 85%;
        }
      }
    }
  }
`;
export default Register;
