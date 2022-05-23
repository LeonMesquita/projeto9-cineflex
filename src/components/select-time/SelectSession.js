import MovieInformations from '../movie-informations/MovieInformations';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


export default function SelectSession(){
    const [sessions, setSessions] = useState({});
    const {idMovie} = useParams();
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);
        promise.then(response => {
            setSessions({...response.data});
        })
    }, []);
    return(
        <MainSessionDiv>
        <h2>Selecione o horário</h2>
            {sessions.days ? sessions.days.map((day, index) =>
            <SessionsContainer>
                <p>{day.weekday} - {day.date}</p>
                <ButtonsContainer>
                   <Link to={`/assentos/${day.showtimes[0].id}`}>
                        <SessionButton time={day.showtimes[0].name}/>                        
                   </Link>

                   <Link to={`/assentos/${day.showtimes[1].id}`}>
                        <SessionButton time={day.showtimes[1].name}/>
                   </Link>
                </ButtonsContainer>
                
            </SessionsContainer> ) : null}
            <MovieInformations>
                <span>
                <div>
                    <img src={sessions.posterURL} alt=''/>
                </div>
                    <p>{sessions.title}</p>                    
                </span>

            </MovieInformations>
        </MainSessionDiv>
    )
}

function SessionButton(props){
    return(
        <button>
            {props.time}
        </button>
    );
}


const MainSessionDiv = styled.div`
    width: 375px;
    display: flex;
   flex-direction: column;
    align-items: center;
    justify-content: start;
    margin-bottom: 127px;
`

const SessionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 23px;

    p{
    font-size: 20px;
    color: #293845;
    font-family: 'Roboto', sans-serif;
    margin-top: 35px;
    margin-bottom: 22px;

}

`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: start;
    width: 100%;
    flex-wrap: wrap;

    button{
        border: none;
        background-color: #E8833A;
        width: 83px;
        height: 43px;
        border-radius: 3px;
        font-size: 18px;
        color: white;
        font-family: 'Roboto', sans-serif;
        margin-right: 8px;
        cursor: pointer;
    }

`