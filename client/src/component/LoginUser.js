import React, { useRef, useState } from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { axiosLogout } from '../redux/user/action';

function LoginUser({setLoginModal}) {
  const dispatch = useDispatch();  
  const data = useSelector((state)=> state.loginReducer.data)
  const history = useHistory()
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  
  const onClick = () => {
    setIsActive(!isActive);
  }

  const handleLogout = () => {
      dispatch(axiosLogout())
      history.push('/')
  }

  const handleLoginButton = () => {
    setLoginModal(true)
  }

  const handleDropDown = () => {
    setDropdown(!dropdown)
  }

  return (
    <>
    {data ? 
    <Wrapper  onClick={handleDropDown}> 
    <MenuTrigger onClick={onClick}>
    <UserName> {data.nickname + " 님"}</UserName>
          <UserImg className="userImg"/>
      </MenuTrigger>
      <Svg onClick={handleDropDown}
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#A5A3A4" 
        >
        <path d="M6 9l6 6 6-6"/>
      </Svg>
      {dropdown? (
        <LoginMenu ref={dropdownRef}>
        <Ul>
          <Li onClick={null}><A href="/MyPage">마이페이지</A></Li>
          <Li onClick={handleLogout}><A>로그아웃</A></Li>
        </Ul>
      </LoginMenu>
      ):(
        null
      )}
    </Wrapper>
    : <LoginText onClick={handleLoginButton}>로그인</LoginText>}

    </>
  );
}
const LoginText = styled.div`
margin-right: 2em;
`; 

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  z-index: 99;
`;

const MenuTrigger = styled.div`
  background: #ffffff;
  border-radius: 90px;
  cursor: pointer;
  display: flex; 
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); */
  border: none;
  vertical-align: middle;
  transition: box-shadow 0.4s ease;
  margin-left: auto;
`;

const UserName = styled.p`
  background: #ffffff;
  border-radius: 90px;
  cursor: pointer;
  display: flex; 
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); */
  border: none;
  vertical-align: middle;
  transition: box-shadow 0.4s ease;
  margin-left: auto;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #737373;
`;

const Svg = styled.svg`
  stroke-width: 2; 
`;

const LoginMenu = styled.nav`
  background: #ffffff;
  color: #333333;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  right: 0;
  width: 200px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  /* //-----------기본적용되어있던것.
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px); */
  //-----------임시로적용
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  //조건부 스타일링
  /* opacity: ${props => (props.isActive === true ? "1" : "0")};
  visibility: ${props => (props.isActive === true ? "visible" : "hidden")};
  transform: ${props => (props.isActive === true ? "translateY(0)" : "translateY(-20px)")}; */
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  border-bottom: 1px solid #dddddd;
`;

const A = styled.a`
  text-decoration: none;
  color: #333333;
  padding: 15px 20px;
  display: block;
`;
export default LoginUser;