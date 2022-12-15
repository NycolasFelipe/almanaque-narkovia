import { useState } from 'react';
import parse from 'html-react-parser';
import file from '../../documents/guia-para-criacao-de-personagem.txt';
import './styles.css';

async function readTextFile(path) {
  let response = await fetch(path)
    .then(res => res.text())
    .then(data => {
      //replace image
      let urls = data.split('[img](');
      for (let i = 1; i < urls.length; i++) {
        let url = urls[i].split(')')[0];
        data = data.replaceAll(`[img](${url})`, `<div className="wrapper-picture"><img src='${url}' className="picture"></img></div>`);
      }

      //replace title
      data = data.replaceAll('[titulo]', '<h2>');
      data = data.replaceAll('[/titulo]', '</h2>');
      
      //replace wrapper-paragraph
      data = data.replaceAll('[p]', '<div className="wrapper-paragraph">');
      data = data.replaceAll('[p,left]', '<div className="wrapper-paragraph wrapper-paragraph-left">');
      data = data.replaceAll('[/p]', '</div>');
      
      //replace text
      data = data.replaceAll('[txt]', '<p className="wrapper-text">');
      data = data.replaceAll('[/txt]', '</p>');

      //replace strong
      data = data.replaceAll('[b]', '<b>');
      data = data.replaceAll('[/b]', '</b>');

      //replace italic
      data = data.replaceAll('[i]', '<i>');
      data = data.replaceAll('[/i]', '</i>');

      return data;
    });
  return response;
}

function GuiaParaCriacaoDePersonagem() {
  const [text, setText] = useState('');
  readTextFile(file).then((res) => setText(res));

  return (
    <div className='wrapper'>
      {parse(text)}
    </div>
  ) ;
}

export default GuiaParaCriacaoDePersonagem;