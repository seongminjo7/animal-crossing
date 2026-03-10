import styled from "styled-components"
import bg from "../image/footerPatarn.png"

export default function Footer() {
    return (
        <FooterWrapper>
            <FooterTopImg>
                <img src={bg} alt="" />
            </FooterTopImg>
            <FooterBottom>
                <p>이 사이트는 상업적 용도가 아닌 포트폴리오 목적으로만 사용됩니다.</p>
            </FooterBottom>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
    width: 100%;
    padding-top: 10px;
    margin-top: -80px;
    z-index: 9999;
`

const FooterTopImg = styled.div`
    width: 100%;
    margin-bottom: -12px;

    img{
        width: 100%;
    }
`

const FooterBottom = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #46AA6B;

    p{
        font-family: var(--sub-font);
        font-size: 1.2rem;
    }
`