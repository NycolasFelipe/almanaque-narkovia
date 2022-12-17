import { useState } from 'react';
import parse from 'html-react-parser';
import readTextFile from '../../scripts/readTextFile.js'
import './styles.css';
import { useNavigate } from 'react-router-dom';


function GuiaParaCriacaoDePersonagem() {
  const doc_url = 'https://docs.google.com/document/d/e/2PACX-1vSIJFBGP2Ie4JodN5Blzg9LCjYX_cTj2WDLJCc4Bn1_RZ2NAgRX7_NpumPoDas7hmk_CpbT17OJ4kx0/pub?embedded=true';
  const navigate = useNavigate();
  const [text, setText] = useState('');
  readTextFile(doc_url).then((res) => setText(res));

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