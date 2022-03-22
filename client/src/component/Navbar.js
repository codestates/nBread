import React from 'react'
import styled from 'styled-components'
import logo from '../icons/ban_logo.png'


function Navbar() {
  const Wrapper = styled.div`
    height: 120px;
    background-color: #D2D1D1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const Logo = styled.img`

  `; 

  const Login = styled.div`
    margin-right: 2em;
  `; 
  return (
    <>
      <Wrapper>
        <Logo src={logo}/>
        <Login>로그인</Login>
      </Wrapper>
    </>
  );
}

export default Navbar;