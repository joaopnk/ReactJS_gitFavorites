// import {createGlobalStyles} from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// Formatando por padrão toda aplicação ( * do css)
export default createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root{
        min-height: 100%;
    }

    body{
        background-color: #0D2636;
        font-size: 12px;
        /* Deixando fonte "mais arredondada " */
        -webkit-font-smoothing: antialiased !important;
    }
    
    body, input, button{
        color: #222;
        font-size: 14px;
        font-family: arial,sans-serif;
    }

    button{
        cursor: pointer;
    }
    
`;