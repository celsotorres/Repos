import React, {useState, useCallback, useEffect} from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import {Link} from 'react-router-dom';
import api from '../../services/api'

export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    //const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alerta, setAlerta] = useState(null);

    /*Buscar dados do localStorage*/
    const [repositorios, setRepositorios] = useState(() => {
        const repoStorage = localStorage.getItem('repos');
        return repoStorage ? JSON.parse(repoStorage) : [];
    });

    /*Salvar dados no localStorage*/
    useEffect(()=>{
        localStorage.setItem('repos',JSON.stringify(repositorios));
    },[repositorios]);


    /*submit do form*/
    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        
        async function submit(){
            setLoading(true);
            setAlerta(null);
            try {
                if (newRepo === ''){
                    throw new Error('Digite o nome do repositorio')
                }
                const response = await api.get(`repos/${newRepo}`);

                const hasRepo = repositorios.find(repo => repo.name === newRepo);
                if (hasRepo){
                    throw new Error('Este repositorio já existe')
                }
                const data = {
                    name: response.data.full_name,
                }

                setRepositorios([...repositorios, data]);
                setNewRepo('')
            }
            catch(error){
                //alert(error);
                setAlerta(true);
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
        submit();
    },[newRepo,repositorios]);

    /*onChange do inputText*/
    function handleinputChange(e){
        setNewRepo(e.target.value)
        setAlerta(null);
    }

    /*deletar uma linha da lista */
    const handleDelete = useCallback((repo)=>{
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
    },[repositorios]);
    

    return(
        <Container>
            <h1>
                <FaGithub size={40}/>
                Meus Repositorios
            </h1>
            <Form onSubmit ={handleSubmit} error={alerta}> 
                <input 
                type="text" 
                placeholder="adicionar repositorio"
                value={newRepo}
                onChange={handleinputChange}
                />
                <SubmitButton loading ={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner size={14}/>
                    )
                     :
                    (
                        <FaPlus size={14}/>
                    )}
                    
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span> 
                            <DeleteButton onClick={()=>handleDelete(repo.name)}>
                                <FaTrash size={12}/>
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}
                        >
                            <FaBars size={20}/>
                        </Link>
                    </li>
                ))}

            </List>
        </Container>
        
    )

}