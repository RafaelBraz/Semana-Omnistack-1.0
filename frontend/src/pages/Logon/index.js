import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    // useState retorna um array [valor, função de atualização do valor]
    const [id, setId] = useState('');
    
    // inicializa a variável de histórico de navegação
    const history = useHistory();

    async function handleLogin(event) {
        // Previne o browser de executar o procedimento padrão ao enviar o formulário,
        // como por exemplo, dar um "refresh" na página
        event.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            // Configura e seta variáveis no browser do cliente (como uma cache)
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            // Adiciona no histórico a página profile, e consequentemente,
            // redireciona para a mesma
            history.push('/profile');
        } catch (err) {
            alert('Falha no login. Tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={event => setId(event.target.value)}
                    />
                    
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>

                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}

//Font: https://fonts.google.com/specimen/Roboto?selection.family=Roboto:400,500,700
//Pacote de icones: https://feathericons.com/
