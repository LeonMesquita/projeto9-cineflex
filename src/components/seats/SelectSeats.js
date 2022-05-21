import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MovieInformations from '../movie-informations/MovieInformations';
import Button from '../Button';

const activeColor = "#8DD7CF";
const inactiveColor = "#FBE192";
const availableColor = "#C3CFD9";

export default function SelectSeats(){
    const [seatsList, setSeatsList] = useState({});
    const {idSessao} = useParams();
    const [name, setName] = useState('');
    const [CPF, setCPF] = useState('');
    const [idsList, setIdsList] = useState([]);
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        promise.then(response => {
            setSeatsList({...response.data})
        });
    }, []);

    console.log(seatsList);
    const seatsInformations = [
        {
            status: "Selecionado",
            color: activeColor
        },
        {
            status: "Disponível",
            color: availableColor
        },
        {
            status: "Indisponível",
            color: inactiveColor
        },
    ]


    return(
        <>
                <h2>Selecione o(s) assento(s)</h2>
               <SeatsContainer>
                    {seatsList.seats ? seatsList.seats.map((seat) => 
                        <Seats seatNumber={seat.name} isAvailable={seat.isAvailable}
                                idsList={idsList} setIdsList={setIdsList} seatId={seat.id}/>
                    ) : null} 


                
                    {
                        seatsInformations.map((seats) => 
                        <SeatsInformations>
                            <SeatButton background={seats.color}/>
                            <span>{seats.status}</span>  
                         </SeatsInformations>)
                    }
               </SeatsContainer>
            
                <InputArea>
                    <span>Nome do comprador:</span>
                    <input type="text" placeholder='Digite seu nome...' value={name} onChange={(e) => saveName(e.target.value)}/>
                </InputArea>


                <InputArea>
                    <span>CPF do comprador:</span>
                    <input type="text" placeholder='Digite seu CPF...' value={CPF} onChange={(e) => saveCPF(e.target.value)}/>
                </InputArea>

                <Link to={`/success/${idSessao}`}>
                    <Button buttonText="Reservar assento(s)" onClick={finishReservation}/>
                </Link>
                
                {seatsList.movie ?
                <MovieInformations>
                <div>
                    <img src={seatsList.movie.posterURL}alt=''/>
                </div>
                <p>{seatsList.movie.title}</p>
                <p>{seatsList.day.weekday} - {seatsList.day.date}</p>
                </MovieInformations>
            : null
                }

        </>
    );

    function saveName(e){
        setName(e);
    }

    function saveCPF(e){
        setCPF(e);
    }

    function finishReservation(){
        const reservationObj = {
            ids: idsList,
            name: name,
            cpf: CPF
        }
        console.log(reservationObj)

       
            const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", reservationObj);

            promise.then(response => {
                console.log('deu certo!')
            })
       
    }
}

function changeColor(setColor, setIsActive, isActive, setIdsList, idsList, seatId, isAvailable){
    if (isAvailable){
        if(isActive){
            setColor(availableColor);
            setIsActive(!isActive);
            const auxList = idsList.filter(id => id !== seatId);
            setIdsList(auxList);

        }
        else{
            setColor(activeColor);
            setIsActive(!isActive);
            const auxList = [...idsList, seatId];
            setIdsList(auxList);
        }
    }
}


function Seats({seatNumber, isAvailable, idsList, setIdsList, seatId}){
    const [color, setColor] = useState("#C3CFD9");
    const [isActive, setIsActive] = useState(false);
    return(
        <SeatButton background={isAvailable ? color : inactiveColor} onClick={() => 
            changeColor(setColor, setIsActive, isActive, setIdsList, idsList, seatId, isAvailable)}>
            <p>{seatNumber}</p>
        </SeatButton>
    );
}




const SeatsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 95%;
    margin-top: 20px;
    margin-bottom: 41px;
    
`

const SeatButton = styled.div`
    width: 26px;
    height: 26px;
    background: ${props => props.background ? props.background : "#C3CFD9"};
    border: 1px solid #808F9D;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 7px;
    margin-bottom: 18px;

    p{
        font-size: 11px;
        font-family: 'Roboto', sans-serif;
    }

    h5{
    font-size: 24px;
    color: #293845;
    margin-top: 110px;
    
}
`


const SeatsInformations = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 25px;
    margin-top: 5px;
    span{
        color: #4E5A65;
        font-size: 13px;
        font-family: 'Roboto', sans-serif;
    }

    div{
        margin-bottom: 5px;
        cursor:auto;
    }
`


const InputArea = styled.div`
    margin: auto;
    margin-top: 7px;
    display: flex;
    flex-direction: column;
    span{
        color: #293845;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        text-align: start;
    }

    input{
        width: 327px;
        height: 51px;
        background-color: white;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        ::placeholder{
            font-style: italic;
            color: #AFAFAF;
            font-size: 15px;
            font-family: 'Roboto',sans-serif;
        } 

    }

`