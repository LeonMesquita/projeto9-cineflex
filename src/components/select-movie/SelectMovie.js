import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../NavBar';

export default function SelectMovie(){

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        promise.then(response =>{
            setMovies([...response.data]);
        })
    }, [])
    return(
       <>
            <h2>Selecione o filme</h2>
          <MoviesDiv>   
            {movies.map((movie, index) => <Movie src={movie.posterURL} key={movie.id} title={movie.title} idMovie={movie.id}/>)}

          </MoviesDiv>       
       </>

    )
}


function Movie({src, title, idMovie}){
    return(
        <Link to={`/sessions/${idMovie}`}>
        <MovieContainer>
            <img src={src} alt=""></img>
        </MovieContainer>        
        </Link>

    );
}
//       

const MoviesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;
    margin-top: 40px;
`

const MovieContainer = styled.div`
    width: 145px;
    height: 209px;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 11px;
    cursor: pointer;

    img{
        width: 129px;
    height: 193px;
    }
`