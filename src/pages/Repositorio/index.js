import React, {useState, useEffect}from "react";
import { Container, Owner, Loading, BackButton, IssuesList } from "./styles";
import { parsePath, useParams } from "react-router-dom";
import {FaArrowLeft} from 'react-icons/fa';
import api from '../../services/api'

/*export default function Repositorio() {
  const { repositorio } = useParams();

  return (
    <h1 style={{ color: '#FFF' }}>
      Repositorio Page: {decodeURIComponent(repositorio)}
    </h1>
  );
}*/

export default function Repositorio() {
  const { repositorio } = useParams();
  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load() {
      const nomeRepo = decodeURIComponent(repositorio);

      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, { params: { state: 'open', per_page: 5 } }),
      ]);
      setRepo(repoData.data);
      setIssues(issuesData.data); 
      setLoading(false);

    }
    load();
  },[ repositorio ]);

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
    </Container>
  );
}
