import {useEffect, useState} from 'react';
import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify';

export default function Filme (){
    const {id} = useParams();
    const [filme, setFilme] = useState ([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() =>{

        async function loadfilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            //console.log(response.data);

            if (response.data.length === 0){
                //tentou acessar um id q não existe, retorna para home
                history.replace('/');
                return;
            }
            setFilme(response.data);
            setLoading(false);
        }

        loadfilme();

        return () => {
            console.log('Componente desfeito')
        }

    }, [history, id]);

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];
        //se ja estiver salvo,ignore...
        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)
        if (hasFilme){
            toast.info ('Você já salvou esse filme.');
            return;
            //para de executar o código aqui
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Seu filme foi salvo com sucesso!');
    }

    if(loading){
    return(
        <div className = 'filme-info'>
            <h1> Carregando o filme...</h1>
        </div>
    )
}

    return(
        <div className = 'filme-info'>
            <h1> {filme.nome}</h1>
            <img src = {filme.foto} alt={filme.nome}/>

            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className='botoes'>
                <button onClick={salvaFilme}> Salvar </button>
                <button>
                    <a target = 'blank'href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}