import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Spinner } from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';
import readTextFile from '../../scripts/readTextFile';
import parse from 'html-react-parser';
import randomString from '../../scripts/randomString';
import '../../GlobalStyles.css';
import 'react-photo-view/dist/react-photo-view.css';
import './styles.css';


function Mapas() {
  const random = randomString();
  const doc_url = `https://docs.google.com/document/d/e/2PACX-1vQUL-5060ni5VbXdP20i1hft-P7oXMIe8Yi3xMAXSnp5M9fDDvosiRX7QDzYWAcWpSHNhTOrqjcPP25/pub?${random}`;
  const navigate = useNavigate();
  const [text, setText] = useState([]);
  const [summary, setSummary] = useState('');
  const [photoview, setPhotoview] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadGoogleDocument() {
    let res = await readTextFile(doc_url);
    let htmlSummary = parse(res.summary);
    let htmlText = parse(res.data);
    setSummary(htmlSummary);
    setText(htmlText);
    setPhotoview(res.photoview);
    setLoading(false);
  }

  useEffect(() => {
    loadGoogleDocument().then(() => handlePhotoview());
    window.onscroll = function() {
      var pageOffset = document.documentElement.scrollTop;
      if (pageOffset >= 300) {
        document.getElementsByClassName('scroll-top')[0].style.display = 'block';
      } else {
        document.getElementsByClassName('scroll-top')[0].style.display = 'none';
      }
    }
  }, []);

  function handlePhotoview() {
    let photoviewItems = document.getElementsByClassName('photoview');
    for (let i = 0; i < photoviewItems.length; i++) {
      document.getElementsByClassName('photoview-item')[i]
        .parentNode.append(document.getElementsByClassName('photoview')[i]);
    } 
    for (let i = 0; i < photoviewItems.length; i++) {
      document.getElementsByClassName('photoview-item')[i].remove();
    }
  }

  return (
    <div className="wrapper">
      {loading && (
        <div className="wrapper-loading">
          <Spinner color='#fff' size='xl' />
        </div>
      )}
      <div className="wrapper-solid"></div>
      <div id='titulo' className='wrapper-title' onClick={() => navigate('/')}>
        <h1>Almanaque de Narkóvia</h1>
        <h2>Mapas</h2>
      </div>
      <div className="wrapper-content">
        <div className='content-summary'>
          {summary}
        </div>
        <div className="content-text">
          {text}
        </div>
        <div className="content-photoview">
          {photoview.map((url, i) => {
            return (
              <div className="photoview" key={i}>
                <PhotoProvider>
                  <PhotoView src={url}>
                    <img src={url} />
                  </PhotoView>
                </PhotoProvider>
              </div>
            )
          })}
        </div>
      </div>
      <a className='scroll-top' href='#titulo'><ChevronUpIcon /></a>
    </div>
  );
}

export default Mapas;