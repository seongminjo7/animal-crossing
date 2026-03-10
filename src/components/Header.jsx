import styled from "styled-components"
import logo from "../image/logo.png"

export default function Header({ onGoHome, onGoVillagers, onGoTools, onGoLife, onGoMaterials}) {
    return (
        <HeaderWrapper>
            <Logo onClick={onGoHome} className="clickable">
                <img src={logo} alt="로고" /></Logo>
            <Gnb>
                <li onClick={onGoVillagers} className="clickable"><p>무인도 주민들</p></li>
                <li onClick={onGoLife} className="clickable"><p>무인도 생활</p></li>
                <li onClick={onGoTools} className="clickable"><p>도구들</p></li>
                <li onClick={onGoMaterials} className="clickable"><p>제작 재료</p></li>
            </Gnb>
            <BuyBtn>
                <a href="https://www.nintendo.com/kr/switch/acbaa/products/soft.html" target='_blank'>구매하기</a>
            </BuyBtn>
        </HeaderWrapper>
    )
};

const HeaderWrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    /* height: 168px; */
    padding: 40px 150px 0 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
`

const Logo = styled.div``

const Gnb = styled.ul`
    display: flex;
    height: fit-content;
    padding: 18px 104px;
    border-radius: 50px;
    background: #FBEBBA;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
    gap: 40px;

    li{
        padding: 8px 30px;
        display: flex;
        align-items: center;
        font-family: var(--sub-font);
        font-size: 1.3rem;
        color: #80353F;
        height: fit-content;
        transition: 800ms;
        border-radius: 40px;

    
    &:hover{
        background: #fff;
    }
    }


`

const BuyBtn = styled.div`
    display: flex;
    height: fit-content;
    align-items: center;

    border-radius: 30px;
    background: #EC7175;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);

    a{
        padding: 13px 33px;
        display: block;
        font-size: 1.2rem;
        font-family: var(--sub-font);
        color: #fff;
    }
`   