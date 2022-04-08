import React, { useState, useEffect } from 'react';
import styled from 'styled-components'


function PostListLoader(props) {
  const [loading, setLoading] = useState(true);
	useEffect(() => {
		const timeout = setTimeout(() => setLoading((loading) => !loading), 1000);
		return () => clearTimeout(timeout);
	}, [setLoading]);

  return (
    <Wrapper>
    <PostListImg />
    <PostListTextWrapper>
      <PostListText></PostListText>
      <PostListText></PostListText>
      <PostListText></PostListText>
      <PostListText></PostListText>
    </PostListTextWrapper>
    </Wrapper>
    // <div id="wrapper">
    //   <div class="skeleton-ui" />
    //   <div class="skeleton-ui" />
    //   <div class="skeleton-ui" />
    // </div>
  );
}

// #wrapper {
//   width: 100%;
//   background-color: #222222;
//   padding: 15px;
// }
// .skeleton-ui {
//   height: 100px;
//   margin-top: 30px;
//   position: relative;
//   overflow: hidden;
// }
// .skeleton-ui:before {
//   content: '';
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   left: -100%;
//   top: 0;
//   background: linear-gradient(to right, #444444, #555555);
//   animation: skeleton 2s linear;
//   opacity: 0.5;
// }
// @keyframes skeleton {
//   from { left: -100% }
//   to { left: 100% }
// }


const Wrapper = styled.div`
display: flex;
margin-left: 4px;
align-items: center;
width: 98%;
height: 199px;
padding: 30px;
margin-bottom: 8px;
box-shadow: 0 0 4px #737373;
@media (max-width: 768px) {
  /* justify-content:center; */
} 
`;

const PostListImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: none;
  background: linear-gradient(to right, #444444, #555555);
`;

const PostListTextWrapper = styled.div`
padding-left: 40px;
`

const PostListText = styled.div`
  margin-bottom: 10px;
  width: 160px;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(to right, #444444, #555555);
`
export default PostListLoader;