import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='wrapper-home'>
      <div className='wrapper-home-blur'></div>
      <div className='wrapper-home-title'>
        <h1>Almanaque de Narkóvia</h1>
      </div>
      <div className='wrapper-home-options'>
        <Button className='home-button' variant='outline' onClick={() => navigate('/guia-para-criacao-de-personagem')}>Guia para criação de personagem</Button>
      </div>
    </div>
  );
}

export default Home;