import styled from "styled-components";

export default function TransitionCircle({ phase }) {
  return <Overlay data-phase={phase} />;
}

/*
phase:
"idle"     : 안 보임
"closing"  : 원이 작아짐
"opening"  : 원이 커짐
*/
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #2e2e2e;
  pointer-events: none;
  z-index: 9999;

  opacity: ${({ "data-phase": phase }) =>
    phase === "idle" ? 0 : 1};

  clip-path: circle(
    ${({ "data-phase": phase }) =>
      phase === "closing"
        ? "0%"
        : phase === "opening"
        ? "150%"
        : "150%"} at 50% 50%
  );

  transition:
    clip-path 0.45s cubic-bezier(0.77, 0, 0.18, 1),
    opacity 0.1s linear;
`;
