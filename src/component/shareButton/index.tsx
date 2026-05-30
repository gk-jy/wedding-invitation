import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  KMAP_PLACE_ID,
  LOCATION,
  LOCATION_ADDRESS,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

const baseUrl = import.meta.env.BASE_URL

const getShareUrl = () =>
  window.location.protocol + "//" + window.location.host + baseUrl

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

          const shareUrl = getShareUrl()
          const invitationLink = { mobileWebUrl: shareUrl, webUrl: shareUrl }
          const mapUrl = `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`
          const locationLink = { mobileWebUrl: mapUrl, webUrl: mapUrl }

          // feed 템플릿: buttons 최대 2개 (location 템플릿은 위치 보기 버튼이 고정·커스텀 불가)
          kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
              description: [
                WEDDING_DATE.format(WEDDING_DATE_FORMAT),
                LOCATION,
                LOCATION_ADDRESS,
              ].join("\n"),
              imageUrl: shareUrl + "preview_image.png",
              link: invitationLink,
            },
            buttons: [
              { title: "초대장 보기", link: invitationLink },
              { title: "위치 보기", link: locationLink },
            ],
          })

          // --- 기존: location 템플릿 (위치 보기 버튼 고정, buttons 커스텀 불가) ---
          // kakao.Share.sendDefault({
          //   objectType: "location",
          //   address: LOCATION,
          //   addressTitle: LOCATION,
          //   content: {
          //     title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
          //     description:
          //       WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
          //     imageUrl: shareUrl + "preview_image.png",
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
