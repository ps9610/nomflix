import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
`;

export default () => (
  <Container>
    <span role="img" aria-label="Loading">
      로딩중. . . ⏳
    </span>
  </Container>
);
