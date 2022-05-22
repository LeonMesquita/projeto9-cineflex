import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from '../Button';


export default function SuccessScreen(){
    const {idSessao} = useParams();
   // const {stateParam} = useLocation().state;
    const location = useLocation().state;
    const [sessao, setSessao] = useState({});
    useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

    promise.then(response => {
        setSessao({...response.data})
    });
}, []);

    //let seatsNumbers = [];
    //{sessao ? seatsNumbers = sessao.movie : null};
    //console.log(sessao);
//console.log(location);

    return(
        <>
            <h4>Pedido feito com sucesso!</h4>
            {sessao.movie ? 
            <SuccessDiv>
                <div>
                    <h1>Filme e sessão</h1>
                    <h3>{sessao.movie.title}</h3>
                    <h3>{sessao.day.date} {sessao.day.weekday}</h3>                    
                </div>

                <div>
                    <h1>Ingressos</h1>
                    {location.seats.map((seat) => <h3>Assento {seat}</h3>)}
                                      
                </div>

                <div>
                    <h1>Comprador</h1>
                    <h3>Nome: {location.name}</h3>
                    <h3>CPF: {location.cpf}</h3>                    
                </div>

                <Button buttonText="Voltar para Home"/>

            </SuccessDiv>
            : null}
        </>
    );
}


const SuccessDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;


width: 375px;
h1{
    color: #293845;
    font-weight: 700;
    font-family: 'Roboto',sans-serif;
    letter-spacing: 0.04em;
    font-size: 24px;
    text-align: start;
    margin-bottom: 5px;
}

h3{
    color: #293845;
    font-size: 22px;
    font-weight: normal;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.04em;
    margin-top: 0;
    margin-bottom: 0;
}

div{
    margin-bottom: 40px;
    align-self: baseline;
}
`