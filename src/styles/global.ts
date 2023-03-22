import { createGlobalStyle } from 'styled-components';

const scrollbarWidth = '7px';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-color: rgba(227,227,227,1);
    scrollbar-width: thin;
    font-family: Poppins, sans-serif;
    outline: none;


    &::-webkit-scrollbar {
      width: ${scrollbarWidth};
      height: ${scrollbarWidth};
    }

    &::-webkit-scrollbar-button {
      opacity: 0;
      height: 0;
      width: 0;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(227,227,227,1);
      border-radius: calc(${scrollbarWidth} / 2);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(180,180,180,1);
    }

    &::-webkit-scrollbar-track {
      opacity: 0;
    }

    &::-webkit-scrollbar-corner {
      opacity: 0;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;

    &.overflow-hidden {
      overflow: hidden;
    }
  }

  button:not(:disabled) {
    cursor: pointer;
    user-select: none;
  }
`;
