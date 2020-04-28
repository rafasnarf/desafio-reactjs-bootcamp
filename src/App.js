import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repos, setRepo] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setRepo(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title:"Teste React",
      url:"www.teste.com",
      techs:["Node", "Java"]
    });

    const repo = response.data;
    setRepo([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    const resp = await api.delete(`/repositories/${id}`)

    if(resp.status === 204) {
      const repo = repos.filter(repo => repo.id !== id);
      setRepo(repo);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repos.map(repo => 
            <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
            </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
