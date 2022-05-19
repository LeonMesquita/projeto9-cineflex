import './style.css'

export default function MovieInformations({src, title}){
    return(
        <div className="movie-informations">
            <div>
                <img src={src} alt=''/>
            </div>
                <p>{title}</p>
        </div>
    );
}