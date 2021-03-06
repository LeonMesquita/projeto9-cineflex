import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from '../Button';


export default function SuccessScreen(){
    const {idSessao} = useParams();
    const location = useLocation().state;
    const [sessao, setSessao] = useState({});
    useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

    promise.then(response => {
        setSessao({...response.data})
    });
}, []);

console.log(location);

    return(
        <>
            
            {sessao.movie ? 
            <SuccessDiv>
                <h4>Pedido feito com sucesso!</h4>
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
                    <h1>Comprador(es)</h1>
                    {location.buyers.map((buyer) => 
                    <>
                        <h3>Nome: {buyer.nome}</h3>
                        <h3>CPF: {buyer.cpf}</h3>  
                    </>
                    )}
                  
                </div>
                <Link to='/'>
                    <Button buttonText="Voltar para Home"/>

                </Link>

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
    font-style: normal;
}

h3{
    color: #293845;
    font-size: 22px;
    font-weight: normal;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.04em;
    margin-top: 0;
    margin-bottom: 0;
    font-style: normal;

}

div{
    margin-bottom: 40px;
    align-self: baseline;

}

h4{
    font-size: 24px;
    color: #247A6B;
    margin-top: 110px;
    font-family: 'Roboto' sans-serif;
    text-align: center;
    letter-spacing: 0.04em;
    font-weight:700;
    margin-bottom: 40px;

}
`