import styled from "styled-components";
import { season } from "../data/season.jsx";
import bg from "../image/bgWhite.png";
import { useEffect, useRef, useState } from "react";

const ANIMATION_DURATION = 700;

export default function Season({ onGoLife }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isAnimating = useRef(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const onWheel = (e) => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();

            // 🔑 화면을 완전히 덮었을 때만 (위/아래 공통)
            const isFullyCovered =
                rect.top <= 0 && rect.bottom >= window.innerHeight;

            if (!isFullyCovered) return;

            // 처음 / 마지막이면 스크롤 풀어줌
            if (
                (currentIndex === 0 && e.deltaY < 0) ||
                (currentIndex === season.length - 1 && e.deltaY > 0)
            ) {
                return;
            }

            e.preventDefault();
            if (isAnimating.current) return;

            isAnimating.current = true;

            setCurrentIndex((prev) =>
                e.deltaY > 0
                    ? Math.min(prev + 1, season.length - 1)
                    : Math.max(prev - 1, 0)
            );

            setTimeout(() => {
                isAnimating.current = false;
            }, ANIMATION_DURATION);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, [currentIndex]);


    const current = season[currentIndex];

    return (
        <SeasonWrapper ref={sectionRef}>
            <Background />

            {/* <Stage> */}
                <SeasonBox>
                    <SeasonList>
                        <ListLeft>
                            <SeasonAbout>
                                <TextMotion key={current.id}>
                                    <h3>&lt; {current.title} &gt;</h3>
                                    <p>{current.about1}</p>
                                    <p>{current.about2}</p>
                                    <p>{current.about3}</p>
                                </TextMotion>
                            </SeasonAbout>

                            <MoreBtn onClick={onGoLife}>
                                무인도 생활 더 알아보기
                            </MoreBtn>
                        </ListLeft>

                        <ListRight>
                            <ImageBox key={current.id} $index={currentIndex}>
                                <img
                                    src={current.image}
                                    alt={current.title}
                                />
                            </ImageBox>
                        </ListRight>
                    </SeasonList>
                </SeasonBox>
            {/* </Stage> */}
        </SeasonWrapper>
    );
}

/* ================== STYLES ================== */

const SeasonWrapper = styled.section`
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    isolation: isolate;
    padding: 180px 120px 0 120px;
`;



const Background = styled.div`
    position: absolute;
    inset: 0;
    background-image: url(${bg});
    background-size: cover;
    background-position: center;
    z-index: -1;
`;



// const Stage = styled.div`
//     padding-top: 140px;
//     /* height: 100%; */
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;

const SeasonBox = styled.div`
    padding: 40px;
    border-radius: 40px;
    background: #9cb28e;
`;

const SeasonList = styled.div`
    padding: 80px 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
    background: #dcaa79;
    box-shadow: inset 0 4px 25.2px 8px rgba(0, 0, 0, 0.25);
`;

const ListLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 34px;
`;

const SeasonAbout = styled.div`
    width: 494px;
    height: 420px;
    border-radius: 30px;
    background: #fff;
    box-shadow: 7px 7px 9.2px rgba(0, 0, 0, 0.25);
    color: #817056;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TextMotion = styled.div`
    animation: textUp 0.6s ease forwards;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;

    @keyframes textUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    h3 {
        font-size: 2.3rem;
    }

    p {
        font-size: 2rem;
        font-weight: 700;
    }
`;

const MoreBtn = styled.button`
    width: 100%;
    border-radius: 30px;
    background: #e1edd9;
    box-shadow: 7px 7px 9.2px rgba(0, 0, 0, 0.25);
    color: #817056;
    font-family: var(--sub-font);
    font-size: 1.5rem;

    &:hover {
        background: #fcec9e;
    }
`;

const ListRight = styled.div``;

const ImageBox = styled.div`
    padding: 20px;
    background: #fff;
    box-shadow: 8px 11px 10.8px rgba(0, 0, 0, 0.25);

    animation: ${({ $index }) =>
        $index % 2 === 0 ? "imageUpLeft" : "imageUpRight"}
        0.8s ease forwards;

    @keyframes imageUpLeft {
        from {
            opacity: 0;
            transform: translateY(160px) rotate(-10deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotate(-5deg);
        }
    }

    @keyframes imageUpRight {
        from {
            opacity: 0;
            transform: translateY(160px) rotate(10deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotate(5deg);
        }
    }

    img {
        width: 705px;
        height: 474px;
        display: block;
    }

    &:hover {
        transform: rotate(0deg);
    }
`;
