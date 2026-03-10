import { useEffect, useState } from "react";
import materialGroups from "../data/materialGroups.json";
import { getMaterials } from "../api/nookipedia";
import { groupMaterials } from "../utils/materialUtils";
import bg from "../image/bgBrown2.png"
import styled from "styled-components";

/* =========================================================
   ✅ 메인 페이지에 보여줄 "고정 아이템 name"
   👉 item.name 값 그대로 사용
========================================================= */
const FIXED_ITEM_NAMES = [
  "tree branch",
  "wood",
  "clump of weeds",
  "stone",
  "iron nugget",
  "pearl",
  "star fragment"
];

export default function Material() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function init() {
      /* 전체 재료 */
      const data = await getMaterials();

      /* koName, 가격 정보 포함된 그룹 구조 */
      const grouped = groupMaterials(data);

      /* 🔥 고정 name 기준으로만 아이템 선택 */
      const result = FIXED_ITEM_NAMES
        .map(name =>
          grouped
            .flatMap(group => group.items)
            .find(item => item.name === name)
        )
        .filter(Boolean);

      setItems(result);
    }

    init();
  }, []);

  return (
    <MaterialWrapper>
      <Background />

      <MaterialListBox>
        <TitleBox>다양한 DIY 재료들</TitleBox>

        <CardWrapper>
          {items.map(item => (
            <CardScene key={item.name}>
              <Card>
                <CardFront>
                  {item.image && (
                    <img src={item.image} alt={item.koName} />
                  )}
                  <p>{item.koName}</p>
                </CardFront>

                <CardBack>
                  <span>판매가 : {item.sellPrice}벨</span>
                  <span>
                    구매가 : {item.buyPrice
                      ? `${item.buyPrice}벨`
                      : "-"}
                  </span>

                  {item.image && (
                    <img src={item.image} alt={item.koName} />
                  )}
                </CardBack>
              </Card>
            </CardScene>
          ))}
        </CardWrapper>
      </MaterialListBox>
    </MaterialWrapper>
  );
}

const MaterialWrapper = styled.div`
    height: 100vh;
    width: 100%;
    padding: 180px 80px 120px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Background = styled.div`
  position: fixed;
  inset: 0;
background: url(${bg}) center repeat;

  z-index: -1;
`;

const MaterialListBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* gap: 60px; */
  background: #FFF6E5;
  box-shadow: 0 9px 9.6px 6px rgba(0,0,0,.25);
`;

const TitleBox = styled.div`
    width: fit-content;
    padding: 34px 96px;
    border-radius: 118px;
    background: #F0E2C6;
    color: #886239;
    font-weight: 700;
    font-size: 3rem;
`;

const CardWrapper = styled.div`
  width: 100%;
  padding: 40px;

display: flex;
flex-wrap: wrap;
  gap: 60px;

  justify-content: center; /* 전체 중앙 정렬 */
`;


const CardScene = styled.div`
  perspective: 1000px;
  
  &:hover {
    z-index: 10;
  }
`;

const Card = styled.div`
  width: 171px;
  height: 242px;
  border-radius: 16px;
  border: 10px solid #FAF9F6;
  background: #49C5BB;
  box-shadow: 0 12px 30px rgba(0,0,0,.35);

  position: relative;
  transform-style: preserve-3d;
  transition: transform .8s cubic-bezier(.4,.2,.2,1);

  ${CardScene}:hover & {
    transform: rotateY(180deg) scale(1.12);
  }
`;

const CardFront = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  backface-visibility: hidden;

  img {
    width: 70%;
  }

  p {
    padding: 10px 28px;
    font-weight: 800;
    font-size: 1rem;
    background: #F9CD04;
    color: #3e3523;
  }
`;

const CardBack = styled.div`
  position: absolute;
  inset: 0;

  transform: rotateY(180deg);
  backface-visibility: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  padding: 0 15px;

  span {
    font-size: 1rem;
    font-weight: 800;
    color: #3e3523;
    z-index: 1;
  }

  img {
    width: 100%;
    position: absolute;
    inset: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.2;
    z-index: 0;
  }
`;
