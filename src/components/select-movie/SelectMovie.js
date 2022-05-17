import './select-movie-style.css'
import { Link } from 'react-router-dom';
export default function SelectMovie(){
    const movies = [
        {
            title: "2067",
            image: "images/image 3.svg",
        },
        {
            title: "Enola Holmes",
            image: "images/image 6.svg"
        },
        {
            title: "2067",
            image: "images/image 3.svg",
        },
        {
            title: "Enola Holmes",
            image: "images/image 6.svg"
        },        {
            title: "2067",
            image: "images/image 3.svg",
        },
        {
            title: "Enola Holmes",
            image: "images/image 6.svg"
        },        {
            title: "2067",
            image: "images/image 3.svg",
        },
        {
            title: "Enola Holmes",
            image: "images/image 6.svg"
        },
    ]
    return(
       <>
            <h2>Selecione o filme</h2>
          <div className='movies-div'>   
            {movies.map((movie, index) => <Movie src={movie.image} key={index}/>)}

          </div>       
       </>

    )
}


function Movie(props){
    return(
        <Link to="/time">
        <div className='movie-container'>
            <img src={props.src} alt=""></img>
        </div>        
        </Link>

    );
}