import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MovieInformations from '../movie-informations/MovieInformations';
import Button from '../Button';
import ConfirmationDialog from '../ConfirmationDialog';

const activeColor = "#8DD7CF";
const inactiveColor = "#FBE192";
const availableColor = "#C3CFD9";

export default function SelectSeats(){
    const [seatsList, setSeatsList] = useState({});
    const {idSessao} = useParams();
    const [name, setName] = useState('');
    const [CPF, setCPF] = useState('');
    const [idsList, setIdsList] = useState([]);
    const [seatsNumbers, setSeatsNumbers] = useState([]);
    const [buyers, setBuyers] = useState([]);
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        promise.then(response => {
            setSeatsList({...response.data})
        });
    }, []);

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
        <MainSeatDiv>
                <h2>Selecione o(s) assento(s)</h2>
               <SeatsContainer>
                    {seatsList.seats ? seatsList.seats.map((seat, index) => 
                        <Seats seatNumber={index+1} isAvailable={seat.isAvailable}
                                idsList={idsList} setIdsList={setIdsList} seatId={seat.id}
                                seatsNumbers={seatsNumbers} setSeatsNumbers={setSeatsNumbers} key={index}
                                />
                    ) : null} 
               
                    {
                        seatsInformations.map((seats) => 
                        <SeatsInformations>
                            <SeatButton background={seats.color}/>
                            <span>{seats.status}</span>  
                         </SeatsInformations>)
                    }
               </SeatsContainer>
            
                {idsList.map((id, index) =>
                    <InputArea>
                    <span>Nome do comprador:</span>
                    <input type="text" placeholder='Digite seu nome...' onChange={(e) =>  saveName(e.target.value, id)}/>
                    <span>CPF do comprador:</span>
                    <input type="text" placeholder='Digite seu CPF...' onChange={(e) => saveCPF(e.target.value, id)}/>
                </InputArea>
                
               )}

                {
                    idsList.length > 0 ?
                    <Link to={`/success/${idSessao}`} state={{buyers: buyers, seats: seatsNumbers}}>
                        <Button buttonText="Reservar assento(s)" onClick={finishReservation}/>
                    </Link>
                    :
                    <Button buttonText="Reservar assento(s)" color="lightgrey"/>
                }

                
                {seatsList.movie ?
                <MovieInformations>
                <span>
                    <div>
                        <img src={seatsList.movie.posterURL}alt=''/>
                    </div>
                
                    <p>
                        {seatsList.movie.title}<br></br>
                        {seatsList.day.weekday} - {seatsList.day.date}
                    </p>
                                  
        
                     
                </span>
                  
              
          

                </MovieInformations>
            : null
                }
        </MainSeatDiv>
   
    );


    function saveName(e, id){
        setName(e);
        let buyerObj = {
            idAssento: id,
            nome: e,
            cpf: CPF
        }
      let aux = buyers.filter(buyer => buyer.idAssento !== id);
      aux.push(buyerObj);
        setBuyers(aux); 
    }


    function saveCPF(e, id){
        setCPF(e);
        let buyerObj = {
            idAssento: id,
            nome: name,
            cpf: e
        }
        let aux = buyers.filter(buyer => buyer.idAssento !== id);
        aux.push(buyerObj);        
        setBuyers(aux);
    }



    function finishReservation(){
        const reservationObj = {
            ids: idsList,
            buyers
        }
       axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", reservationObj);
    }
}

function changeColor(setColor, setIsActive, isActive, setIdsList,
    idsList, seatId, isAvailable, seatNumber, seatsNumbers, setSeatsNumbers, setDelet, choose, setChoose){
    if (isAvailable){
        if(isActive){
            setDelet(true);          
        }
        else{
            setColor(activeColor);
            setIsActive(!isActive);
            const auxList = [...idsList, seatId];
            setIdsList(auxList);
            const auxList2 = [...seatsNumbers, seatNumber];
            seatsNumbers = auxList2;
            setSeatsNumbers(auxList2);
        }
    }
    else{
        alert("Este assento não está disponível");
    }


}



function unmarkButton(setColor, setIsActive, isActive, setIdsList,
    idsList, seatId, seatNumber, seatsNumbers, setSeatsNumbers){

        setColor(availableColor);   
        setIsActive(!isActive);
        const auxList = idsList.filter(id => id !== seatId);
        setIdsList(auxList);
        const auxList2 = seatsNumbers.filter(number => number !== seatNumber);
        setSeatsNumbers(auxList2);

}

function Seats({seatNumber, isAvailable, idsList, setIdsList,
                seatId, seatsNumbers, setSeatsNumbers}){
    const [color, setColor] = useState("#C3CFD9");
    const [isActive, setIsActive] = useState(false);
    const [delet, setDelet] = useState(false);
    const [choose, setChoose] = useState(false);

    return(
        <>
        {delet ? <ConfirmationDialog message='Tem certeza que deseja desmarcar?'
        onclickYes={() => {setDelet(false); unmarkButton(setColor, setIsActive, isActive, setIdsList,
            idsList, seatId, seatNumber, seatsNumbers, setSeatsNumbers)}}
        onclickNo={() => setDelet(false)}/>
        :
        null}

        <SeatButton background={isAvailable ? color : inactiveColor} onClick={() => 
            changeColor(setColor, setIsActive, isActive, setIdsList, idsList,
            seatId, isAvailable, seatNumber, seatsNumbers, setSeatsNumbers, setDelet, choose, setChoose)}>
            <p>{seatNumber}</p>
        </SeatButton>        
        </>

    );
}



const MainSeatDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 127px;
`

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
    margin-bottom: 30px;
    span{
        color: #293845;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        text-align: start;
        margin-top: 5px;
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