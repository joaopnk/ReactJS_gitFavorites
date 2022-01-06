import React, { useState, useCallback, useEffect } from "react";
// Icones
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
// Link's
import { Link } from "react-router-dom";
// Componentes
import { Container, Form, SubmitButton, List, DeleteButton} from './styles';
// Api
import api from '../../services/api';

export default function  Main(){

    // Quando quiser atualizar, chamar a setNewRepo
    const [newRepo, setNewRepo ] = useState('');
    // Array para guardar todos repo. que foram cadastrados
    const [repositorios, setRepositorios ] = useState([]);
    // Responsável de manter os estados de carregando
    const [loading, setLoading] = useState(false);
    // Criando um alert ("de erros")
    const [alert, setAlert] = useState(null);

    //Buscar (buscando toda vez que iniciar)
    useEffect( () => {
        const repoStorages = localStorage.getItem('repos');
        if(repoStorages){
            // Passando e já convertendo para os repositorios (alimentando a "tela")
            setRepositorios(JSON.parse(repoStorages));
        }
    }, []);


    //Salvar Alterações (salvando toda vez que houver alterações)
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios))
    }, [repositorios]);

    // e = evento 
     const handleSubmit = useCallback( (e)=> {
        // Para não fazer a atualização da pagina após o submit (execução da função)
        e.preventDefault();



        // usando async para esperar a finalização da req.
        async function submit(){
            setLoading(true); //Chamando o loading (efetuando req.)
            setAlert(null);
            try{
                // Executando / tentativa 
                // Validação vazio
                if(newRepo === ''){
                    throw new Error('Você precisa referenciar um repositorio!');
                }
                // verificando se há algum repositorio já (não colocar 2x o mesmo!)
                const hasRepo = repositorios.find(repo => repo.name == newRepo);
                if(hasRepo){
                    throw new Error('Repositorio duplicado!');
                }
                
                // alimentando API com get de acordo com o que usuario digitou
                const response = await api.get(`repos/${newRepo}`);
    
                // Guardando a resposta baseado no que desejo
                const data = {
                    name: response.data.full_name,
                }
                // Pegando tudo que ja tem ( por isso o " ...repostorio" e adicionando + a nova requisição)
                setRepositorios([...repositorios, data]);
                setNewRepo(''); //Limpando após fazer a requisição
            }catch(error){
                // Tratando erros
                setAlert(true); //Erro retornado
                console.log(error);
            }finally{
                // Se chegou aqui, deu tudo certo
                setLoading(false); //Passando que ja foi finalizado a req.
            }
        }
        // Chamando ela para ser executada
        submit();
     }, [newRepo, repositorios]);
      
        

    function handleinputChange(e){
        // Alimenta o newRepo
        setNewRepo(e.target.value);
        setAlert(null);
    }

    // Função para deletar o repositorio selecionado, de parametro o nome
    const handleDelete = useCallback( (repo) => {
        // Filtrando todos os repositorios ("buscando") e devolvendo somente (todos) repositorios que forem != do solicitado
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
        
    }, [repositorios]);

    return(
        // <h1>Main!</h1>
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus Repositorios
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input 
                    type="text"
                    placeholder="Adicionar repositorios"
                    value={newRepo}
                    onChange={handleinputChange}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {/* Se loading for 1, render icon faSpinner */}
                    {loading ? (
                        <FaSpinner color="#fff" size={14} />
                    ) : (
                        // Se não:
                        <FaPlus color="#FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>

            {/* Aonde vai carregar dinamico os repo. salvos */}
            <List>
                {/* Listando os repo. */}
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={ ()=>  handleDelete(repo.name)}>
                                <FaTrash size={14} />
                            </DeleteButton>
                            {repo.name}
                        </span>
                        {/* encodeURI: falando que é PARAMETRO para a URL entender */}
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20}/>
                        </Link>
                    </li>
                ))}
            </List>

        </Container>
        )
}