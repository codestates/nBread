import React, { useRef, useEffect , useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select'
import { foodList, selectPerson } from './SelectList';
import DaumPostcode from 'react-daum-postcode';
import { writingPost } from '../redux/postWriting/action';
import { useHistory } from 'react-router-dom';
import { locationChange } from "../redux/location/action";

const { kakao } = window;

function PostingWrite({handleWritingAddress,PostingWriteModal,openModalPostingWrite}) {
  const history = useHistory();
  const dispatch = useDispatch();

  // 로그인한 유저 정보
  const userInfo = useSelector((state)=> state.loginReducer.data)
  const [testWriteInfo, setTestWriteInfo] = useState({
    lat: '',
    lng: '',
  })
  const [writeInfo, setWriteInfo] = useState({
    address: userInfo.address,
    body: '',
    category_food: '',
    delivery_fee: '',
    recruitment_personnel: '',
    restaurant_name: '',
    lat: '',
    lng: '',
  })
  const [visible, setVisible] = useState(false); // 다음 우편번호 컴포넌트의 노출여부 상태
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메세지 상태

  const handleWritingValue = (key) => (e) => {
    setWriteInfo({ ...writeInfo, [key]: e.target.value })
  }

  const handleSelectPerson = e => {
    setWriteInfo({ ...writeInfo, recruitment_personnel : e.value})
  }

  const handleSelectMenu = e => {
    setWriteInfo({ ...writeInfo, category_food : e.value})
  }

  const handleInput = (e) => {
    const { value } = e.target;
    if (value.length >= 5) {
      e.preventDefault();
      return;
    }
  };

  useEffect(()=>{
    setNewSearchAddress()  
  }, [PostingWriteModal, writeInfo.address])

  const setNewSearchAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    
    let callback = function(result, status) {
      if (status === 'OK') {
        const newAddSearch = result[0]
        setWriteInfo({ ...writeInfo, lat: newAddSearch.y, lng: newAddSearch.x})
      }
    };
    geocoder.addressSearch(`${writeInfo.address}`, callback);
  }

  // 글 등록하기 버튼
  const handleWritingBtn = () => {
    const {address , body, category_food, delivery_fee, recruitment_personnel, restaurant_name, lat, lng} = writeInfo;
    const data = {
      address: address,
      body: body,
      category_food: category_food,
      delivery_fee: delivery_fee,
      recruitment_personnel: recruitment_personnel,
      restaurant_name: restaurant_name,
      lat: lat,
      lng: lng,
      nickname: userInfo.nickname
    }

    if(address === '' || body === '' || category_food === '' || delivery_fee === '' || recruitment_personnel === '' || restaurant_name === ''){
      setErrorMessage('모든 항목은 필수입니다')
    }else{
      dispatch(writingPost(data))
      alert('글쓰기가 성공했습니다')
      handleWritingAddress( {lat: data.lat, lng: data.lng})
      openModalPostingWrite()
    }
  }

  // 주소 api css
  const addressStyle = {
    display: 'block',
    position: 'absolute',
    top: '85px',
    left: '20px',
    zIndex: '100',
    padding: '7px',
    width: '90%',
    height: '80%'
  }

  // 주소 검색 api
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setWriteInfo({ ...writeInfo, address : fullAddress})
    setVisible(false)
  }


  return (
    <>
    <ModalBackdrop onClick={openModalPostingWrite}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <PostingWriteForm onSubmit={(e) => e.preventDefault()}>
          <PostingWriteTitle>모집글작성      
            <PostSpan onClick={openModalPostingWrite}>&times;</PostSpan>
          </PostingWriteTitle>
          <InputFieldDiv>
            <InputField placeholder='식당이름' onChange={handleWritingValue('restaurant_name')}/>
            <SelectDiv>
              <StyledMeneSelect 
                placeholder={'메뉴'} 
                options={foodList} 
                onChange={(e)=>handleSelectMenu(e)} 
              />
              <StyledPersonSelect 
                placeholder={'모집인원'} 
                options={selectPerson} 
                onChange={(e)=>handleSelectPerson(e)} 
              />
            </SelectDiv>
            <AdressDiv>

            {visible? 
              <>
                <CloseBtn onClick={() => setVisible(false)} >닫기</CloseBtn> 
                <DaumPostcode 
                  onComplete={handleComplete}
                  onSuccess={setNewSearchAddress}
                  style={addressStyle}
                  height={700}
                  />
              </>
            : null
            }
            
            {writeInfo.address === '' ? 
              <AddressInputDiv onClick={() => setVisible(true)} >
                주소를 검색 해주세요
              </AddressInputDiv>
            : <AddressInputDiv onClick={() => setVisible(true)} >
                {writeInfo.address}
              </AddressInputDiv>
            }

              {/* 주소입력과 기본 주소불러오기 */}
              <AdressBasicDiv>
              <AdressBasic>기본 주소</AdressBasic>
              <AdressCheck type='checkbox'></AdressCheck>
              </AdressBasicDiv>
            </AdressDiv>
            <InputField 
              onKeyPress={handleInput}
              onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
              placeholder='배달료' 
              type='number' 
              onChange={handleWritingValue('delivery_fee')}/>
            <Detail placeholder='세부사항을 작성해주세요.' onChange={handleWritingValue('body')}/>
          </InputFieldDiv>
          <Err>{errorMessage}</Err>
          <PostingWriteButton onClick={handleWritingBtn} type='submit'>등록하기</PostingWriteButton>
        </PostingWriteForm>
      </Wrapper>
    </ModalBackdrop>
    </>
  );
}

  //모달창이 떳을때 뒷배경 어둡게
  const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  display: grid;
  place-items: center;
  `;

  const Wrapper = styled.div`
    text-align: center;
    /* width: 320px;
    height: 568px; */
    width: 375px;
    height: 667px;
    display: flex;
    justify-content: center;
    background-color: #FAFAFA;
    position: fixed;
    bottom: 60px;
    right: 18px;
    z-index: 1;
    border-radius: 30px;
    @media (max-width: 768px) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);   
  }  
  `;

  const PostingWriteTitle = styled.div`
    font-size: 28px;
    margin-top: 25px;
    margin-bottom: 25px;
  `;

  const PostSpan = styled.span`
    position: absolute;
    right: 40px;
  `

  const PostingWriteForm = styled.form`
  `;

  const InputFieldDiv = styled.div`
    margin-top: 35px;
  `;

  const InputField = styled.input`
      ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }    
    display: flex;
    flex-direction: column;
    width: 295px;
    height: 50px;
    font-size: 18px;
    margin: 0 auto;
    margin-top: 20px;
    border:solid 1px #C4C4C4;
    border-radius: 6px;
    padding-left: 5px;
    /* &:focus {
    outline: none;
    border: 1px solid #C4C4C4 ;   
      } */
  `;

  const CloseBtn = styled.button`
    display: block;
    position: absolute;
    top: 60px;
    right: 25px;
    z-index: 100;
    padding: 7px;
    width: 100px;
    color: white;
    background-color: #A3A3A3;
    border: none;
  `;

  const AddressInputDiv = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    width: 240px;
    height: 50px;
    font-size: 18px;
    margin: 0 auto;
    margin-top: 20px;
    border:solid 1px #C4C4C4;
    border-radius: 6px;
    /* &:focus {
    outline: none;
    border: 1px solid #C4C4C4 ;   
      } */
  `;

  const SelectDiv = styled.div`
    margin-top: 10px;
    display: flex;
  `;

  //주소와 기본주소 Div
  const AdressDiv = styled.div`
    display: flex;
`;    

  //기본주소 Div
  const AdressBasicDiv = styled.div`
    margin-top: 15px;
`;  

  //'기본주소' 글씨
  const AdressBasic = styled.div`
  font-size: 14px;
`;

  //기본주소 체크박스
  const AdressCheck = styled.input`
  width: 35px;
  height: 35px;
`;

  const Detail = styled(InputField)`
    height: 180px;    
    margin-top: 20px;
  `;

  const Err = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 2px;
  `;

  const PostingWriteButton = styled.button`
    width: 295px;
    height: 56px;
    background-color: #B51D29;
    color: white;
    border: none;
    font-size: 18px;
    margin-top: 7%;
  `;

  const StyledMeneSelect = styled(Select)`
    width: 145px;
  `

  const StyledPersonSelect = styled(Select)`
    width: 145px;
    margin-left: 4px;
  `




export default PostingWrite;
