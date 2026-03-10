import listImg1 from "../image/life/life01.png"
import listImg2 from "../image/life/life02.png"
import listImg3 from "../image/life/life03.png"
import listImg4 from "../image/life/life04.png"
import subImg1 from "../image/life/lifeSub01.png"
import subImg2 from "../image/life/lifeSub02.png"
import subImg3 from "../image/life/lifeSub03.png"
import subImg4 from "../image/life/lifeSub04.png"
import kong from "../image/life/kong.png"
import bam from "../image/life/bam.png"
import pics1 from "../image/life/lifePics01.png"
import pics2 from "../image/life/lifePics02.png"
import pics3 from "../image/life/lifePics03.png"
import pics4 from "../image/life/lifePics04.png"
import bg1 from "../image/bgImg.png"
import bubble from "../image/speechBubble.png"
import styled, { keyframes } from "styled-components"
import { useEffect, useRef } from "react"

export default function Life() {

    function useReveal() {
        const ref = useRef(null);

        useEffect(() => {
            const el = ref.current;
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        el.classList.add("show");
                        observer.unobserve(el);
                    }
                },
                { threshold: 0.3 }
            );

            observer.observe(el);
            return () => observer.disconnect();
        }, []);

        return ref;
    }


    const imgRef = useReveal();

    return (
        <LifeWrapper>
            <LifeListWrapper>
                <LifeLists>
                    <Top>
                        <TopText><p>모여봐요 동물의 숲에서는 이런 즐거움이</p></TopText>
                    </Top>
                    <List className="odd">
                        <ListImg ref={useReveal()}><img src={listImg1} alt="" /></ListImg>
                        <ListText>
                            <SubImg><img src={subImg1} alt="" /></SubImg>
                            <Text><p>새로운 <span className="red">친구들</span>을 만나고</p></Text>
                        </ListText>
                    </List>
                    <List className="even">
                        <ListImg ref={useReveal()}><img src={listImg2} alt="" /></ListImg>
                        <ListText>
                            <SubImg><img src={subImg2} alt="" /></SubImg>
                            <Text><p>필요한 것은 <span className="blue">스스로</span> 만들어요</p></Text>
                        </ListText>
                    </List>
                    <List className="odd">
                        <ListImg ref={useReveal()}><img src={listImg3} alt="" /></ListImg>
                        <ListText>
                            <SubImg><img src={subImg3} alt="" /></SubImg>
                            <Text><p>할 수 있는 <span className="green">일</span>이 늘어나고</p></Text>
                        </ListText>
                    </List>
                    <List className="even">
                        <ListImg ref={useReveal()}><img src={listImg4} alt="" /></ListImg>
                        <ListText>
                            <SubImg><img src={subImg4} alt="" /></SubImg>
                            <Text><p><span className="pink">모습</span>이 조금씩 바뀌어 가요</p></Text>
                        </ListText>
                    </List>
                </LifeLists>
            </LifeListWrapper>
            <LifePicsWrapper>
                <TextWrapper>
                    <TextBubble> <div className="top"> <p><span className="red">나만의</span> <span className="blue">무인도</span> <span className="orange">생활</span>을</p> </div> <div className="bottom"><p>꾸려보세요.</p></div> </TextBubble>
                    <TextImg>
                        <img src={kong} alt="콩돌이" />
                        <img src={bam} alt="밤돌이" />
                    </TextImg>
                </TextWrapper>
                <LifePics>
                    <PicsTrack>
                        {/* 홀수 짝수 속도 차이 나면 좋을듯 */}
                        <Pics>
                            <li className="odd"><img src={pics1} alt="" /></li>
                            <li className="even"><img src={pics2} alt="" /></li>
                            <li className="odd"><img src={pics3} alt="" /></li>
                            <li className="even"><img src={pics4} alt="" /></li>
                        </Pics>

                        {/* 복제 */}
                        <Pics>
                            <li className="odd"><img src={pics1} alt="" /></li>
                            <li className="even"><img src={pics2} alt="" /></li>
                            <li className="odd"><img src={pics3} alt="" /></li>
                            <li className="even"><img src={pics4} alt="" /></li>
                        </Pics>
                    </PicsTrack>
                </LifePics>
            </LifePicsWrapper>
        </LifeWrapper>
    )
}

const LifeWrapper = styled.div`
    padding-bottom: 80px;
    background-color: #F8F8F0;
`

const Top = styled.div`
    width: 100%;
    padding: 120px 0 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const TopText =styled.div`
    padding: 20px;
    background-image: url(${bubble});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;


    p{
        padding: 80px;
        font-size: 3rem;
        font-weight: 700;
        /* background-color: aliceblue; */
        color: #817056;
    }
`

const LifeListWrapper = styled.div`
    padding: 156px 130px;
    background: url(${bg1}) repeat top left;
`

const LifeLists = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
    list-style: none;
`

const List = styled.li`
    display: flex;
    align-items: flex-end;

    &.even{
        flex-direction: row-reverse;
    }
`
const popIn = keyframes`
    0%{
        transform: scale(0);
        opacity: 0;
    }
    20% {
        transform: scale(0.9);
        opacity: 0;
    }
    60% {
        transform: scale(1.1);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

const ListImg = styled.div`
    opacity: 0;
    transform: scale(0.9);

    &.show {
        opacity: 1;
        transform: scale(1);
        animation: ${popIn} 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
`;



const ListText = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 100px;
    .odd & {
        flex-direction: row-reverse;
        margin-left: -70px;
    }

    .even & {
        margin-right: -70px;
    }
`

const SubImg = styled.div`
    position: absolute;
    bottom: 110px;
`

const Text = styled.div`
    height: fit-content;
    font-size: 3rem;
    color: #817056;
    font-weight: 700;
    padding: 40px 104px;
    border-radius: 160px;
    background: #F8F8F0;
`

const LifePicsWrapper = styled.div`
    position: relative;
    padding: 20px 0;
    background: #F8F8F0;
`

const TextWrapper = styled.div`
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
`

const TextBubble = styled.div`
    padding: 64px 215px;
    font-size: 3.5rem;
    font-weight: 700;
    color: #817056;
    background: url(${bubble}) no-repeat center center;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    .top,
    .bottom {
        display: flex;
        justify-content: center;
    }

    p {
        margin: 0; /* 기본 p margin 제거 */
        text-align: center;
        z-index: 9;
    }
`;


const TextImg = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 115%;
    display: flex;
    justify-content: space-between;
    margin-left: -20px;
`

const moveX = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-2938px); /* 👈 네가 아는 값 */
    }
`;

const LifePics = styled.div`
    width: 100%;
    overflow: hidden;
`;

const PicsTrack = styled.div`
    display: flex;
    gap: 20px;
    animation: ${moveX} 50000ms linear infinite;
    will-change: transform;
`;

const Pics = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;

    width: 2938px;        /* ⭐ 중요: 사이클 길이 */
    flex-shrink: 0;

    li {
        list-style: none;
    }

    li.odd {
        margin-left: -220px;
    }

    img {
        display: block;
        width: 2938px;     /* 네가 아는 값 */
    }
`;
