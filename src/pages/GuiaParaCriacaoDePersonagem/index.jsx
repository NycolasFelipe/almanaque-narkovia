import { useState } from 'react';
import parse from 'html-react-parser';
import file from '../../documents/guia-para-criacao-de-personagem.txt';
import readTextFile from '../../scripts/readTextFile.js'
import './styles.css';
import { useNavigate } from 'react-router-dom';


function GuiaParaCriacaoDePersonagem() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  readTextFile(file).then((res) => setText(res));

  return (
    <div className='wrapper-guia'>
      <div className="wrapper-guia-solid"></div>
      <div className='wrapper-guia-title' onClick={() => navigate('/')}>
        <h1>Almanaque de Narkóvia</h1>
        <h2>Guia para criação de personagem</h2>
      </div>
      <div className="wrapper-guia-content">
        {parse(text)}
      </div>
    </div>
  ) ;
}

export default GuiaParaCriacaoDePersonagem;