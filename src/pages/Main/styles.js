import styled, { keyframes, css  } from 'styled-components';

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    padding: 30px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    margin: 80px auto;

    h1{
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;

        svg{
            margin-right: 10px;
        }
    }

`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input{
        flex: 1;
        border: 1px solid ${props => (props.error ? '#FF0000' : '#ddd') };
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`;

// Criando animação do botão
const animate = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }

`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        /* IGNORANDO O PRIMEIRO LI, E APLICAR SOMENTE DO SEGUNDO PARA BAIXO */
        & + li{
            border-top: 1px solid #eee;
        }
        a{
            color: #0D2636;
            text-decoration: none;

        }
    }
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    background: #0d2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Acessando propriedade disabled */
    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
    }
    /* O "&&" nesse caso esta trabalhando "quando for loading, executa o que tem na frente" */
    ${props => props.loading &&
        css`
            svg{
                /* Vai rodar infinito até o loading ficar como FALSE */
                animation: ${animate} 2s linear infinite;
            }
        `
    }
`;

export const DeleteButton = styled.button.attrs({
    type: 'button',

})`
    background: transparent;
    color: #0d2636;
    border: 0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`;