import MovieInformations from '../movie-informations/MovieInformations';
import './style.css'


export default function SelectTime(){
    const sessions = [
        {
            date: "Quinta-feira - 24/06/2021",
            time: "15:00"
        },
        {
            date: "Sexta-feira - 25/06/2021",
            time: "19:00"

        }
    ]
    return(
        <>
        <h2>Selecione o horário</h2>
            {sessions.map((session, index) =>
            <div className='sessions-container'>
                <p>{session.date}</p>
                <div className='buttons-container'>
                   <SessionButton time={session.time}/>
                   <SessionButton time={session.time}/> 

                </div>
                
            </div> )}
            <MovieInformations src="images/image 6.svg"/>
        </>
    )
}


function SessionButton(props){
    return(
        <button>
            {props.time}
        </button>
    );
}