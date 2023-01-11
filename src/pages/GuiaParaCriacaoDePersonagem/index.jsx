import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUpIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
import parse from 'html-react-parser';
import randomString from '../../scripts/randomString.js';
import readTextFile from '../../scripts/readTextFile.js';
import './../../GlobalStyles.css';
import './styles.css';

function GuiaParaCriacaoDePersonagem() {
  const random = randomString();
  const doc_url = `https://docs.google.com/document/d/e/2PACX-1vSIJFBGP2Ie4JodN5Blzg9LCjYX_cTj2WDLJCc4Bn1_RZ2NAgRX7_NpumPoDas7hmk_CpbT17OJ4kx0/pub?${random}`;
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadGoogleDocument() {
    let res = await readTextFile(doc_url);
    let htmlSummary = parse(res.summary);
    let htmlText = parse(res.data);
    setSummary(htmlSummary);
    setText(htmlText);
    setLoading(false);
  }

  useEffect(() => {
    loadGoogleDocument();
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
    <div className='wrapper'>
      {loading && (
        <div className="wrapper-loading">
          <Spinner color='#fff' size='xl' />
        </div>
      )}
      <div className="wrapper-solid"></div>
      <div id='titulo' className='wrapper-title' onClick={() => navigate('/')}>
        <h1>Almanaque de Narkóvia</h1>
        <h2>Guia para criação de personagem</h2>
      </div>
      <div className="wrapper-content">
        <div className='content-summary'>
          {summary}
        </div>
        <div className="content-text">
          {text}
        </div>
        <a className='scroll-top' href='#titulo'>
          <ChevronUpIcon />
        </a>
      </div>
    </div>
  );
}

export default GuiaParaCriacaoDePersonagem;