import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
      --width-screen: 45%;
      --container-width: 95%;
      --navbar-width: 85%;
      --font-size: 24px;
      --input-font-size: 14px;
      --icon-size: 18px;

      --primary: #55c2da;
      --primary-hover: #45a1b6;
      --primary-hover-bg: #45a1b631;
      --danger: #f04c4c;
      --danger-hover: #ce4242;
      --danger-hover-bg: #ce42421e;
      --body-bg: #eee;
      --label-color: #616161;
     
      
      --box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

      @media only screen and (max-width: 1024px) {
        --width-screen: 65%;
        --navbar-width: 95%;
        --font-size: 18px;
      }
      @media only screen and (max-width: 768px) {
        --width-screen: 85%;
        --font-size: 16px;
        --input-font-size: 16px;
      }
      @media only screen and (max-width: 512px) {
        --width-screen: 95%;
      }
    }

    *, *::after, *::before {
        box-sizing: border-box;
        outline: none;
        margin: 0;
        padding: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    body {
        max-width: 100vw;
        font-family: Open-Sans, Helvetica, Sans-Serif;
        background-color: var(--body-bg);
        overflow-y: auto;
    }
    main {
        width: var(--container-width);
        margin: 0 auto;
    }
`;

export default GlobalStyle;


export const StyledInput = styled.input`
    width: 100%;
    height: 40px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding-left: 10px;
    font-size: var(--input-font-size);
`;

export const StyledButton = styled.button`
    width: 100%;
    height: 40px;
    border: none;
    font-size: 14px;
    border: 1px solid var(--primary);
    border-radius: 5px;
    background: none;
    color: var(--primary);
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;

    &:hover {
        color: var(--primary-hover);
        background-color: var(--primary-hover-bg);
        border: 1px solid var(--primary-hover);
    }
`;

export const StyledIcon = styled.div`
    cursor: pointer;
    color: #65676B;
    border-radius: 50%;
    border: none;
    width: 35px;
    height: 35px;
    display: flex;
    font-size: var(--icon-size);
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    &:hover {
        background-color: #f3f3f3;
    }
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        color: #65676B;
    }

    @media only screen and (max-width: 768px) {
        width: 18px;
        height: 18px;
        font-size: 15px !important;

        &:hover {
            background-color: transparent;
        }
    }
`;

