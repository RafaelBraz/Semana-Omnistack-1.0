import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'
 
export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    /**
     * 
     * O primeiro parametro de useEffect é qual função você deseja
     * executar quando houver uma alteração no segundo parametro
     * 
     * O segundo parametro, como dito anteriormente, é uma lista
     * de variáveis que se forem alteradas, a função será executada.
     * 
     * OBS.: Quando o segundo parametro é uma lista vazia, a função
     * do primeiro parametro é executada apenas uma vez na criação
     * do componente. 
     * 
     * OBS.2: Para atualizar a tela após deletar um caso, uma das
     * alternativas seria colocar no segundo parametro a variavel(lista)
     * "incidents", porém essa abordagem fará outra requisição ao backend
     * (além de re-renderizar todos os outros casos novamente) podendo 
     * provocar lentidão. Será usada uma abordagem onde o próprio
     * react faz essa remoção sem fazer uma nova requisição ao backend
     * 
     */
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);


    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso. Tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem-vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02042" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        {/**
                         * 
                         * No onClick, se colocar apenas "onClick={handleDeleteIncident(incident.id)}"
                         * ele executará a função e retornará o parâmetro, de modo que ao iniciar o 
                         * componente, a função será chamada para cada componente para setar o retorno
                         * no "onClick", deletando todos os casos da ONG.
                         * 
                         * Para que isso não acontessa, ao utilizar arrow function o retorno será
                         * a função, de modo que o caso só será excluído quando clicar no botão de
                         * exclusão.
                         * 
                         */}
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>
    );
}