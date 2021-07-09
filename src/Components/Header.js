import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  z-index: 2;
  color: #b3b3b3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  position: relatve;
  z-index: 1;
  display: flex;
`;
const Item = styled.li`
  width: 50px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#e50914" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">홈</SLink>
      </Item>
      <Item current={pathname === "/movies"}>
        <SLink to="/movies">영화</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">검색</SLink>
      </Item>
    </List>
  </Header>
));
