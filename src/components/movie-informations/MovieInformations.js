import './style.css'

export default function MovieInformations(props){
    return(
        <div className="movie-informations">
            {props.children}
        </div>
    );
}

/*
            <div>
                <img src={src} alt=''/>
            </div>
                <p>{title}</p>
*/