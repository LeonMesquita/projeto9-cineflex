import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'

export default function NavBar({isInitialPage}){
    let location = useLocation();
    console.log(location.pathname);
    let navigate = useNavigate();
    function handleClick(){
        navigate(-1);
    }
    return(
        <Navbar>
            <div>
                {location.pathname === '/' ? null :
                <BackButton onClick={handleClick}><img src='/images/arrow-back-outline.svg'/></BackButton>}
                <h1>CINEFLEX</h1>
            </div>
         
  
        </Navbar>
    );
}

const Navbar = styled.div`
    background-color: #C3CFD9;
    height: 67px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    position: fixed;
    top: 0;

    h1 {
        font-size: 34px;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        color: #E8833A;
    }

    div{
        width: 375px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

`

const BackButton = styled.button`
    background-color: white;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);

    :hover{
        background: lightgrey;
    }

`