import { useParams } from "react-router-dom";
import { personagens } from "../../routes/doc_url";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { ChevronUpIcon, HamburgerIcon } from "@chakra-ui/icons";
import parse from 'html-react-parser';
import readTextFile from "../../scripts/readTextFile";
import titleCase from '../../scripts/titleCase';
import scrollTop from "../../scripts/scrollTop";

function Personagem() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const personagem = routeParams.personagem;
  const personagemDocUrl = personagens[personagem];
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function loadGoogleDocument() {
    let res = await readTextFile(personagemDocUrl);
    let htmlSummary = parse(res.summary);
    let htmlText = parse(res.data);
    setSummary(htmlSummary);
    setText(htmlText);
    setLoading(false);
  }

  function handleTitle(title) {
    title = title.replaceAll('-', ' ');
    title = titleCase(title);
    return title;
  }

  useEffect(() => {
    if (personagemDocUrl === undefined) {
      navigate('/pagina-nao-encontrada');
    }
    document.title = handleTitle(personagem);
    loadGoogleDocument();
    scrollTop();
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
        <h1 onClick={() => navigate('/personagens')}>{handleTitle(personagem)}</h1>
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

export default Personagem;