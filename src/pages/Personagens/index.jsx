import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import readTextFile from "../../scripts/readTextFile";
import { Spinner } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import './../../GlobalStyles.css'


function Personagens(props) {
  const doc_url = props.url;
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadGoogleDocument() {
    let res = await readTextFile(doc_url);
    let htmlText = parse(res.data);
    setText(htmlText);
    setLoading(false);
  }

  useEffect(() => {
    loadGoogleDocument();
    document.title = 'Personagens';
  }, []);

  return (
    <div>
      <div className='wrapper'>
      {loading && (
        <div className="wrapper-loading">
          <Spinner color='#fff' size='xl' />
        </div>
      )}
      <div className="wrapper-solid"></div>
      <div id='titulo' className='wrapper-title'>
        <h1 onClick={() => navigate('/')}>Almanaque de Narkóvia</h1>
        <h2>Personagens</h2>
      </div>
      <div className="wrapper-content">
        <div className="content-text">
        </div>
        <a className='scroll-top' href='#titulo'>
          <ChevronUpIcon />
        </a>
      </div>
      </div>
    </div>
  )
}

export default Personagens;