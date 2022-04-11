import React from "react";
import styled from "styled-components";
import Pizza from "./img/pizza.jpg";
import { useHistory } from "react-router-dom";
import { Slide, Zoom } from "react-awesome-reveal";

function Section4() {
  const history = useHistory();

  const handleMain = () => {
    history.push("/");
  };
  return (
    <div>
      <Div>
        <Wrapper>
          <TextDiv>
            <Zoom triggerOnce={false} duration={1500}>
              <Text> 음식값보다 비싼 배달비</Text>
              <Text>지금바로 N빵 해볼까요!</Text>
            </Zoom>
            <GoButton onClick={handleMain}>시작하기</GoButton>
          </TextDiv>
        </Wrapper>
      </Div>
      <Footer>
        <FooterDiv>
          <FooterContents>
            <Content>
              <Name>이 지 원 Front-End</Name>
            </Content>
            <Content>
              <Name>강 연 수 Front-End</Name>
            </Content>
            <Content>
              <Name>양 희 제 Back-End</Name>
            </Content>
            <Content>
              <Name>유 균 한 Back-End</Name>
            </Content>
          </FooterContents>
          <NBread href="https://github.com/codestates/nBread" target="_blank">
            Copyright @ 2022 nBread
          </NBread>
          <IconSorce>Icon made by Freepik from www.flaticon.com</IconSorce>
        </FooterDiv>
      </Footer>
    </div>
  );
}
export default Section4;

export const Div = styled.div`
  width: 100vw;
  height: 100%;
  background-image: url(${Pizza});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.61);
  padding-top: 75px;
  height: 100vh;
  padding: 0 20px;
  align-items: center;
  display: flex;
`;

export const TextDiv = styled.div`
  margin-left: 20%;
  @media (max-width: 710px) {
    margin-left: 17%;
  }
  @media (max-width: 576px) {
    margin-left: 17%;
  }
  @media (max-width: 400px) {
    margin-left: 14%;
  }
`;

export const Text = styled.div`
  color: #d9c6ac;
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 5px;
  @media (max-width: 710px) {
    font-size: 3rem;
  }
  @media (max-width: 576px) {
    font-size: 1.7rem;
  }
  @media (max-width: 400px) {
    font-size: 1.7rem;
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 140px;
  background-color: #c4c4c4;
`;

export const GoButton = styled.button`
  margin-top: 20px;
  width: 180px;
  height: 60px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 50px;
  background-color: #7c0811;
  color: #d9c6ac;
  border: 0;
  @media (max-width: 710px) {
    margin-top: 15%;
    margin-left: 37px;
  }
  @media (max-width: 576px) {
    margin-left: 29px;
    margin-top: 15%;
  }
  @media (max-width: 400px) {
    margin-left: 27px;
    margin-top: 15%;
  }
`;

export const FooterDiv = styled.div`
  width: 100%;
  background-color: #d9c6ac;
  padding-top: 25px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: 500;
  padding-bottom: 20px;
`;

export const IconContainer = styled.div`
  > a {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

export const FooterContents = styled.div`
  /* padding: 20px 0; */
  margin-top: 20px;
  padding: 20px;
  display: flex;
`;

export const Content = styled.div`
  text-align: center;
  color: #403c36;
  &:not(:last-child) {
    padding-right: 40px;
  }
`;

export const Name = styled.div`
  padding-bottom: 10px;
`;

export const MemberGithub = styled.div`
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

export const NBread = styled.a`
  color: #403c36;
  font-weight: 400;
  font-size: 14px;
  margin-top: 10px;
  > a {
    &:first-child {
      color: #837b70;
      font-weight: 300;
    }
  }
  &:hover {
    color: #9a8e7d;
  }
`;

export const IconSorce = styled.p`
  color: #403c36;
  font-weight: 400;
  font-size: 10px;
  margin-top: 2px;
`;
