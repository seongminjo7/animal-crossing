import React, { useState, useEffect } from "react";
import { getVillagers } from "../api/nookipedia";
import styled from "styled-components";
import textImg from "../image/villager_text.png"
import backImg from "../image/villiger_background.png"
import nameMap from "../data/villagerNamesKr.json"
import moreBtn from "../image/villager_more.png"
import VillagersAbout from "./VillagersAbout";
// import { useNavigate } from "react-router-dom";

export default function VillagerRandom({ onGoList }) {

    // const navigate = useNavigate();

    const [activeBtn, setActiveBtn] = useState("this")

    const [villager, setVillager] = useState(() => {
        // 초기값을 랜덤으로 한 번만 선택
        const data = JSON.parse(localStorage.getItem("villagers")) || [];
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        }
        return null;
    });

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!villager) {
                const data = await getVillagers();
                localStorage.setItem("villagers", JSON.stringify(data));
                if (data.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setVillager(data[randomIndex]);
                }
            }
        };
        fetchData();
    }, [villager]);

    const villagerKr = villager ? nameMap[villager.name] || villager.name : "";

    return (
        <VillagerHome>
            <VillagerWrapper>
                <VillagerImg>
                    <img src={villager?.image_url} alt={villager?.name} />
                </VillagerImg>
                <VillagerText>
                    <VillagerName>
                        <p>{villagerKr}</p>
                    </VillagerName>
                    <TextBubble>
                        <p>안녕! 내 이름은 <span>{villagerKr}</span>(이)야</p>
                        <p>나에 대해 더 알아보고 싶니?</p>
                    </TextBubble>
                    <VillagerMore>
                        <li
                            className={`openThisVillager ${activeBtn === "this" ? "on" : ""} clickable`}
                            onMouseEnter={() => setActiveBtn("this")}
                            onClick={() => setShowPopup(true)}
                        >
                            <img src={moreBtn} alt="" />
                            <p>좋아!</p>
                        </li>

                        <li
                            className={`openMoreVillager ${activeBtn === "more" ? "on" : ""} clickable`}
                            onMouseEnter={() => setActiveBtn("more")}
                            onClick={onGoList}
                        >
                            <img src={moreBtn} alt="" />
                            <p>다른 친구들을 알아볼래!</p>
                        </li>
                    </VillagerMore>
                </VillagerText>
            </VillagerWrapper>

            {showPopup && (
                <VillagersAbout
                    villager={villager}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </VillagerHome>
    );
}

const VillagerHome = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    padding-bottom: 80px;
    background: url(${backImg}) no-repeat center center;
    background-size: cover;
`

const VillagerWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 44px;
`

const VillagerImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    img {
        height: 580px;
        object-fit: cover;
    }

    h2 {
        font-size: 1.5rem;
        color: #333;
    }
`;

const VillagerText = styled.div`
    width: 1008px;
    height: 343px;
    position: relative;
`

const VillagerName = styled.div`
    position: absolute;
    left: 37px;
    top: 40px;
    font-family: var(--sub-font);
    padding: 20px 24px;
    border-radius: 79px;
    background: #80353F;
    font-size: 1.6rem;
    width: fit-content;
    z-index: 1;
`

const TextBubble = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 912px;
    height: 254px;
    background: url(${textImg}) no-repeat;
    background-size: contain;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding-left: 142px;
    flex-direction: column;
    font-size: 2rem;
    font-weight: 700;
    color: #807A64;

    span{
        color: #0BAFBB;
    }
`

const VillagerMore = styled.ul`
    position: absolute;
    right: 0;
    top: 0;
    width: fit-content;
    padding: 30px 62px 30px 50px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: var(--sub-font);
    font-size: 1.5rem;
    color: #786847;
    border-radius: 79px;
    background: #FCEC9E;
    z-index: 1;

    li{
        width: fit-content;
        display: flex;
        align-items: center;
        gap: 8px;
        
        img{
            width: 36px;
            height: 28px;
            opacity: 0;
        }

        p{
            position: relative;
            z-index: 1;
        }
    }

    li.on{

        p::after{
            content: "";
            position: absolute;
            display: block;
            height: 18px;
            width: 100%;
            background-color: #FECE16;
            bottom: -4px;
            z-index: -1;
        }

        img{
            opacity: 1;
        }
    }
`