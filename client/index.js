import React, { useRef, useEffect, useState, useCallback } from 'react';
import MapHeader from 'components/Header/Homeheader';
import Walk from 'components/Overlay/Walk';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import { SearchBar, SearchBtn, SearchContainer } from './MapStyle';
import petchingPuppyImg from '../../assets/img/profile/petchingPuppyImg.png';
import { customOverlay } from './customOverlay';
import CommentInput from './commentInput';
import Comment from './Comment';
import axios from 'redux/Async/axios';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/store';
import { genPinIconType } from 'utils/genPinIconType';

const SEOUL_COORDINATION = [37.529789809685475, 126.96470201104091];

function Index() {
  const [comments, setComments] = useState([
    { id: 1, name: '비숑숑', content: '강아지 너무 귀여워요 😍' },
  ]);

  const nextId = useRef(1);

  const onInsert = useCallback(
    (name, content) => {
      const comment = {
        id: nextId.current,
        name,
        content,
      };
      console.log(name);
      console.log(content);
      setComments((comments) => comments.concat(comment));
      nextId.current += 1; //nextId 1씩 더하기
    },
    [comments],
  );

  const mapRef = useRef(null);
  const { kakao } = window;

  const [isWalkOpen, setIsWalkOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  const [isMarkerSelected, setIsMarkerSelected] = useState(false);
  const [latlng, setLatlng] = useState([]);
  const [pinpointers, setPinpointers] = useState([]);
  const [targetUserInfo, setTargetUserInfo] = useState({});
  const [allPins, setAllPins] = useState({});
  const [searchResult, setSearchResult] = useState({});

  useEffect(() => {
    for (let i = 0; i < allPins.data?.length; i++) {
      displayMarkerandOverlay(allPins.pinpointers[i], allPins.data[i]);
    }
  }, [allPins]);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(inputText, placesSearchCB);

    setInputText('');
  };

  const mapClickHandler = (e) => {
    setIsWalkOpen((prev) => !prev);
  };

  async function placesSearchCB(pin, status) {
    if (status === kakao.maps.services.Status.OK) {
      let bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < pin.length; i++) {
        bounds.extend(new kakao.maps.LatLng(pin[i].y, pin[i].x));
      }

      window.map.setBounds(bounds);

      try {
        //Latitude is the Y axis, longitude is the X axis.
        const result = {
          level: window.map.getLevel(),
          centerLng: Number.parseFloat(pin[0].x),
          centerLat: Number.parseFloat(pin[0].y),
        };
        setSearchResult(result);

        const response = await axios.post('/map/allpins', result);

        setAllPins({
          data: response.data.data,
          pinpointers: response.data.pinpointers,
        });
      } catch (err) {
        console.log('error!!!!!');
      }
    }
  }

  function displayMarkerandOverlay(data, pin) {
    const position = new kakao.maps.LatLng(data.lat, data.lng);

    const iconSelect = genPinIconType(data.iconType);
    const imageSize = new kakao.maps.Size(40, 40);
    const imageOption = { offset: new kakao.maps.Point(22, 69) };
    const markerImage = new kakao.maps.MarkerImage(
      iconSelect,
      imageSize,
      imageOption,
    );

    let marker = new kakao.maps.Marker({
      map: window.map,
      position: position,
      image: markerImage,
      clickable: true,
    });

    let wrapper = document.createElement('div');
    wrapper.innerHTML = customOverlay(data, pin);

    let closeBtn = wrapper.firstChild.querySelector('.close-button');

    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setIsMarkerSelected(false);
      overlay.setMap(null);
    });

    let overlay = new kakao.maps.CustomOverlay({
      content: wrapper.firstChild,
      map: window.map,
      position: marker.getPosition(),
      xAnchor: 1,
      yAnchor: 1,
      clickable: true,
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', async () => {
      setIsMarkerSelected(true);
      overlay.setMap(null);
      overlay.setMap(window.map);

      setTargetUserInfo({
        pinpointerId: pin.pinpointerId,
        pin,
        profileImg: pin.thumbImg,
        userName: pin.nickname,
        puppyName: pin.puppyName,
        introduceTo: pin.introduction,
        puppyAge: pin.age,
      });
    });

    marker.setMap(window.map);
    //오버레이들이 화면에 한방에 안뜨게 아예 마커만 보이게 설정
    overlay.setMap(null);
  }

  useEffect(() => {
    const mapOptions = {
      center: new kakao.maps.LatLng(...SEOUL_COORDINATION),
      level: 7,
    };

    //장소 검색시, 이를 좌표화.
    try {
      const map = new kakao.maps.Map(mapRef.current, mapOptions);

      // dispatch(addMap(map));
      window.map = map;
      // setMap(map);

      // 클릭한 위도, 경도 정보를 가져와서 스테이트 변화.
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        let latlng = mouseEvent.latLng;
        let array = [latlng.getLat(), latlng.getLng()];
        setLatlng(array);
        mapClickHandler();
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const { loginState } = useSelector(selectUser);

  return (
    <>
      <MapHeader className="mapHeader" />
      <MapMain>
        {loginState && isWalkOpen === true ? (
          <Walk
            setIsWalkOpen={setIsWalkOpen}
            latlng={latlng}
            pinpointers={pinpointers}
            allPins={allPins}
            setAllPins={setAllPins}
            searchResult={searchResult}
          ></Walk>
        ) : null}
        <MapContainer
          ref={mapRef}
          searchPlace={place}
          className="MapContainer"
          // onClick={mapClickHandler}
        >
          <SearchContainer
            className="inputForm"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchBar
              placeholder="장소 검색"
              onChange={onChange}
              value={inputText}
            ></SearchBar>
            <SearchBtn type="submit">검색</SearchBtn>
          </SearchContainer>
        </MapContainer>
        <UserInfoContainer className="UserInfoContainer">
          <UserCard className="UserCard">
            <UserContainer>
              {isMarkerSelected ? (
                <>
                  <UserInfoWrapper>
                    <UserInfo {...targetUserInfo} />
                  </UserInfoWrapper>
                  <Replys>
                    <ReplyCon>
                      {targetUserInfo.pin?.messages?.map((message) => {
                        return (
                          <>
                            <Comment
                              message={message}
                              id={message.id}
                              name={message.name}
                              content={message.content}
                            />
                          </>
                        );
                      })}

                      <CommentInput
                        onInsert={onInsert}
                        pinpointerId={targetUserInfo?.pin?.pinpointerId}
                        allPins={allPins}
                        setAllPins={setAllPins}
                      ></CommentInput>
                    </ReplyCon>
                  </Replys>
                </>
              ) : (
                <ContentTitle>
                  <MainText>핀을 클릭해서 친구들을 만나보세요!</MainText>
                  <MainImg src={petchingPuppyImg}></MainImg>
                </ContentTitle>
              )}
            </UserContainer>
          </UserCard>
        </UserInfoContainer>
      </MapMain>
    </>
  );
}

const Replys = styled.div`
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const UserInfoWrapper = styled.div`
  flex-direction: column;
  min-height: 20rem;
  width: 100%;
`;

const ReplyCon = styled.div`
  background-color: #f7f1ed;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e97676;
    border-radius: 20px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 20px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #febeb0;
`;

const MainText = styled.div`
  text-align: center;
  color: white;
`;

const MainImg = styled.img`
  width: 70%;
  height: 49%;
  margin-left: 15px;
  justify-content: center;
`;

const MapMain = styled.main`
  display: flex;
  height: calc(100vh - 7rem);
  transform: translateY(7rem);
  & .MapContainer {
    flex: 0.65;
  }
  & .UserInfoContainer {
    flex: 0.35;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    height: 102rem;
    & .MapContainer {
      min-height: 20rem;
      max-height: 35rem;
    }
    & .UserInfoContainer {
      flex: 1;
    }
  }
  @media screen and (min-width: 1400px) {
    & .MapContainer {
      flex: 0.75;
    }
    & .UserInfoContainer {
      flex: 0.25;
    }
  }
`;

const MapContainer = styled.div`
  min-height: 50rem;
`;

const UserInfoContainer = styled.div`
  /* padding: 3rem; */
  background-color: white;
`;

// const ContentTitle = styled.div`
//   text-align: center;
//   padding-top: 75%;
//   padding-bottom: 25%;
// `;

// const MainText = styled.div`
//   font-size: 2.3rem;
//   color: white;
// `;

// const MainImg = styled.img`
//   width: 70%;
//   height: 70%;
// `;

//# When pin clicked
const UserCard = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 50rem;

  background-color: white;
  & .UserInfo {
    background-color: white;
    flex: 0.3;
  }
  & .Reply {
    background-color: red;
    flex: 0.7;
  }
`;

const UserContainer = styled.div`
  box-sizing: border-box;
  word-break: keep-all;

  /* padding: 1.3rem; */
  /* align-items: center; */
  /* width: 500px;  */
  /* background-color: white; */
  height: 100%;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  & .UserInfo {
    background-color: white;
    flex: 0.3;
  }
  & .Reply {
    background-color: yellow;
    flex: 0.7;
  }
`;

export default Index;
