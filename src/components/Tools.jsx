import { useEffect, useState } from "react"
import { getTools } from "../api/nookipedia.js";
import { tool, TOOL_USAGE } from "../data/tool.js";
import styled from "styled-components";
import bg from "../image/bgTool.png"
import { LOCAL_MISC } from "../data/misc.js";

export default function Tools() {

    const [tools, setTools] = useState([]);

    useEffect(() => {
        async function fetchTools() {
            const apiTools = await getTools();
            const merged = [...apiTools, ...LOCAL_MISC];

            const toolNames = [...new Set(
                apiTools.map(t => t.name.toLowerCase())
            )];

            // console.log("🛠️ tool names:", toolNames);


            const filtered = merged
                .map((item) => {
                    const local = tool.find(
                        (t) => item.name?.toLowerCase() === t.id
                    );

                    if (!local && item.id !== "wet suit") return null;

                    return {
                        ...item,
                        id: local?.id ?? "wet-suit",
                        label: local?.label ?? "잠수복",

                        // 🔥 좌우로만 기울기 (2D)
                        rotate: Math.random() * 50 - 25,

                        image:
                            item.variations?.[0]?.image_url ||
                            item.image ||
                            "",
                        price:
                            Array.isArray(item.buy)
                                ? item.buy.find(v => v.price)?.price
                                : item.buy?.price ?? null,
                    };
                })
                .filter(Boolean);

            setTools(filtered);
        }

        fetchTools();
    }, []);

    return (
        <ToolsWrapper>
            <ToolsListBox>
                <TitleBox>하나하나 내 손으로 DIY 라이프</TitleBox>

                <ToolsList>
                    {tools.map((tool) => (
                        <CardScene key={tool.name}>
                            <Card $rotate={tool.rotate}>
                                <CardFront>
                                    <img src={tool.variations?.[0]?.image_url || tool.image} />
                                    <p>{tool.label}</p>
                                </CardFront>

                                <CardBack>
                                    <span>구매가 : {tool.price ?? "-"}벨</span>
                                    <span>판매가 : {tool.sell ?? "-"}벨</span>
                                    <span>
                                        용도 : {tool.usage ?? TOOL_USAGE[tool.id] ?? "기타"}
                                    </span>
                                    <img src={tool.variations?.[0]?.image_url || tool.image} />
                                </CardBack>
                            </Card>
                        </CardScene>
                    ))}
                </ToolsList>
            </ToolsListBox>
        </ToolsWrapper>
    );
}

/* ================= styled-components ================= */

const ToolsWrapper = styled.div`
    width: 100%;
    padding: 180px 300px;
    background: url(${bg}) center / cover;
`;

const ToolsListBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 120px 70px;
    gap: 100px;
    background: #40B36C;
    box-shadow: 0 9px 9.6px 6px rgba(0,0,0,.25);
`;

const TitleBox = styled.div`
    padding: 34px 96px;
    border-radius: 118px;
    background: #F7F7F6;
    color: #886239;
    font-weight: 700;
    font-size: 3rem;
`;

const ToolsList = styled.div`
    display: flex;
    gap: 150px;
    flex-wrap: wrap;
    justify-content: center;
`;

/* 카드 무대 */
const CardScene = styled.div`
    perspective: 1000px;
`;

/* 🔥 카드 자체 */
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

    /* 기본 상태: 좌우 기울기 */
    transform: rotateZ(${props => props.$rotate}deg);

    ${CardScene}:hover & {
        transform: rotateZ(0deg) rotateY(180deg) scale(1.3);
    }
`;

/* 카드 앞면 */
const CardFront = styled.div`
    position: absolute;
    inset: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    backface-visibility: hidden;

    img { width: 80%; }

    p {
        padding: 10px 40px;
        font-weight: 700;
        font-size: 1.2rem;
        background: #F9CD04;
        color: #3e3523;
    }
`;

/* 카드 뒷면 */
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
