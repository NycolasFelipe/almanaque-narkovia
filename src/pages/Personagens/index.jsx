import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUpIcon } from "@chakra-ui/icons";
import './styles.css';
import './../../GlobalStyles.css';
import parse from 'html-react-parser';
import { getOptions } from "./options";

function Personagens() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Personagens';
  }, []);

  function azOrderTable() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let div = document.createElement('div');
    let options = getOptions();

    for (let letter of alphabet) {
      let item = document.createElement('div');
      item.className = 'az-order-table--item';

      let itemTitle = document.createElement('span');
      itemTitle.textContent = letter.toUpperCase();
      item.append(itemTitle);

      for (let option of options) {
        if (option.text.toLowerCase()[0] === letter) {
          let optionLink = document.createElement('a');
          optionLink.textContent = option.text;
          optionLink.href = option.url;
          item.append(optionLink);
        }
      }
      if (item.childElementCount > 1) {
        div.append(item);
      }
    }
    return parse(div.innerHTML);
  }

  return (
    <div className='wrapper'>
      <div className="wrapper-solid"></div>
      <div id='titulo' className='wrapper-title'>
        <h1 onClick={() => navigate('/')}>Almanaque de Narkóvia</h1>
        <h2>Personagens</h2>
      </div>
      <div className="wrapper-content" style={{"height": "100vh"}}>
        <div className="content-text">
          <div className="az-order-table">
            {azOrderTable()}
          </div>
        </div>
        <a className='scroll-top' href='#titulo'>
          <ChevronUpIcon />
        </a>
      </div>
    </div>
  )
}

export default Personagens;