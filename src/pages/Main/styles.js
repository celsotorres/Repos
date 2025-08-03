import styled, {keyframes, css} from "styled-components";

export const List = styled.ul`
    list-style: style none;
    margin-top:20px;

        li{
            padding: 10px 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            & + li{
                border-top:1px solid #eee;
            }

        }

        a{
            color: #0D2636;;
            text-decoration: none;
        }
`;

export const DeleteButton = styled.button.attrs({
    type:'button'
})`
    margin-left: 6px;
    color: lightgray;
    border:none;
    background: transparent;
    padding: 8px 7px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover{
        color: red;
    }
`;


export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding:30px;
    margin: 80px auto;
    h1{
        font-size: 20px;
        display:flex;
        align-items: center;
        flex-direction:row;

        svg{
            margin-right: 10px;
        }
    }
`;

export const Form = styled.form`
margin-top: 10px;
display:flex;
flex-direction:row;

input{
    flex:1;
    border: 2px solid ${props => (props.error ? '#FF0000': '#DDD')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 15px;
    text-indent: 2px; /* afastamento inicial */
}
`;

/*Criando animação do botão para girar ao clicar*/
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const animate = css`
    svg {
        animation: ${rotate} 2s linear infinite;
    }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: lightgray; /* cor de fundo padrão */
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background: green; /* verde  */
    color: white;        /* opcional, mantém a cor do texto */
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;


