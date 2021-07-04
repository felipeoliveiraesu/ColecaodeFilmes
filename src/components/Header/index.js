import './header.css';
import {Link} from 'react-router-dom';

export default function Header (){
    return(
    <header>
        <Link className='logo' to='./'> Coleção de Filmes</Link>
        <Link className='favoritos' to='./favoritos'> Salvos</Link>
    </header>
    )

} 