import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import options from './options';
import { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();

  function optionButton(text, url, i) {
    return <Button variant='outline' key={i} onClick={() => navigate(url)}>{text}</Button>
  }

  useEffect(() => {
    document.title = 'Almanaque de Narkovia';
  }, []);

  return (
    <div className='wrapper-home'>
      <div className='wrapper-home-blur'></div>
      <div className='wrapper-home-title'>
        <h1>Almanaque de Narkóvia</h1>
      </div>
      <div className='wrapper-home-options'>
        {options.map((e, i) => optionButton(e.text, e.url, i))}
      </div>
    </div>
  );
}

export default Home;