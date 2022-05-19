import './select-movie-style.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
          <div className='movies-div'>   
            {movies.map((movie, index) => <Movie src={movie.posterURL} key={movie.id} title={movie.title} idMovie={movie.id}/>)}

          </div>       
       </>

    )
}


function Movie({src, title, idMovie}){
    return(
        <Link to={`/sessions/${idMovie}`}>
        <div className='movie-container'>
            <img src={src} alt=""></img>
        </div>        
        </Link>

    );
}
//       