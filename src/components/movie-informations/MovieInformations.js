import './style.css'

export default function MovieInformations(props){
    return(
        <div className="movie-informations">
            <div>
                <img src={props.src} alt=''/>
            </div>
                <p>Enola Holmes</p>
        </div>
    );
}