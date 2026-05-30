import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

// dayjs 설정: UTC 및 타임존 플러그인 확장, 한국어 로캘 설정
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

/**
 * 예식 일시 설정
 * Asia/Seoul 타임존 기준으로 설정합니다.
 */
export const WEDDING_DATE = dayjs.tz("2026-10-24 17:00", "Asia/Seoul")

/**
 * 예식 일시 포맷
 * 분이 0이면 분을 생략하고, 그 외에는 표시합니다.
 * 예: 2024년 8월 24일 토요일 오후 1시
 */
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

/**
 * 예식 당월 휴무일 (달력 표시용)
 * 예: 8월 15일 광복절
 */
export const HOLIDAYS = [3, 5, 9]

/**
 * 예식 장소 명칭
 */
export const LOCATION = "양재 엘블레스"

/**
 * 예식 장소 상세 주소
 */
export const LOCATION_ADDRESS = "서울특별시 서초구 강남대로 213 B1"

/**
 * 카카오톡 공유 시 사용할 위치 정보 주소
 * 필요에 따라 LOCATION과 다르게 설정할 수 있습니다.
 */
export const SHARE_ADDRESS = LOCATION

/**
 * 카카오톡 공유 시 표시될 위치 제목
 */
export const SHARE_ADDRESS_TITLE = LOCATION

/**
 * 지도 서비스(네이버, 카카오)에 사용할 좌표 [경도, 위도]
 */
export const WEDDING_HALL_POSITION = [127.034949554107, 37.4827666361943]

/**
 * 지도 서비스(티맵)에 사용할 주차장 좌표 [경도, 위도]
 */
export const PARKING_BUILDING_POSITION = [127.034117823374, 37.4836850972087]

/**
 * 네이버 지도 장소 ID (NMAP_PLACE_ID)
 * 네이버 지도에서 장소 검색 후 URL의 숫자 부분을 입력합니다.
 */
export const NMAP_PLACE_ID = 37688101

/**
 * 카카오 지도 장소 ID (KMAP_PLACE_ID)
 * 카카오 지도에서 장소 상세보기 클릭 후 URL의 숫자 부분을 입력합니다.
 */
export const KMAP_PLACE_ID = 607282159

// 신부 정보 설정
export const BRIDE_FULLNAME = "우주영"
export const BRIDE_FIRSTNAME = "주영"
export const BRIDE_TITLE = "장녀"
export const BRIDE_FATHER = "우두환"
export const BRIDE_MOTHER = "조미경"

/**
 * 신부측 연락처 (계좌번호는 .env → information 컴포넌트에서 병합)
 */
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-9354-2449",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-5278-2449",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-3964-2449",
  },
]

// 신랑 정보 설정
export const GROOM_FULLNAME = "서경석"
export const GROOM_FIRSTNAME = "경석"
export const GROOM_TITLE = "장남"
export const GROOM_FATHER = "서종환"
export const GROOM_MOTHER = "하은숙"

/**
 * 신랑측 연락처 (계좌번호는 .env → information 컴포넌트에서 병합)
 */
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-2020-0516",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-8583-5168",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-7103-5168",
  },
]
