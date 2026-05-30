import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  LOCATION_ADDRESS,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

const baseUrl = import.meta.env.BASE_URL

const getShareUrl = (path = "") =>
  new URL(path, window.location.origin + baseUrl).href

/**
 * 카카오톡으로 초대장을 공유할 수 있는 버튼 컴포넌트입니다.
 *
 * @returns {JSX.Element} 공유 버튼 섹션
 */
export const ShareButton = () => {
  const kakao = useKakao()
  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={() => {
          // 카카오 SDK 로드 전이면 무시
          if (!kakao) {
            return
          }

          const invitationLink = {
            mobileWebUrl: getShareUrl(),
            webUrl: getShareUrl(),
          }

          // location: buttonTitle(초대장) + 고정 "위치 보기" 2개 버튼
          // feed의 buttons는 링크 도메인이 카카오 앱에 등록되어야 표시됨 (미등록 시 버튼 없음)
          kakao.Share.sendDefault({
            objectType: "location",
            address: LOCATION_ADDRESS,
            addressTitle: LOCATION,
            content: {
              title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
              description:
                WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
              imageUrl: getShareUrl("preview_image.png"),
              link: invitationLink,
            },
            buttonTitle: "초대장 보기",
          })

          // --- feed 템플릿 (버튼 2개 직접 지정, 도메인 등록 필요) ---
          // const mapLink = {
          //   mobileWebUrl: `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
          //   webUrl: `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
          // }
          // kakao.Share.sendDefault({
          //   objectType: "feed",
          //   content: {
          //     title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
          //     description: [
          //       WEDDING_DATE.format(WEDDING_DATE_FORMAT),
          //       LOCATION,
          //       LOCATION_ADDRESS,
          //     ].join("\n"),
          //     imageUrl: getShareUrl("preview_image.png"),
          //     link: invitationLink,
          //   },
          //   buttons: [
          //     { title: "초대장 보기", link: invitationLink },
          //     { title: "위치 보기", link: mapLink },
          //   ],
          // })

          // --- 기존: location + buttons (커스텀 버튼이 무시되고 위치 보기만 보이던 설정) ---
          // kakao.Share.sendDefault({
          //   objectType: "location",
          //   address: LOCATION,
          //   addressTitle: LOCATION,
          //   content: {
          //     title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
          //     description:
          //       WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
          //     imageUrl: getShareUrl("preview_image.png"),
          //     link: invitationLink,
          //   },
          //   buttons: [
          //     {
          //       title: "초대장 보기",
          //       link: invitationLink,
          //     },
          //   ],
          // })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
