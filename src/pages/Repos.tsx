import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useFetch } from './hooks/useFetch';
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';

export type Repository = {
  full_name: string;
  description: string;
};

export function Repos() {
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

  // ! só funcionava com o hook de useFetch, que foi deletado por causa do react-query
  // const {data: repositories, isFetching, error} = useFetch<Repository[]>('users/tjfaccipieri/repos')  

  const {data, isFetching} = useQuery<Repository[]>('repos', async ()=>{
    const response = await axios.get('https://api.github.com/users/tjfaccipieri/repos')

    return response.data
  }, {
    staleTime: 1000 * 60 //1 minuto
  }
  )

  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {data?.map((repo) => {
        return (
          <li key={repo.full_name}>
            <Link to={`repos/${repo.full_name}`}>{repo.full_name}</Link>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

