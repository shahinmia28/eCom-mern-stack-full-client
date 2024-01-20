import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper className=' bg-dark text-light p-3'>
      <div className='container-fluid'>
        <div className='footer'>
          <h5 className='text-center fs-6'>
            All right Reserved &copy; Shahin Optical
          </h5>
          <ul className='d-flex'>
            <li>
              <NavLink to={'/about'}>About</NavLink>
            </li>
            |
            <li>
              <NavLink to={'/contact'}>Contact</NavLink>
            </li>
            |
            <li>
              <NavLink to={'/policy'}>Privacy Policy</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #b5b5b5;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    h5 {
      margin: 0;
      padding: 0;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0 10px;
      li {
        margin: 0px 8px;
        a {
          text-decoration: none;
          color: inherit;
          transition: all 0.4s linear;
          &:hover {
            color: #ffffff;
            border-bottom: 1px solid #fff;
          }
        }
      }
    }
  }
`;
export default Footer;
