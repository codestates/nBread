import React, { useRef, useEffect , useState} from "react";

const { kakao } = window;


function Map() {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  })

  const MapContainer = useRef(null); //지도 영역 DOM 레퍼런스

  const options = {
    //지도 생성 기본 옵션
    center: new kakao.maps.LatLng(state.center.lat, state.center.lng), //지도 중심좌표
    level: 3, //지도 레벨(확대, 축소)
  };
  

  useEffect(() => {
    const map = new kakao.maps.Map(MapContainer.current, options); //지도 생성, 객체 리턴
  }, [state]);

  return (
    <div>
      <div
        className="map"
        style={{ width: "100vw", height: "80vh" }}
        ref={MapContainer}
      ></div>

      <button
        onClick={() =>setState({center: { lat: 33.450701, lng: 126.570667 }})}
      >
        지도 중심좌표 부드럽게 이동시키기
      </button>

    </div>
  );
}

export default Map;

