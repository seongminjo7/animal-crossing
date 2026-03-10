import { useEffect, useState } from "react";
import { getTools } from "../api/nookipedia";
import { TOOL_META, TOOL_CATE_KO } from "../data/toolCategory";
import styled from "styled-components";
import bg from "../image/bgBlue.png"
import Loading from "./Loading";

export default function ToolList() {
  const [selectedCate, setSelectedCate] = useState("fishing");
const [tools, setTools] = useState([]);
const [loading, setLoading] = useState(true);

/* ================= API 최초 로딩 ================= */
useEffect(() => {
  async function fetchTools() {
    setLoading(true); // ⭐ 시작

    const apiTools = await getTools();

    const merged = TOOL_META.map((meta) => {
      const api = apiTools.find(
        (t) => t.name?.toLowerCase() === meta.id
      );

      return {
        ...meta,
        image:
          api?.variations?.[0]?.image_url ||
          api?.image ||
          null,
        buyPrice:
          Array.isArray(api?.buy)
            ? api.buy.find(v => v.price)?.price ?? "-"
            : api?.buy?.price ?? "-",
        sellPrice: api?.sell ?? "-",
      };
    });

    setTools(merged);
    setLoading(false); // ⭐ 끝
  }

  fetchTools();
}, []);

/* ================= 카테고리 변경 시 로딩 ================= */
useEffect(() => {
  if (!tools.length) return;

  setLoading(true);

  const timer = setTimeout(() => {
    setLoading(false);
  }, 200); // UX용 짧은 딜레이

  return () => clearTimeout(timer);
}, [selectedCate]);

/* ================= 필터 ================= */
const filteredTools = tools
  .filter((tool) => tool.category === selectedCate)
  .sort((a, b) => a.label.localeCompare(b.label, "ko"));

  return (
    <ToolListWrapper>
      <Background />

      <CategoryList>
        {Object.entries(TOOL_CATE_KO).map(([key, label]) => (
          <CategoryBtn
            key={key}
            $active={selectedCate === key}
            onClick={() => setSelectedCate(key)}
          >
            {label}
          </CategoryBtn>
        ))}
      </CategoryList>

      <ListWrapper>
        {loading ? (
          <Loading />
        ) : (


          <ToolsList>
            {filteredTools.map((tool) => (
              <CardScene key={tool.id}>
                <Card>
                  <CardFront>
                    {tool.image && (
                      <img src={tool.image} alt={tool.label} />
                    )}
                    <p>{tool.label}</p>
                  </CardFront>

                  <CardBack>
                    <span>구매가 : {tool.buyPrice}벨</span>
                    <span>판매가 : {tool.sellPrice}벨</span>
                    <span>
                      용도 : {TOOL_CATE_KO[tool.category]}
                    </span>
                    {tool.image && (
                      <img src={tool.image} alt={tool.label} />
                    )}
                  </CardBack>
                </Card>
              </CardScene>
            ))}
          </ToolsList>
        )}
      </ListWrapper>

    </ToolListWrapper>
  );
}

// ================= styled-components =================

const ToolListWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 260px 240px 0 240px;
  display: flex;
  flex-direction: column;
`;

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const CategoryList = styled.div`
  position: fixed;
  right: 240px;
  top: 200px;
  display: flex;
  gap: 8px;
  z-index: 5;
`;

const CategoryBtn = styled.button`
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  color: ${props => (props.$active ? "#80353F" : "#fff")};
  background: ${props => (props.$active ? "#FFD966" : "rgba(255,255,255,.3)")};
  font-weight: 700;
`;

/* ⭐ 스크롤은 여기서만 */
const ListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: visible;
  display: flex;
  justify-content: center;

  /* padding-bottom: 220px; ⭐⭐⭐ 여기 */

  /* ===== 스크롤바 디자인 ===== */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.35);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.55);
  }
`;



/* ⭐ 카드 개수 따라 자동 칸 맞추기 */
const ToolsList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(220px, 1fr)
  );
  gap: 120px;

  padding: 60px;

  /* ⭐⭐⭐ 핵심 */
  &::after {
    content: "";
    display: block;
    height: 440px; /* 원하는 하단 여유 */
  }
`;




const CardScene = styled.div`
  perspective: 1000px;

  &:hover {
    z-index: 10;
  }
`;

const Card = styled.div`
  width: 262px;
  height: 370px;
  border-radius: 16px;
  border: 18px solid #FAF9F6;
  background: #E4D9AB;
  box-shadow: 0 12px 30px rgba(0,0,0,.35);

  position: relative;
  transform-style: preserve-3d;
  transition: transform .8s cubic-bezier(.4,.2,.2,1);

  ${CardScene}:hover & {
    transform: rotateY(180deg) scale(1.15);
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
    width: 80%;
  }

  p {
    padding: 10px 40px;
    font-weight: 700;
    font-size: 1.2rem;
    background: #F9CD04;
    color: #3e3523;
    border-radius: 8px;
  }
`;

const CardBack = styled.div`
  position: absolute;
  inset: 0;

  transform: rotateY(180deg);
  backface-visibility: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 30px;

  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: #3e3523;
    z-index: 1;
  }

  img {
    width: 100%;
    position: absolute;
    inset: 50%;
    transform: translate(-50%, -50%);
    opacity: .2;
    z-index: 0;
  }
`;
