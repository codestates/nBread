import React, { useRef, useEffect , useState, useMemo} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { showPostList, showPostReset } from "../redux/posts/actions";
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { locationChange } from "../redux/location/action";
import { useInterval } from "./useInterval";

const { kakao } = window;


function KaKaoMap({writingAddress,mainSearchAddressCenter}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const locationInfo = useSelector((state)=> state.locationReducer)   // 글쓴 곳의 주소
  // console.log('현재위치',locationInfo)


  const [state, setState] = useState({
    // 지도의 초기 위치
    // center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    center: { lat: locationInfo.posts[0], lng: locationInfo.posts[1] },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [dragMap, setDragMap] = useState();
  const [position, setPosition] = useState();
  const [searchAddress, SetSearchAddress] = useState();
  const [map, setMap] = useState();
  const [info, setInfo] = useState();
  // 마커 표시 게시물 데이터
  const MarkerPost = useSelector((state)=> state.postsReducer.posts)
  const userInfo = useSelector((state)=> state.loginReducer)   // 로그인한 유저

  // 주소 검색시 위치로 이동
  const mainSearch = () => {
    {mainSearchAddressCenter&& 
      setState({
        center: { lat: mainSearchAddressCenter.center.lat, lng: mainSearchAddressCenter.center.lng }
      })
    }
  }
  
  useEffect(()=>{
    mainSearch()
  },[mainSearchAddressCenter])


  // console.log('mapmapamp',writingAddress)

  const writingSearch = () => {
    {writingAddress&& 
      setState({
        center: { lat: writingAddress.lat, lng: writingAddress.lng }
      })
    }
  }

  useEffect(()=>{
    writingSearch()
  },[writingAddress])

  // test ------------
  useEffect(()=>{
    userInfoNewSearchAddress()
  },[userInfo])

  const userInfoNewSearchAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    
    let callback = function(result, status) {
      if (status === 'OK') {
        const newAddSearch = result[0]
        const newAddSearchLng =  newAddSearch.x
        const newAddSearchLat =  newAddSearch.y
        dispatch(locationChange(newAddSearchLat, newAddSearchLng))
        setState({
          center: { lat: newAddSearchLat, lng:  newAddSearchLng }
        })
      }
    };
    
    {userInfo.isLogIn && geocoder.addressSearch(`${userInfo.data.address}`, callback)}
    // geocoder.addressSearch(`${userInfo.data.address}`, callback);
  }

  // --------------

  useEffect(()=>{
    handleMapInfo()
  }, [map,state])

  // 지도의 레벨에 맞춰 목록 출력
  useEffect(()=>{
    if(info && info.level <= 5){
      dispatch(showPostList(info))
    }else if(info && info.level >= 6){
      dispatch(showPostList())
    }    
  }, [info])

  const handleMapInfo = () => {
    {map && (setInfo({
      center: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
      level: map.getLevel(),
      typeId: map.getMapTypeId(),
      swLatLng: {
        lat: map.getBounds().getSouthWest().getLat(),
        lng: map.getBounds().getSouthWest().getLng(),
      },
      neLatLng: {
        lat: map.getBounds().getNorthEast().getLat(),
        lng: map.getBounds().getNorthEast().getLng(),
      },
    }))
  }}


  return (
    <div>
      <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100vh",
        }}
        level={4} // 지도의 확대 레벨
        onCreate={(map) => setMap(map)}
        // onZoomChanged={(map) => setLevel(map.getLevel())}
        // onDragEnd={handleMapInfo}
        onIdle={handleMapInfo} // 중심 좌표나 확대 수준이 변경됐을 때
      >

      {MarkerPost && 
        MarkerPost.map((el, index) => (
          <MapMarker
            // key={`${position.title}-${position.latlng}`}
            key={index}
            position={{ lat: el.lat, lng: el.lng }} // 마커 표시 위치
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지 주소
              size: {
                widht: 24,
                height: 35
              }, // 마커이미지의 크기
            }}
            // title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          />
        ))
      }
    </Map>
      {/* {level && <p>{'현재 지도 레벨은 ' + level + ' 입니다'}</p>} */}

      {/* {info && (
        <div>
          <p>위도 : {info.center.lat}</p>
          <p>경도 : {info.center.lng}</p>
          <p>레벨 : {info.level}</p>
          <p>타입 : {info.typeId}</p>
          <p>남서쪽 좌표 : {info.swLatLng.lat}, {info.swLatLng.lng}</p>
          <p>북동쪽 좌표 : {info.neLatLng.lat}, {info.neLatLng.lng}</p>
        </div>
      )} */}
      {/* <button onClick={handleMapLevel}>클릭</button> */}
    </div>
  );
}

export default KaKaoMap;

