import styled from 'styled-components';

export default function MovieInformations(props){
    return(
        <InformationsDiv>
            {props.children}
        </InformationsDiv>
    );
}


const InformationsDiv = styled.div`
position: fixed;
bottom: 0;
width: 100%;
height: 117px;
background: #DFE6ED;
border: 1px solid #9EADBA;
display: flex;
align-items: center;
justify-content: center;

span{
    width: 64px;
    height: 89px;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
}

img{
    width: 48px;
    height: 72px;
}


p{
    color: #293845;
    font-size: 26px;
    font-family: 'Roboto', sans-serif;
    margin-left: 14px;
}

div{
    display: flex;
    justify-content: start;
    align-items: center;
    width: 375px;
}
`