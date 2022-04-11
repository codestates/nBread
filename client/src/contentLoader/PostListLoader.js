import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import ContentLoader from "react-content-loader"


function PostListLoader(props) {
  const [loading, setLoading] = useState(true);
	useEffect(() => {
		const timeout = setTimeout(() => setLoading((loading) => !loading), 1000);
		return () => clearTimeout(timeout);
	}, [setLoading]);

  return (
  <Wrapper>
    <ContentLoader 
      viewBox="0 0 500 475" 
      height={475} 
      width={500} 
      {...props}>
    <circle cx="70.2" cy="230" r="70" />
    <rect x="180" y="150" width="212.5" height="18" />
    <rect x="180" y="195" width="212.5" height="18" />
    <rect x="180" y="240" width="212.5" height="18" />
    <rect x="180" y="285" width="212.5" height="18" />
    </ContentLoader>
  </Wrapper>
  );
}


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
} 
`;

export default PostListLoader;