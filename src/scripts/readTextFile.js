/*
  TAGS DE MARCAÇÃO
  @titulo titulo @titulo            h2
  @subtitulo subtitulo @subtitulo   h3
  @p @p                             div
  @pe @pe                           div (para que a imagem fique na esquerda do parágrafo)
  @t @t                             p
  @fill                             div (para completar parágrafos com caracteres insuficientes)
  @img(url)                         img
  
  SIMBOLOS PARA ESTILIZAÇÃO
  *texto*   negrito
  $texto$   underline
  _texto_   italico
*/

function replaceDoubleTag(text, char, newChar) {
  text = text.split(char);
  for (let i = 0; i < text.length-1; i++) {
    if (i % 2 == 0) {
      switch(newChar) {
        case 'underline':
          text[i] += '<span className="wrapper-paragraph-underline">';
          break;
        
        case 'h2':
          text[i] += '<h2 className="wrapper-paragraph-title">';
          break;

        case 'h3':
          text[i] += '<h3 className="wrapper-paragraph-subtitle">';
          break;
          
        case 'p':
          text[i] += '<div className="wrapper-paragraph">';
          break;

        case 'pe':
          text[i] += '<div className="wrapper-paragraph wrapper-paragraph-left">';
          break;

        case 't':
          text[i] += '<p className="wrapper-paragraph-text">';
          break;

        case 'fill':
          text[i] += '<div className="paragraph-text-fill">';
          break;
        
        default:
          text[i] += `<${newChar}>`;
          break;
      }
    }
    else {
      switch(newChar) {
        case 'underline': 
          text[i] += '</span>';
          break;

        case 'p':
          text[i] += '</div>';
          break;

        case 'pe':
          text[i] += '</div>';
          break;
          
        case 't':
          text[i] += '</p>';
          break;
        
        case 'fill':
          text[i] += '</div>';
          break;
        
        default:
          text[i] += `</${newChar}>`;
          break;
      }
    }
  }
  text = text.join('');
  return text;
}

function removeGoogleDocsHtml(html) {
  let plainText = document.createElement("div");
  plainText.innerHTML = html;
  plainText = plainText.getElementsByClassName('doc-content')[0];
  plainText = plainText.textContent || plainText.innerText || "";
  plainText = plainText.replaceAll('\t', '');
  return plainText;
}

async function readTextFile(path) {
  let response = await fetch(path)
    .then(res => res.text())
    .then(data => {
      //remove html
      data = removeGoogleDocsHtml(data);

      //replace image
      let urls = data.split('@img(');
      for (let i = 1; i < urls.length; i++) {
        let url = urls[i].split(')')[0];
        data = data.replaceAll(
          `@img(${url})`, 
          `<div className="wrapper-picture"><img src='${url}' className="picture"></img></div>`
        );
      }

      //replace title
      data = replaceDoubleTag(data, '@titulo', 'h2');

      //replace subtitle
      data = replaceDoubleTag(data, '@subtitulo', 'h3');
      
      //replace wrapper-paragraph
      data = replaceDoubleTag(data, '@pe', 'pe');
      data = replaceDoubleTag(data, '@p', 'p');
      
      //replace text
      data = replaceDoubleTag(data, '@t', 't');
      
      //replace text fill
      data = replaceDoubleTag(data, '@fill', 'fill');

      //replace bold
      data = replaceDoubleTag(data, '*', 'b');

      //replace underline
      data = replaceDoubleTag(data, '$', 'underline');

      //replace italic
      data = replaceDoubleTag(data, '_', 'i');

      return data;
    });
  return response;
}

export default readTextFile;