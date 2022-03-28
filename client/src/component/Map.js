import React, { useRef, useEffect , useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

const { kakao } = window;


function KaKaoMap() {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [dragMap, setDragMap] = useState();
  const [position, setPosition] = useState();
  const [level, setLevel] = useState();
  const [searchAddress, SetSearchAddress] = useState();
  const [map, setMap] = useState();
  const [info, setInfo] = useState();

  // 마커 표시 게시물 데이터
  const MarkerPost = useSelector((state)=> state.postsReducer.posts)

  // 키워드 입력후 검색 클릭 시 원하는 키워드의 주소로 이동
  const SearchMap = () => {
    console.log('searchAddress',searchAddress)
    const ps = new kakao.maps.services.Places()
    
    const placesSearchCB = function(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            console.log(status);
            console.log(data);
            const newSearch = data[0]
            setState({
              center: { lat: newSearch.y, lng: newSearch.x }
            })
        }
    };
    ps.keywordSearch(`${searchAddress}`, placesSearchCB); 
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      SearchMap()
    }
  }

  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value)
  }

  useEffect(()=>{
    handleMapInfo()
  }, [map, state, dragMap])

  const handleMapInfo = () => {
    // console.log('map',map)
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
    }
  }



  return (
    <div>
      <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
          // 지도의 크기
          width: "100%",
          height: "70vh",
        }}
        level={3} // 지도의 확대 레벨
        onBoundsChanged={(map) => setDragMap({ // 지도 드래그시 남서 북동 위도 경도 
          sw: map.getBounds().getSouthWest().toString(),
          ne: map.getBounds().getNorthEast().toString(),
        })}
        onCreate={(map) => setMap(map)}
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >

      {MarkerPost.length > 0 && 
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
    <button
      onClick={() =>
        setState({
          center: { lat: 33.55635, lng: 126.795841 },
          isPanto: true,
        })
      }
    >
      지도 중심좌표 부드럽게 이동시키기
    </button>
      {/* {!!dragMap && (
            <>
              <p>
                {'영역좌표는 남서쪽 위도, 경도는  ' + dragMap.sw + ' 이고'}<br/>
                {'북동쪽 위도, 경도는  ' + dragMap.ne + '입니다'}
              </p>
            </>
          )} */}
      {level && <p>{'현재 지도 레벨은 ' + level + ' 입니다'}</p>}
      <div>
        <input onChange={handleSearchAddress} onKeyPress={onKeyPress}></input>
        <button onClick={SearchMap}>클릭</button>
      </div>
      {info && (
        <div>
          <p>위도 : {info.center.lat}</p>
          <p>경도 : {info.center.lng}</p>
          <p>레벨 : {info.level}</p>
          <p>타입 : {info.typeId}</p>
          <p>남서쪽 좌표 : {info.swLatLng.lat}, {info.swLatLng.lng}</p>
          <p>북동쪽 좌표 : {info.neLatLng.lat}, {info.neLatLng.lng}</p>
        </div>
      )}
    </div>
  );
}

export default KaKaoMap;

