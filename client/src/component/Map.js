import React, { useRef, useEffect , useState, useMemo} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { showPostList, showPostReset } from "../redux/posts/actions";
import { useHistory } from 'react-router-dom';
import { userLocationEdit } from "../redux/user/action";

const { kakao } = window;


function KaKaoMap({writingAddress,mainSearchAddressCenter}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const MarkerPost = useSelector((state)=> state.postsReducer.posts) // 마커 표시 게시물 데이터
  const userInfo = useSelector((state)=> state.loginReducer)   // 로그인한 유저
  const isLogin = useSelector((state)=> state.loginReducer.isLogIn)
  const locationInfo = useSelector((state)=> state.locationReducer)   // 글쓴 곳의 주소

  // ------- test ---------
  // const [location, setLocation] = useState({
  //   // 지도의 초기 위치
  //   lat: userInfo.location[0], 
  //   lng: userInfo.location[1],
  // });
  // ------- test ---------
  console.log("userInfo: ", userInfo)
  const [location, setLocation] = useState({
    // 지도의 초기 위치
    lat: 37.49676871972202, 
    lng: 127.02474726969814 ,
  }
  );
  const [dragMap, setDragMap] = useState();
  const [position, setPosition] = useState();
  const [searchAddress, SetSearchAddress] = useState();
  const [map, setMap] = useState();
  const [info, setInfo] = useState();

  useEffect(()=>{
    // console.log('1, 주소 검색시 위치로 이동')
    mainSearch()
  },[mainSearchAddressCenter])

  useEffect(()=>{
    // console.log('2, 글쓰기 주소 검색창')
    writingSearch()
  },[writingAddress])

  useEffect(()=>{
    // console.log('3, 유저 정보의 위치로 이동')
    setLocation({
      lat: userInfo.location[0], lng:  userInfo.location[1] 
    })
    // userInfoNewSearchAddress()
  },[userInfo])

  useEffect(()=>{
    // console.log('4, 지도의 정보를 다시 받아옴')
    handleMapInfo()
  }, [map, location])

  // 지도의 레벨에 맞춰 목록 출력
  useEffect(()=>{
    // console.log('5, 지도의 레벨에 맞춰서 글의 목록을 보여주는 요청 ')
    if(info && info.level <= 5){
      dispatch(showPostList(info))
    }else if(info && info.level >= 6){
      dispatch(showPostList())
    }    
  }, [info])

  const writingSearch = () => {
    {writingAddress&& 
      setLocation({
        lat: writingAddress.lat, lng: writingAddress.lng
      })
    }
  }

  // 주소 검색시 위치로 이동
  const mainSearch = () => {
    {mainSearchAddressCenter&& 
      setLocation({
        lat: mainSearchAddressCenter.center.lat, lng: mainSearchAddressCenter.center.lng
      })
    }
  }
  
  // const userInfoNewSearchAddress = () => {
  //   const geocoder = new kakao.maps.services.Geocoder();
    
  //   let callback = function(result, status) {
  //     if (status === 'OK') {
  //       const newAddSearch = result[0]
  //       const newAddSearchLng =  newAddSearch.x
  //       const newAddSearchLat =  newAddSearch.y
  //       // setLocation({
  //       //   lat: newAddSearchLat, lng:  newAddSearchLng 
  //       // })
  //       setUserLocation({
  //         lat: newAddSearchLat, lng:  newAddSearchLng 
  //       })
  //       // dispatch(userLocationEdit(newAddSearchLat, newAddSearchLng)) 
  //     }
  //   };
  //   {isLogin && geocoder.addressSearch(`${userInfo.data.address}`, callback)}
  // }


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
        center={{ lat: location.lat, lng: location.lng }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100vh",
        }}
        level={4} // 지도의 확대 레벨
        onCreate={(map) => setMap(map)}
        onIdle={handleMapInfo} // 중심 좌표나 확대 수준이 변경됐을 때
      >

      {MarkerPost && 
        MarkerPost.map((el, index) => (
          <MapMarker
            key={index}
            position={{ lat: el.lat, lng: el.lng }} // 마커 표시 위치
            image={{
              src:`/icon/${el.category_food}.png`,
              size: {
                widht: 24,
                height: 30
              }, // 마커이미지의 크기
            }}
          />
        ))
      }
    </Map>
    </div>
  );
}

export default KaKaoMap;

