import { useEffect, useState, useRef } from "react"
import { useKakao, useKakaoMaps } from "../store"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import {
  KMAP_PLACE_ID,
  LOCATION,
  NMAP_PLACE_ID,
  PARKING_BUILDING_POSITION,
  WEDDING_HALL_POSITION,
} from "../../const"
import { KAKAO_SDK_JS_KEY } from "../../env"

/**
 * 지도를 표시하고 길찾기 앱(네이버, 카카오, 티맵) 연동 기능을 제공하는 컴포넌트입니다.
 *
 * @returns {JSX.Element} 지도 컴포넌트
 */
export const Map = () => {
  if (KAKAO_SDK_JS_KEY) {
    return <KakaoMapView />
  }
  // if (NAVER_MAP_CLIENT_ID) {
  //   return <NaverMapView />
  // }
  return <div>Map is not available</div>
}

/**
 * 카카오 지도를 렌더링합니다.
 */
const KakaoMapView = () => {
  const kakaoSdk = useKakao()
  const kakaoMaps = useKakaoMaps()
  const mapRef = useRef<HTMLDivElement>(null)

  // 모바일에서 스크롤 중 지도가 조작되는 것을 방지하기 위한 잠금 상태
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<number | null>(null)

  useEffect(() => {
    if (!kakaoMaps || !mapRef.current) {
      return
    }

    // useKakaoMaps에서 maps.load 완료 후에만 kakaoMaps가 설정됩니다.
    const center = new kakaoMaps.maps.LatLng(
      WEDDING_HALL_POSITION[1],
      WEDDING_HALL_POSITION[0],
    )
    const map = new kakaoMaps.maps.Map(mapRef.current, {
      center,
      level: 3,
    })
    const marker = new kakaoMaps.maps.Marker({ position: center })
    marker.setMap(map)
  }, [kakaoMaps])

  return (
    <MapChrome
      locked={locked}
      setLocked={setLocked}
      showLockMessage={showLockMessage}
      setShowLockMessage={setShowLockMessage}
      lockMessageTimeout={lockMessageTimeout}
      mapElement={<div className="map-inner" ref={mapRef} />}
      kakaoSdk={kakaoSdk}
    />
  )
}

/**
 * 네이버 지도를 렌더링합니다.
 */
// const NaverMapView = () => {
//   const naver = useNaver()
//   const kakaoSdk = useKakao()
//   const mapRef = useRef<HTMLDivElement>(null)

//   const [locked, setLocked] = useState(true)
//   const [showLockMessage, setShowLockMessage] = useState(false)
//   const lockMessageTimeout = useRef<number | null>(null)

//   useEffect(() => {
//     if (!naver || !mapRef.current) {
//       return
//     }

//     const map = new naver.maps.Map(mapRef.current, {
//       center: new naver.maps.LatLng(
//         WEDDING_HALL_POSITION[1],
//         WEDDING_HALL_POSITION[0],
//       ),
//       zoom: 17,
//     })

//     new naver.maps.Marker({
//       position: new naver.maps.LatLng(
//         WEDDING_HALL_POSITION[1],
//         WEDDING_HALL_POSITION[0],
//       ),
//       map,
//     })

//     return () => {
//       map.destroy()
//     }
//   }, [naver])

//   return (
//     <MapChrome
//       locked={locked}
//       setLocked={setLocked}
//       showLockMessage={showLockMessage}
//       setShowLockMessage={setShowLockMessage}
//       lockMessageTimeout={lockMessageTimeout}
//       mapElement={<div className="map-inner" ref={mapRef} />}
//       kakaoSdk={kakaoSdk}
//     />
//   )
// }

type MapChromeProps = {
  locked: boolean
  setLocked: React.Dispatch<React.SetStateAction<boolean>>
  showLockMessage: boolean
  setShowLockMessage: React.Dispatch<React.SetStateAction<boolean>>
  lockMessageTimeout: React.MutableRefObject<number | null>
  mapElement: React.ReactNode
  kakaoSdk: ReturnType<typeof useKakao>
}

const MapChrome = ({
  locked,
  setLocked,
  showLockMessage,
  setShowLockMessage,
  lockMessageTimeout,
  mapElement,
  kakaoSdk,
}: MapChromeProps) => {
  const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) {
      return "ios"
    } else if (userAgent.match(/(Android)/)) {
      return "android"
    } else {
      return "other"
    }
  }

  return (
    <>
      <div className="map-wrapper">
        {/* 잠금 상태일 때 오버레이 표시 */}
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = window.setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = window.setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}

        {/* 잠금 해제 버튼 */}
        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            if (lockMessageTimeout.current !== null) {
              clearTimeout(lockMessageTimeout.current)
            }
            setShowLockMessage(false)
            setLocked((locked) => !locked)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>

        {mapElement}
      </div>

      {/* 내비게이션 앱 연결 버튼 모음 */}
      <div className="navigation">
        {/* 네이버 지도 연동 */}
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
                break
              default:
                window.open(
                  `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          네이버 지도
        </button>

        {/* 카카오 내비 연동 */}
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                if (kakaoSdk)
                  kakaoSdk.Navi.start({
                    name: LOCATION,
                    x: WEDDING_HALL_POSITION[0],
                    y: WEDDING_HALL_POSITION[1],
                    coordType: "wgs84",
                  })
                break
              default:
                window.open(
                  `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          카카오 내비
        </button>

        {/* 티맵 연동 */}
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android": {
                const params = new URLSearchParams({
                  goalx: PARKING_BUILDING_POSITION[0].toString(),
                  goaly: PARKING_BUILDING_POSITION[1].toString(),
                  goalName: LOCATION,
                })
                window.open(`tmap://route?${params.toString()}`, "_self")
                break
              }
              default: {
                alert("모바일에서 확인하실 수 있습니다.")
                break
              }
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵(주차장)
        </button>
      </div>
    </>
  )
}
