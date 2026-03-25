import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ResolutionOverlay = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const minWidth = 1820;
            if (window.innerWidth < minWidth) {
                setIsVisible(true);
                // 스크롤 및 터치 원천 봉쇄
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none';
            } else {
                setIsVisible(false);
                // 복구
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
            }
        };

        handleResize(); // 초기 실행
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, []);

    if (!isVisible) return null;

    return (
        <OverlayContainer>
            <Title>지원하지 않는 해상도입니다</Title>
            <Description>
                본 사이트는 가로 1820px 이상의 환경에서 최적화된 경험을 제공합니다. <br></br>
                브라우저 창을 넓히거나 더 큰 화면을 이용해 주세요.
            </Description>
        </OverlayContainer>
    );
};

export default ResolutionOverlay;

// --- Styled Components ---

const OverlayContainer = styled.div`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100dvh !important; /* 가변 뷰포트 대응 */
  background-color: #FAF7DE;
  color: #80353F;
  z-index: 9999999 !important;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  overflow: hidden !important;
  touch-action: none !important;
  
  /* 전역 폰트가 설정되어 있지 않을 경우 대비 */
  font-family: var(--main-font);
`;

const Title = styled.h1`
  font-size: clamp(24px, 8vw, 50px);
  font-weight: bold;
  margin-bottom: 20px;
  max-width: 90%;
  
  /* 단어 단위 줄바꿈 핵심 설정 */
  word-break: keep-all;
  white-space: normal;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: clamp(16px, 5vw, 30px);
  color: #E56361;
  font-weight: bold;
  line-height: 1.6;
  max-width: 85%;
  margin: 0 auto;
  
  /* 단어 단위 줄바꿈 핵심 설정 */
  word-break: keep-all;
  white-space: normal;
`;