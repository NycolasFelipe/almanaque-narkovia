import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import options from '../Home/options';
import './styles.css';

function NotFound(props) {
  const navigate = useNavigate();

  function optionButton(text, url, i) {
    return <Button variant='outline' key={i} onClick={() => navigate(url)}>{text}</Button>
  }

  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <div>
      <div className='wrapper'>
        <div id='titulo' className='wrapper-title title-notfound'>
          <h1>Página não encontrada...</h1>
          <h2>Essas são algumas páginas úteis:</h2>
        </div>
        <div className="wrapper-content content-notfound">
          <div className='wrapper-home-options'>
            {optionButton("Home", "/", 0)}
            {options.map((e, i) => optionButton(e.text, e.url, i))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound;