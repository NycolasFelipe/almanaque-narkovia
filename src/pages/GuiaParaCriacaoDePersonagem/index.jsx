import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import readTextFile from '../../scripts/readTextFile.js';
import './styles.css';
import { ChevronUpIcon } from '@chakra-ui/icons';

function GuiaParaCriacaoDePersonagem() {
  let date = new Date();
  date = JSON.stringify(date);
  date = date.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '');
  const doc_url = `https://docs.google.com/document/d/e/2PACX-1vSIJFBGP2Ie4JodN5Blzg9LCjYX_cTj2WDLJCc4Bn1_RZ2NAgRX7_NpumPoDas7hmk_CpbT17OJ4kx0/pub?${date}`;
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');


  useEffect(() => {
    readTextFile(doc_url).then((res) => {
      setText(res.data);
      setSummary(res.summary);
    });

    window.onscroll = function() {
      var pageOffset = document.documentElement.scrollTop;
      if (pageOffset >= 300) {
        document.getElementsByClassName('scroll-top')[0].style.display = 'block';
      } else {
        document.getElementsByClassName('scroll-top')[0].style.display = 'none';
      }
    }
  }, []);
  
  return (
    <div className='wrapper-guia'>
      <div className="wrapper-guia-solid"></div>
      <div id='titulo' className='wrapper-guia-title' onClick={() => navigate('/')}>
        <h1>Almanaque de Narkóvia</h1>
        <h2>Guia para criação de personagem</h2>
      </div>
      <div className="wrapper-guia-content">
        <div className='wrapper-guia-summary'>
          <h2>Sumário</h2>
          {parse(summary)}
        </div>
        {parse(text)}
        <a className='scroll-top' href='#titulo'>
          <ChevronUpIcon />
        </a>
      </div>
    </div>
  ) ;
}

export default GuiaParaCriacaoDePersonagem;