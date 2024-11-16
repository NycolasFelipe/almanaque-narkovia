import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { ChevronUpIcon, HamburgerIcon } from "@chakra-ui/icons";
import parse from 'html-react-parser';
import processGoogleDocsFile from "../../scripts/processGoogleDocsFile";
import scrollTop from "../../scripts/scrollTop";
import styles from "./styles.module.css";

const NarkoviaAwards = (props) => {
  const doc_url = props.url;
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function loadGoogleDocument() {
    const res = await processGoogleDocsFile(doc_url);
    const htmlSummary = parse(res.summary);
    const htmlText = parse(res.data);
    setSummary(htmlSummary);
    setText(htmlText);
    setLoading(false);
  }

  useEffect(() => {
    loadGoogleDocument();
    scrollTop();
    document.title = props.title;
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
      <div id='titulo' className='wrapper-title'>
        <h1 onClick={() => navigate('/')}>Narkovia Awards</h1>
        <h2>1ª edição</h2>
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
  )
}

export default NarkoviaAwards;