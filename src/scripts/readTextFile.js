/*
  TAGS DE MARCAÇÃO
  #titulo titulo #titulo            h2
  #subtitulo subtitulo #subtitulo   h3
  #p #p                             div
  #pe #pe                           div (para que a imagem fique na esquerda do parágrafo)
  #t #t                             p
  #fill                             div (para completar parágrafos com caracteres insuficientes)
  #img                              img
*/


function setTag(text, itemClass, tag) {
  let itemsItalicLength = text.getElementsByClassName(itemClass).length;
  for (let i = 0; i < itemsItalicLength; i++) {
    text.getElementsByClassName(itemClass)[i].innerText =
      `${tag}${text.getElementsByClassName(itemClass)[i].innerText}${tag}`;
  }
  return text;
}

function removeGoogleDocsHtml(html) {
  let plainText = document.createElement('div');
  plainText.innerHTML = html;
  plainText = plainText.getElementsByClassName('doc-content')[0];

  //set image url and tag
  let urls = plainText.innerHTML.split('#img');
  for (let i = 1; i < urls.length; i++) {
    try {
      let url = urls[i].split('src="')[1];
      url = url.split('"')[0];
      urls[i] = `#img(${url})` + urls[i];
    } catch (err) {
      //não encontrou imagens
    }
  }
  plainText.innerHTML = urls.join('');

  //set text styling tags
  let styles = document.createElement('div');
  styles.innerHTML = html;
  styles = styles.getElementsByTagName('style')[1];

  let stylesProperties = {
    'bold': null,
    'italic': null,
    'underline': null,
  }
  
  try {
    for (let i = 0; i < 7; i++) {
      let property = styles.innerHTML.split(`.c${i}`)[1];
      property = property.split('}')[0];
      if (property.includes('font-weight')) stylesProperties.bold = `c${i}`;
      else if (property.includes('italic')) stylesProperties.italic = `c${i}`;
      else if (property.includes('underline')) stylesProperties.underline = `c${i}`;
    }
  } catch (err) {
    //não encontrou texto estilizado
  }

  plainText = setTag(plainText, stylesProperties.bold, '#b');
  plainText = setTag(plainText, stylesProperties.italic, '#i');
  plainText = setTag(plainText, stylesProperties.underline, '#u');

  //removing html tags
  plainText = plainText.textContent || plainText.innerText || "";
  plainText = plainText.replaceAll('\t', '');
  return plainText;
}


function replaceDoubleTag(text, char, newChar) {
  text = text.split(char);
  for (let i = 0; i < text.length-1; i++) {
    if (i % 2 === 0) {
      switch(newChar) {
        case 'u':
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

        case 'debug':
          text[i] += '<div className="wrapper-debug">';
          break;
        
        default:
          text[i] += `<${newChar}>`;
          break;
      }
    }
    else {
      switch(newChar) {
        case 'u': 
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

        case 'debug':
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

function setImageTag(text) {
  let urls = text.split('#img(');
  for (let i = 1; i < urls.length; i++) {
    let url = urls[i].split(')')[0];
    text = text.replaceAll(
      `#img(${url})`, 
      `<div className="wrapper-picture"><img src='${url}' className="picture"></img></div>`
    );
  }
  return text;
}

function setId(text) {
  let div = document.createElement('div');
  div.innerHTML = text;

  let itemsLength = div.getElementsByTagName('h2').length;
  for (let i = 0; i < itemsLength; i++) {
    let titulo = div.getElementsByTagName('h2')[i].innerText;
    titulo = titulo.split(';')[0].trim().toLowerCase().normalize('NFKD')
    .replace(/[^\w\s.-_\/]/g, '').replaceAll(' ', '-');
    div.getElementsByTagName('h2')[i].id = titulo;
  }
  
  itemsLength = div.getElementsByTagName('h3').length;
  for (let i = 0; i < itemsLength; i++) {
    let titulo = div.getElementsByTagName('h3')[i].innerText;
    titulo = titulo.split(';')[0].trim().toLowerCase().normalize('NFKD')
      .replace(/[^\w\s.-_\/]/g, '').replaceAll(' ', '-');
    div.getElementsByTagName('h3')[i].id = titulo;
  }
  return div.outerHTML;
}

function setSummary(text) {
  let summaryItems = '';
  let div = document.createElement('div');
  div.innerHTML = text;
  
  let itemH2 = div.getElementsByTagName('h2');
  let itemH3 = div.getElementsByTagName('h3');

  for (let i = 0; i < itemH2.length; i++) {
    summaryItems += `<a href='#${itemH2[i].id}'>${itemH2[i].innerText.toUpperCase()}</a>`;
  }
  for (let i = 0; i < itemH3.length; i++) {
    summaryItems += `<a href='#${itemH3[i].id}'>${itemH3[i].innerText.toUpperCase()}</a>`;
  }

  return summaryItems;
}


async function readTextFile(path) {
  let response = await fetch(path)
    .then(res => res.text())
    .then(data => {
      //remove html
      data = removeGoogleDocsHtml(data);

      //replace image
      data = setImageTag(data);

      //replace title
      data = replaceDoubleTag(data, '#titulo', 'h2');

      //replace subtitle
      data = replaceDoubleTag(data, '#subtitulo', 'h3');
      
      //replace wrapper-paragraph
      data = replaceDoubleTag(data, '#pe', 'pe');
      data = replaceDoubleTag(data, '#p', 'p');
      
      //replace text
      data = replaceDoubleTag(data, '#t', 't');
      
      //replace text fill
      data = replaceDoubleTag(data, '#fill', 'fill');

      //replace bold
      data = replaceDoubleTag(data, '#b', 'b');

      //replace underline
      data = replaceDoubleTag(data, '#u', 'u');

      //replace italic
      data = replaceDoubleTag(data, '#i', 'i');

      //replace debug tag
      data = replaceDoubleTag(data, '#debug', 'debug');

      //set titles id's
      data = setId(data);

      let summary = setSummary(data);

      return { 'data': data, 'summary': summary };
    });

  return response;
}

export default readTextFile;