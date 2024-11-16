import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import { ChevronUpIcon, HamburgerIcon } from '@chakra-ui/icons';
import processGoogleDocsFile from '../../scripts/processGoogleDocsFile';
import parse from 'html-react-parser';
import scrollTop from '../../scripts/scrollTop';
import handlePhotoview from '../../scripts/handlePhotoView';
import 'react-photo-view/dist/react-photo-view.css';
import './styles.css';

function Mapas(props) {
  const doc_url = props.url;
  const navigate = useNavigate();
  const [text, setText] = useState([]);
  const [summary, setSummary] = useState('');
  const [photoview, setPhotoview] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function loadGoogleDocument() {
    let res = await processGoogleDocsFile(doc_url);
    let htmlSummary = parse(res.summary);
    let htmlText = parse(res.data);
    setSummary(htmlSummary);
    setText(htmlText);
    setPhotoview(res.photoview);
    setLoading(false);
  }

  useEffect(() => {
    loadGoogleDocument();
    scrollTop();
    document.title = props.title;
  }, []);

  return (
    <div className="wrapper">
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
      <div id='titulo' className='wrapper-title'>
        <h1 onClick={() => navigate('/')}>Almanaque de Narkóvia</h1>
        <h2>Mapas</h2>
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
        <div className="content-photoview">
          {photoview.map((url, i) => {
            return (
              <div className="photoview" key={i} onLoad={() => handlePhotoview()}>
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