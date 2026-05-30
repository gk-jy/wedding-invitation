import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도와 대중교통, 자가용 이용 방법을 안내합니다.
 *
 * @returns {JSX.Element} 오시는 길 섹션
 */
export const Location = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      {/* 대중교통 및 자가용 안내 섹션 */}
      <LazyDiv className="card location">
        {/* 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">지하철</div>
          <div />
          <div className="content">
            3호선/신분당선 <b>양재역 9번출구</b> 바로 연결
          </div>
        </div>

        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">버스</div>
          <div />
          <div className="content">
            <b>양재역, 서초문화예술회관</b>에서 하차
            <br />
            - 지선
            <div className="bus-group">0411, 4432, 4435</div>
            <br />
            - 간선 / 일반
            <div className="bus-group">140, 341, 400, 405, 421, 440, 441, 452, 470, 542, 741, 917</div>
            <br />
            - 광역
            <div className="bus-group">9404, 9408, 9409, 9711, M4403, M4434, M4448, M4449, M5438, M6450, M6458</div>
            <br />
            - 직행
            <div className="bus-group">1005, 1101, 1151, 1550-1, 1551, 1552, 3030, 3401, 4403, 5001-1, 5001, 5002, 5003, 5006, 5100, 5401, 6001, 6002, 6002-1, 6004, 6501, 6600, 8501, 8502, 9004, 9202, G5100, 1560</div>
          </div>
        </div>

        {/* 자가용 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            엘블레스 옆 <b>양재역 양재 주차 빌딩</b> 이용
            <br />
            양재역 주차장에 주차하신 후 바로 옆 건물 <br /><b>스포타임</b>으로 이동하시면 됩니다.
            <br />
            (지하 1층에 엘블레스가 위치하고 있습니다.)
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
