import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function SelectSeats(){
    const [seatsList, setSeatsList] = useState({});
    const {idSessao} = useParams();
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        promise.then(response => {
            setSeatsList({...response.data})
        });
    }, []);


    const seatsInformations = [
        {
            status: "Selecionado",
            color: "#8DD7CF"
        },
        {
            status: "Disponível",
            color: "#C3CFD9"
        },
        {
            status: "Indisponível",
            color: "#FBE192"
        },
    ]


    console.log(seatsList.seats);
    return(
        <>
                <h2>Selecione o(s) assento(s)</h2>
               <SeatsContainer>
                    {seatsList.seats ? seatsList.seats.map((seat) => 
                        <Seats seatNumber={seat.name}/>
                    ) : null} 


                
                    {
                        seatsInformations.map((seats) => 
                        <SeatsInformations>
                            <SeatButton background={seats.color}/>
                            <span>{seats.status}</span>  
                         </SeatsInformations>)
                    }

                 
              
               </SeatsContainer>


        </>
    );


}


function Seats({seatNumber}){
    return(
        <SeatButton>
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
    }
`
