import styled from 'styled-components';


export default function Button({buttonText, onClick, color}){
    return(
        <ButtonStyle onClick={onClick} color={color}>
           { buttonText}
        </ButtonStyle>
    );
}

const ButtonStyle = styled.button`
    width: 225px;
    height: 42px;
    background-color: ${props => props.color ? props.color : "#E8833A"};
    border-radius: 3px;
    border: none;
    margin-top: 67px;
    color: white;
    font-size: 18px;
    font-family: 'Roboto',sans-serif;
    letter-spacing: 0.04em;
    font-weight: normal;
    cursor: pointer;

   
`