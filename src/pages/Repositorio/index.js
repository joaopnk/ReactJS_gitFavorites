import React, { useState, useEffect } from "react";

import {Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList} from "./styles";

// API
import api from '../../services/api';

// Icones
import { FaArrowLeft } from 'react-icons/fa';



export default function  Repositorio({match}){


    const [repositorio, setRepositorio] = useState({});

    const [issues, setIssues]           = useState([]);

    const [loading, setLoading]         = useState(true);

    // Controlando as paginas
    const [page, setPage] = useState(1);


    // Buttons de filtro extra
    const [filters, setFilters]  = useState([
        {
            state: 'all',
            label: 'Todas',
            active: true,
        },
        {
            state: 'open',
            label: 'Em aberto',
            active: false,
        },
        {
            state: 'closed',
            label: 'Fechadas',
            active: false,
        }
    ]);

    // Para saber qual esta ativado 
    const [filterIndex, setFilterIndex] = useState(0);
    useEffect(() => {

        async function load(){
            {/*.repositorio porque foi passado "repositorio" como param. no LINK (index.js) */}
            const nomeRepo = decodeURIComponent(match.params.repositorio);
            
            // Executando as duas ao mesmo tempo
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`), //Primeira posi. do array recebe essas req.
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: filters.find(f => f.active).state, //trazendo o que o vim do filtro (onde estiver  ativo)
                        per_page: 5 //quantidade a ser carregado
                    }
                }) // Segunda posi. recebe essa req.
            ]);

            setRepositorio(repositorioData.data);
            setIssues(issuesData.data);

            console.log(issuesData.data);
            setLoading(false);

        }

        load();

    }, [match.params.repositorio]);

    // Responsável por renderizar de acordo com os btns (back / prox.)
    useEffect( () => {
        async function loadIssue(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);
            
            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: filters[filterIndex].state,
                    page,
                    per_page: 5,
                }
            });

            setIssues(response.data);
        }

        loadIssue();
    }, [filterIndex, filters, match.params.repositorio, page]);

    // Função que controla (proxima pagina ou voltar)
    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1);
    }

    // Função que altera o filtro (alterando para qual for clicado, 0,1,2)
    function handleFilter(index){
        setFilterIndex(index);
    }

    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={34}/>
            </BackButton>
            {/* Dono do repositorio: (avatar, descrição, etc) */}
            <Owner>
                <img
                    src={repositorio.owner.avatar_url}
                    alt={repositorio.owner.login}
                />
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>

            <FilterList active ={filterIndex}>
                {filters.map((filter, index) => 
                    <button type="button"
                            key = {filter.label}
                            onClick = {() => handleFilter(index)}
                    >
                        {filter.label}
                    </button>
                )}
            </FilterList>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />
                        
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>

                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>

                    </li>
                ))}
            </IssuesList>

            <PageActions>
                <button 
                    type="button"
                    onClick={ () => handlePage('back')}
                    disabled={page < 2}>
                    Voltar
                </button>
                <button type="button" onClick={ () => handlePage('next')}>
                    Proxima
                </button>
            </PageActions>
        </Container>
    )
}