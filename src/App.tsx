import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFetch } from './hooks/useFetch';

type Repository = {
  full_name: string;
  description: string;
};

function App() {
  // const [repositories, setRepositories] = useState<Repository[]>([]);

  //  ! Request padrão usando fetch... não é a melhor opção
  // useEffect(() => {
  //   fetch('https://api.github.com/users/tjfaccipieri/repos')
  //     .then((response) => response.json())
  //     .then((data) => setRepositories(data));
  // }, []);

  // !Usando com get do Axios básico(movido la pro hook do useFetch)
  // useEffect(() => {
  //   axios.get('https://api.github.com/users/tjfaccipieri/repos')
  //     .then(response => {
  //       setRepositories(response.data)
  //     })
  // }, []);

  const {data: repositories, isFetching, error} = useFetch<Repository[]>('users/tjfaccipieri/repos')  

  return (
    <ul>
      {error && <p>Deu ruim</p>}
      {isFetching && <p>Carregando...</p>}
      {repositories?.map((repo) => {
        return (
          <li key={repo.full_name}>
            <strong>{repo.full_name}</strong>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default App;
