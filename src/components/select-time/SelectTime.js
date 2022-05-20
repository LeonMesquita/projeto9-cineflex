import MovieInformations from '../movie-informations/MovieInformations';
import './style.css'
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SelectTime(){
    const [sessions, setSessions] = useState({});
    const {idMovie} = useParams();
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);
        promise.then(response => {
            setSessions({...response.data});
        })
    }, []);
    
    //console.log(sessions);
   // const days = [...sessions.days];
    //console.log(days);
    return(
        <>
        <h2>Selecione o horário</h2>
            
            
            <div className='sessions'>
            {sessions.days ? sessions.days.map((day, index) =>
            <div className='sessions-container'>
                <p>{day.weekday} - {day.date}</p>
                <div className='buttons-container'>
                    
                   <Link to={`/assentos/${day.showtimes[0].id}`}>
                        <SessionButton time={day.showtimes[0].name}/>                        
                   </Link>

                   <Link to={`/assentos/${day.showtimes[1].id}`}>
                        <SessionButton time={day.showtimes[1].name}/>
                   </Link>




                </div>
                
            </div> ) : null}
            </div>
            <MovieInformations src={sessions.posterURL} title={sessions.title}/>
        </>
    )
}
//{sessions.days.map((session) => console.log("teste"))}

function SessionButton(props){
    return(
        <button>
            {props.time}
        </button>
    );
}

/*
{sessions.days.map((session, index) =>
            <div className='sessions-container'>
                <p>{"teste"}</p>
                <div className='buttons-container'>
                   <SessionButton time={"time"}/>
                   <SessionButton time={"time"}/> 

                </div>
                
            </div> )}
*/