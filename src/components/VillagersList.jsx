import nameMap from "../data/villagerNamesKr.json";
import aboutData from "../data/villagerAboutKr.json";
import VillagersAbout from "./VillagersAbout";
import { useEffect, useMemo, useState, useRef } from "react";
import styled from "styled-components";
import bg from "../image/cardBg.png";


// ㄱ ~ ㅎ 필터 맵 생성
const CHOSUNG_LIST = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ",
  "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ",
  "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

const HANGUL_START = 0xac00; // '가'
const HANGUL_END = 0xd7a3;   // '힣'

function getChosung(char) {
  const code = char.charCodeAt(0);
  if (code < HANGUL_START || code > HANGUL_END) return null;
  const index = Math.floor((code - HANGUL_START) / (21 * 28));
  return CHOSUNG_LIST[index];
}

// INITIAL_MAP 생성 (필요한 초성만 넣음)
const INITIAL_MAP = {};
["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"].forEach(ch => {
  INITIAL_MAP[ch] = [];
});

// nameMap 기준으로 실제 이름의 초성에 따라 분류
Object.values(nameMap).forEach(name => {
  const cho = getChosung(name[0]);
  if (INITIAL_MAP[cho]) {
    INITIAL_MAP[cho].push(name);
  }
});

export default function VillagersList() {

  const [villagers, setVillagers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("villagers")) || [];
    setVillagers(data);
  }, []);

  const [selectedVillager, setSelectedVillager] = useState(null);

  const [speciesOpen, setSpeciesOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState("all");

  const [selectedInitial, setSelectedInitial] = useState("all");
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);

  // 드롭다운 바깥 클릭 닫기
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSpeciesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const sortedSpecies = Object.entries(aboutData.species).sort((a, b) => {
    return a[1].ko.localeCompare(b[1].ko, "ko"); // 한글 기준 정렬
  });

  // 필터
  const filteredVillagers = useMemo(() => {
    return villagers
      .filter(v => {
        const nameKr = nameMap[v.name] || v.name;

        // 검색 필터
        if (search && !nameKr.includes(search)) return false;

        // 종족 필터
        if (selectedSpecies !== "all") {
          const villagerSpeciesKey = v.species.toLowerCase().replace(/_/g, " ");
          const selectedSpeciesKey = selectedSpecies.toLowerCase().replace(/_/g, " ");
          if (villagerSpeciesKey !== selectedSpeciesKey) return false;
        }

        // 초성 필터
        if (selectedInitial !== "all") {
          const initials = INITIAL_MAP[selectedInitial];
          if (!initials?.some(i => nameKr.startsWith(i))) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const nameA = nameMap[a.name] || a.name;
        const nameB = nameMap[b.name] || b.name;
        return nameA.localeCompare(nameB, "ko"); // 한글 기준 정렬
      });
  }, [villagers, selectedSpecies, selectedInitial, search]);



  const selectedSpeciesInfo =
    selectedSpecies === "all"
      ? null
      : aboutData.species[selectedSpecies];


  return (

    <ListWrapper>
      {/* ================= 필터 영역 ================= */}
      <FilterWrap>

        {/* 종족 커스텀 드롭다운 */}
        <SpeciesDropdown ref={dropdownRef}>
          <SpeciesButton onClick={() => setSpeciesOpen(o => !o)}>
            {selectedSpeciesInfo ? (
              <>
                <img src={selectedSpeciesInfo.img} alt="" />
                <span>{selectedSpeciesInfo.ko}</span>
              </>
            ) : (
              <span>전체 종족</span>
            )}
            <Arrow $open={speciesOpen}>▾</Arrow>
          </SpeciesButton>

          {speciesOpen && (
            <SpeciesList>
              <SpeciesItem onClick={() => {
                setSelectedSpecies("all");
                setSpeciesOpen(false);
              }}>
                전체 종족
              </SpeciesItem>

              {sortedSpecies.map(([key, value]) => (
                <SpeciesItem
                  key={key}
                  onClick={() => {
                    setSelectedSpecies(key);
                    setSpeciesOpen(false);
                  }}
                >
                  <img src={value.img} alt="" />
                  <span>{value.ko}</span>
                </SpeciesItem>
              ))}
            </SpeciesList>

          )}
        </SpeciesDropdown>

        {/* 이름 검색 */}
        <SearchInput
          placeholder="이름 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </FilterWrap>

      {/* ㄱㄴㄷ 필터 */}
      <InitialRow>
        <button onClick={() => setSelectedInitial("all")}>전체</button>
        {Object.keys(INITIAL_MAP).map(k => (
          <button key={k} onClick={() => setSelectedInitial(k)}>
            {k}
          </button>
        ))}
      </InitialRow>

      {/* ================= 카드 리스트 ================= */}
      <CardGrid>
        {filteredVillagers.map(v => {
          const nameKr = nameMap[v.name] || v.name;

          // ← 여기 수정
          const speciesKey = v.species.toLowerCase().replace(/_/g, " ");
          const species = aboutData.species[speciesKey];

          const gender = aboutData.gender[v.gender];

          return (
            <Card className="clickable" key={v.name} onClick={() => setSelectedVillager(v)}>
              <div className="imgBox">
                <img src={v.image_url} alt={nameKr} />
              </div>

              <IconRow>
                <p>{nameKr}</p>
                {species && <img src={species.img} alt="" className="spe" />}
                {gender && <img src={gender.img} alt="" className="gen" />}
              </IconRow>

              <Bg></Bg>
            </Card>
          );
        })}
      </CardGrid>


      {/* ================= 팝업 ================= */}
      {selectedVillager && (
        <VillagersAbout
          villager={selectedVillager}
          onClose={() => setSelectedVillager(null)}
        />
      )}
    </ListWrapper>

  );
}

