import React from "react";
import styled from "styled-components";
import nameMap from "../data/villagerNamesKr.json";
import aboutData from "../data/villagerAboutKr.json";
import bg from "../image/bgImg.png"

export default function VillagersAbout({ villager, onClose }) {

    if (!villager) return null;

    // 1) 이름(별도 파일)
    const nameKr = nameMap[villager.name] || villager.name;

    // -----------------------------
    // ★ 2) JSON 키 맞추기 위한 정규화
    // -----------------------------
    const speciesKey = villager.species?.toLowerCase();
    const personalityKey = villager.personality?.toLowerCase();
    const genderKey = villager.gender; // Male / Female (대문자 그대로)

    // -----------------------------
    // ★ 3) JSON에서 데이터 가져오기
    // -----------------------------
    const speciesInfo = aboutData.species[speciesKey] || null;
    const personalityInfo = aboutData.personality[personalityKey] || null;
    const genderInfo = aboutData.gender[genderKey] || null;

    // -----------------------------
    // ★ 4) 생일 (month는 json, day는 API)
    // -----------------------------
    const monthKo = aboutData.birthdayMonth[villager.birthday_month] || "";
    const birthday = `${monthKo} ${villager.birthday_day}일`;



    return (
        <Bg onClick={onClose}>
            <Popup onClick={(e) => e.stopPropagation()}>

                <CloseBtn onClick={onClose} className="clickable">×</CloseBtn>

                <Profile>
                    <div className="imgbox">
                        <img src={villager.image_url} alt="" />
                    </div>
                </Profile>

                <InfoList>

                    <li className="name">
                        <h2>{nameKr}</h2>
                    </li>
                    {/* 종족 */}
                    {speciesInfo && (
                        <li>
                            <img src={speciesInfo.img} alt="" />
                            <p>{speciesInfo.ko}</p>
                        </li>
                    )}

                    {/* 성격 */}
                    {personalityInfo && (
                        <li>
                            <img src={personalityInfo.img} alt="" />
                            <p>{personalityInfo.ko}</p>
                        </li>
                    )}

                    {/* 성별 */}
                    {genderInfo && (
                        <li>
                            <img src={genderInfo.img} alt="" />
                            <p>{genderInfo.ko}</p>
                        </li>
                    )}

                    {/* 생일 */}
                    <li><p>생일: {birthday}</p></li>

                </InfoList>
            </Popup>
        </Bg>
    );
}



/* ---------------- Styled Components ---------------- */

const Bg = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
`;

const Popup = styled.div`
    /* width: 420px; */
    /* background: #FFFAE4; */
    /* background: url(${bg}) center center cover; */
      background-image: url(${bg});
      background-position: center center;
      background-size: cover;
    padding: 80px 120px;
    border-radius: 30px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 150px;
`;

const CloseBtn = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 3rem;
    cursor: pointer;
    color: #5A3900;
    padding: 16px;
`;

const Profile = styled.div`
    text-align: center;
    img {
        width: 300px;
    }
    h2 {
        font-size: 1.8rem;
        color: #5A3900;
    }
`;

const InfoList = styled.ul`
    width: 300px;
    /* margin-top: 30px; */
    display: flex;
    flex-direction: column;
    gap: 40px;
    list-style: none;

    li {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
        color: #5A3900;
        /* font-family: var(--sub-font); */
        font-weight: 700;
        font-size: 2rem;

            img {
                border-radius: 50%;
                padding: 6px;
                width: 65px; 
                background-color: rgba(0,0,0,.5);
            }
    }

    li.name{
        padding: 0;
        align-self: flex-start;
        position: relative;

        h2:after{
            content: "";
            height: 10px;
            width: 100%;
            background-color: #FECE16;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }
`;
