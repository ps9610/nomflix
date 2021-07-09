import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
		text-decoration:none;
		color:inherit;
	}
	* {
		box-sizing:border-box;
        &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(229, 9, 20, 0.4);
    border-radius: 6px;
  }
	}
	body{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:14px;
        background-color:rgba(20, 20, 20, 1);
        color:#fff;
        padding-top:50px;
    }
`;

export default globalStyles;
