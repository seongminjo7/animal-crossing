import styled from "styled-components"
import logo from "../image/intro_logo.png"
import passportTop from "../image/passport_top.png"
import profileImg from "../image/passport_profile.png"
import { useEffect, useState } from "react";

const PassportHeight = 880;
const visibleHeight = 240;

export default function Intro({ onAnimationComplete }) {

const [topPosition, setTopPosition] = useState(-(PassportHeight - visibleHeight));
const [hasTriggered, setHasTriggered] = useState(false);
const [animationFinished, setAnimationFinished] = useState(false);

useEffect(() => {
    const handleWheel = (e) => {
        e.preventDefault(); // 실제 스크롤 막기

        // 첫번째 스크롤 → 애니메이션
        if (!hasTriggered) {
            setHasTriggered(true);
            setTopPosition(0);
            return;
        }

        // 두번째 스크롤 → 다음 페이지
        if (animationFinished && onAnimationComplete) {
            onAnimationComplete();
        }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => window.removeEventListener("wheel", handleWheel);
}, [hasTriggered, animationFinished, onAnimationComplete]);

const handleTransitionEnd = () => {
    setAnimationFinished(true); // 애니메이션 끝났다고 표시
};


    return (
        <IntroWrapper $bgActive={hasTriggered}>
            <Passport $top={topPosition} onTransitionEnd={handleTransitionEnd}>
                <img src={passportTop} alt="" />
                <PassportInner>
                    <Profile>
                        <img src={profileImg} alt="" />
                    </Profile>
                    <PassportText>
                        <TextTop>
                            <p>반가워요!</p>
                        </TextTop>
                        <TextBottom>
                            <p>모여봐요 동물의 숲 정보 사이트 입니다.</p>
                            <p>본 사이트는 Nookipedia의</p>
                            <p>API key를 이용하여 만들었으며</p>
                            <p>웹페이지에(1920px) 적합한 사이트입니다.</p>
                        </TextBottom>
                    </PassportText>
                </PassportInner>
                <Scroll>
                    <div className="scroll">
                        <div className="bar"></div>
                    </div>
                    <p>scroll</p>
                </Scroll>
            </Passport>
            <Logo>
                <img src={logo} alt="" />
            </Logo>
        </IntroWrapper>
    )
}

const IntroWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: ${(props) => (props.$bgActive ? "#D7B396" : "#43C681")};
    transition: background-color 1s ease;
    font-family: var(--sub-font);
`

const Passport = styled.div`
    position: absolute;
    left: 50%;
    top: ${(props) => props.$top}px;
    transform: translateX(-50%);
    width: 1440px;
    border-radius: 0 0 70px 70px;
    background: #FAF7DE;
    box-shadow: 0 8px 8px 1px rgba(0, 0, 0, 0.25);
    z-index: 99;
    display: flex;
    padding: 32px 0 50px 0;
    flex-direction: column;
    align-items: center;
    gap: 50px;
      transition: top 1200ms cubic-bezier(0.22, 1, 0.36, 1); /* 누가 밀어주는 느낌 */
`

const PassportInner = styled.div`
    width: 100%;
    display: flex;
    padding: 36px 155px;
    align-items: center;
    justify-content: center;
    background: #E1EDD9;
    gap: 104px;
`

const Profile = styled.div`
    width: 348px;
    height: 348px;
    border-radius: 56px;
    border: 14px solid #FFF9DF;
    background: #EAEED3;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        height: 100%;
    }
`

const PassportText = styled.div`
    display: flex;
    width: 700px;
    gap: 22px;
    flex-direction: column;
    font-size: 2rem;
`

const TextTop = styled.div`
    color: #9A8B6A;
`

const TextBottom = styled.div`
    display: flex;
    flex-direction: column;
    gap: 22px;
    color: #583905;

    p{
        position: relative;
        padding: 16px 10px;
    }

    p::after{
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;       /* p 전체 길이만큼 밑줄 */
        height: 4px;       /* 밑줄 두께 */
        background: #F9F7DD; /* 밑줄 색상 */
    }
`

const Scroll = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: #D7B396;

    .scroll{
        width: 48px;
        height: 72px;
        border: 6px solid #D7B396;
        border-radius: 23px;
        position: relative;

        .bar{
            position: absolute;
            left: 50%;
            top: 35%;
            transform: translate(-50%,0);
            width: 10px;
            height: 28px;
            border-radius: 5px;
            background: #D7B396;

            animation: scrollMove 2s infinite ease-in-out;
        }
    }

     @keyframes scrollMove {
        0%   { transform: translate(-50%, -50%); }  /* 시작 위치 */
        50%  { transform: translate(-50%, 20%); }  /* 중간 위치 */
        100% { transform: translate(-50%, -50%); }
  }
`

const Logo = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`