import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUpIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import parse from 'html-react-parser';
import readTextFile from '../../scripts/readTextFile.js';
import './../../GlobalStyles.css';
import './styles.css';

function GuiaParaCriacaoDePersonagem(props) {
  const doc_url = props.url;
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    document.title = 'Guia para criação de personagem';
  }, []);
  
  return (
    <div className='wrapper'>
      {loading && (
        <div className="wrapper-loading">
          <Spinner color='#fff' size='xl' />
        </div>
      )}
      <Modal finalFocusRef isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sumário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='content-summary-menu' onClick={onClose}>
              {summary}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Sair
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="wrapper-solid"></div>
      <div id='titulo' className='wrapper-title'>
        <h1 onClick={() => navigate('/')}>Almanaque de Narkóvia</h1>
        <h2>Guia para criação de personagem</h2>
      </div>
      <div className='wrapper-menu'>
        <Button id='menu' onClick={onOpen}><HamburgerIcon /></Button>
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