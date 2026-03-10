import springImg from "../image/season/spring.jpg"
import summerImg from "../image/season/summer.jpg"
import fallImg from "../image/season/fall.jpg"
import winterImg from "../image/season/winter.jpg"

export const season = [
    {
        id: "Spring",
        title: "봄",
        image: springImg,
        about1: (
            <>
                흩날리는 <span className="pink">벚꽃잎</span>을 모으고
            </>
        ),
        about2: (
            <>
                봄의 <span className="green">대나무</span>를 채집해요
            </>
        ),
        about3: "따스한 봄을 만끽해요",
    },
    {
        id: "Summer",
        title: "여름",
        image: summerImg,
        about1: (
            <>
                <span className="blue">여름 조개껍데기</span>를 모으고
            </>
        ),
        about2: (
            <>
                <span className="green">곤충</span>을 채집하고
            </>
        ),
        about3: "시원한 여름을 보내요",
    },
    {
        id: "Fall",
        title: "가을",
        image: fallImg,
        about1: (
            <>
                <span className="orange">버섯</span>을 채집하고
            </>
        ),
        about2: (
            <>
                <span className="orange">도토리</span>와 <span className="orange">솔방울</span>을 모아서
            </>
        ),
        about3: "풍요로운 가을을 만끽해요",
    },
    {
        id: "Winter",
        title: "겨울",
        image: winterImg,
        about1: (
            <>
                눈덩이를 굴려 <span className="blue">눈사람</span>을 만들고
            </>
        ),
        about2: (
            <>
                <span className="blue">눈송이</span>를 채집해요
            </>
        ),
        about3: "따뜻한 겨울을 보내요",
    },
]