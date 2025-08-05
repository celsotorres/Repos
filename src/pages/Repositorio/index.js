import React, {useState, useEffect}from "react";
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, Filterlist } from "./styles";
import { parsePath, useParams } from "react-router-dom";
import {FaArrowLeft} from 'react-icons/fa';
import api from '../../services/api'


export default function Repositorio() {
  const { repositorio } = useParams();
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    { state: 'all', label: 'Todas', active: false },
    { state: 'open', label: 'Abertas', active: true },
    { state: 'closed', label: 'Fechadas', active: false },
  ]);

 const [filterIndex, setFilterIndex] = useState(0);

  useEffect(()=>{
    async function load() {
      const nomeRepo = decodeURIComponent(repositorio);

      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, 
          { params: { 
            state: filters.find(f => f.active).state, 
            per_page: 5 
          } }),
      ]);
      setRepo(repoData.data);
      setIssues(issuesData.data); 
      setLoading(false);

    }
    load();
  },[ repositorio ]);

  //Cria a paginação
  useEffect(() => {
    async function loadIssues() {
      const nomeRepo = decodeURIComponent(repositorio);
      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: { state: filters[filterIndex].state, per_page: 5, page }
      });
      setIssues(response.data);
    }
    if (!loading) {
      loadIssues();
    }
  }, [filterIndex, page, repositorio, loading]);

  //Função que controla a paginação
  function handlePage(action) {
    setPage(action === 'next' ? page + 1 : page - 1);
  }

  //Função que controla os filtros
  function handleFilter(index) {  
    setFilterIndex(index);
    setFilters(filters.map((filter, i) => ({
      ...filter,
      active: i === index
    })));
    setPage(1); // Reseta a página ao mudar o filtro
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft size={20} color="#0d2636" />
      </BackButton>
      <Owner>
        <img src={repo.owner?.avatar_url} alt={repo.owner?.login} />
        <div>
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
        </div>
      </Owner>

      <Filterlist active={filterIndex}>
        <div className="buttons">
          {filters.map((filter, index) => (
            <button
              key={filter.state}
              type="button"
              onClick={() => handleFilter(index)}
            >
              {filter.label}
            </button>
          ))}
        </div>

  <div className="text">
    <h1>Issues</h1>
    <p>Mostrando {issues.length} issues abertas</p>
  </div>
</Filterlist>
       
      <IssuesList>
        {issues.map(issue => (
          <li key={issue.id}>
            <img src={issue.user?.avatar_url} alt={issue.user?.login} />

            <div>
              <strong>
                <a href={issue.html_url} > {issue.title} </a>
                {issue.labels.map(label => (
                  <span key={label.id}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.state}</p>
              <p>{issue.created_at}</p>
              <p>{issue.user?.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
      <PageActions>
        <button
          type="button"
          onClick={() => handlePage('back')}
          disabled={page === 1}
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={() => handlePage('next')}
        >
          Próxima
        </button>
      </PageActions>

    </Container>
  );
}
