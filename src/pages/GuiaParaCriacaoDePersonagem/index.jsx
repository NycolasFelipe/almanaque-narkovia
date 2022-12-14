import { useState } from 'react';
import parse from 'html-react-parser';
import readTextFile from '../../scripts/readTextFile.js';
import file from '../../documents/guia-para-criacao-de-personagem.txt';
import './styles.css';

function GuiaParaCriacaoDePersonagem() {
  const [text, setText] = useState('');
  readTextFile(file).then((res) => setText(res));

  return (
    <div className='wrapper'>
      {parse(text)}
    </div>
  ) ;
}

export default GuiaParaCriacaoDePersonagem;