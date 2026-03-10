import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMaterials } from "../api/nookipedia";
import { groupMaterials } from "../utils/materialUtils";
import bg from "../image/bgBrown.png";
import Loading from "./Loading";
import { SHELL_IMAGE_MAP } from "../data/shellImg";

export default function Materials() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== 최초 로딩 ===== */
  useEffect(() => {
    async function fetchMaterials() {
      setLoading(true);
      const data = await getMaterials();
      const grouped = groupMaterials(data);
      setGroups(grouped);
      setSelectedGroup(grouped[0]?.groupName ?? null);
      setLoading(false);
    }

    fetchMaterials();
  }, []);

  /* ===== 카테고리 변경 시 로딩 ===== */
  useEffect(() => {
    if (!groups.length) return;

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedGroup]);

  const filteredGroups = selectedGroup
    ? groups.filter(g => g.groupName === selectedGroup)
    : groups;



  return (
    <MaterialsWrapper>
      <Background />

      {/* ===== 카테고리 버튼 ===== */}
      <CategoryList>
        {groups.map(group => (
          <CategoryBtn
            key={group.groupName}
            $active={selectedGroup === group.groupName}
            onClick={() => setSelectedGroup(group.groupName)}
          >
            {group.groupName}
          </CategoryBtn>
        ))}
      </CategoryList>

      {loading ? (
        <Loading />
      ) : (
        <ScrollArea>
          {filteredGroups.map(group => (
            <Section key={group.groupName}>

              <MaterialsGrid>
                {group.items.map(item => {
                  const imageSrc =
                    SHELL_IMAGE_MAP[item.name.toLowerCase()] ??
                    item.image ?? // API 이미지
                    null;

                  return (
                    <CardScene key={item.name}>
                      <Card>
                        <CardFront>
                          {imageSrc && (
                            <img src={imageSrc} alt={item.koName} />
                          )}
                          <p>{item.koName}</p>
                        </CardFront>

                        <CardBack>
                          <span>판매가 : {item.sellPrice}벨</span>
                          <span>
                            구매가 : {item.buyPrice ? `${item.buyPrice}벨` : "-"}
                          </span>

                          {imageSrc && (
                            <img src={imageSrc} alt={item.koName} />
                          )}
                        </CardBack>
                      </Card>
                    </CardScene>
                  );
                })}

              </MaterialsGrid>
            </Section>
          ))}
        </ScrollArea>
      )}
    </MaterialsWrapper>
  );
}


const MaterialsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 240px 200px 80px 200px;
  display: flex;
  flex-direction: column;
`;

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(${bg});
  background-repeat: repeat;
  background-size: 300px 300px; /* 원하는 타일 크기 */
  background-position: top left;
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
  background: ${props =>
    props.$active ? "#FFD966" : "rgba(255,255,255,.3)"};

  font-weight: 700;
  white-space: nowrap;
`;


const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  /* padding-bottom: 300px; */

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.35);
    border-radius: 10px;
  }
`;

const Section = styled.section`
  margin-bottom: 180px;
`;

const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 120px;
  padding: 40px;
`;

/* ===== 카드 ===== */

const CardScene = styled.div`
  perspective: 1000px;

  &:hover {
    z-index: 10;
  }
`;

const Card = styled.div`
  width: 262px;
  height: 360px;
  border-radius: 16px;
  border: 18px solid #FAF9F6;
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
    width: 80%;
  }

  p {
    padding: 10px 36px;
    font-weight: 800;
    font-size: 1.2rem;
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
  padding: 0 30px;

  span {
    font-size: 1.4rem;
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
