import styled from "styled-components"

export default function Loading({ text = "불러오는중..." }) {
    return <Wrapper>{text}</Wrapper>
}

const Wrapper = styled.div`
    margin-top: 120px;
    width: 100%;
    text-align: center;

    font-size: 1.6rem;
    font-weight: 700;
    color: #3e3523;
    opacity: 0.85;

    animation: blink 1.4s infinite ease-in-out;

    @keyframes blink {
      0% { opacity: 0.3; }
      50% { opacity: 1; }
      100% { opacity: 0.3; }
    }
`