/* ================= styled-components ================= */

const ListWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 168px 10% 100px 10%;
  display: flex;
  flex-direction: column;
  background: #D7B396;
  min-height: 100vh;
`

const FilterWrap = styled.div`
  position: fixed;
  top: 160px;
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
  align-self: flex-end;
  z-index: 9999;

`;

const SpeciesDropdown = styled.div`
  position: relative;
  width: 180px;
`;

const SpeciesButton = styled.button`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  background: #43C681;
  border-radius: 12px;
  border: 2px solid #e0c97f;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 8px;
  cursor: pointer;
  color: #80353F;

  img {
    width: 24px;
  }

  span {
    /* flex: 1; */
    text-align: left;
  }
`;

const Arrow = styled.span`
  position: absolute;
  right: 20px;
  transition: 0.2s;
`;

const SpeciesList = styled.ul`
  position: absolute;
  top: 52px;
  width: 100%;
  background: #43C681;
  border-radius: 12px;
  border: 2px solid #e0c97f;
  max-height: 280px;
  overflow-y: auto;
  z-index: 9999;
`;

const SpeciesItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  color: #80353F;

  img {
    width: 22px;
  }

  &:hover {
    background: #fff1b8;
  }
`;

const SearchInput = styled.input`
  height: 44px;
  padding: 0 12px;
  border-radius: 12px;
  border: 2px solid #e0c97f;
`;

const InitialRow = styled.div`
  position: fixed;
  top: 230px;
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
  align-self: flex-end;
  z-index: 0;

  button {
    padding: 6px 10px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: #FAF7DE;
    color: #80353F;
    font-size: 1.2rem;

    &:hover {
      background: #ffd966;
    }
  }
`;

const CardGrid = styled.div`
  /* display: grid; */
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, 180px);
  margin-top: 120px;
  column-gap: 60px;
  row-gap: 20px;
  height: fit-content;
  overflow-y: scroll;
`;

const Card = styled.div`
position: relative;
  /* background: #FAF7DE; */
  border-radius: 16px;
  padding: 30px;
  cursor: pointer;
  text-align: center;
  color: #80353F;
  font-size: 1.5rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .imgBox{
  z-index: 1;

    width: 200px;
      img {
    /* width: 64px; */
      height: 160px;
      }
  }

`;

const IconRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-left: 40px;
  z-index: 1;

  p{
    font-size: 1.5rem;
    font-weight: 700;
    padding-top: 2px;
  }

  img {
    width: 20px;
    height: fit-content;
  }

  img.spe{
    width: 30px;
    background-color: #80353F;
    border-radius: 50%;
    padding: 2px;
  }
`;

const Bg = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 200px;
  /* background: #FAF7DE; */
  background-image: url(${bg});
  background-position: center center;
  background-size: cover;
  border-radius: 30px;
`