function setTag(text, itemClass, tag) {
  let itemsItalicLength = text.getElementsByClassName(itemClass).length;
  for (let i = 0; i < itemsItalicLength; i++) {
    text.getElementsByClassName(itemClass)[i].innerText =
      `${tag}${text.getElementsByClassName(itemClass)[i].innerText}${tag}`;
  }
  return text;
}

function replaceGoogleDocsHtml(html) {
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
  
  //set image view url and tag
  urls = plainText.innerHTML.split('#view');
  for (let i = 1; i < urls.length; i++) {
    try {
      let url = urls[i].split('src="')[1];
      url = url.split('"')[0];
      urls[i] = `#view(${url})` + urls[i];
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
      if (property.includes('font-weight:700')) stylesProperties.bold = `c${i}`;
      else if (property.includes('italic')) stylesProperties.italic = `c${i}`;
      else if (property.includes('underline')) stylesProperties.underline = `c${i}`;
    }
  } catch (err) {
    //não encontrou texto estilizado
  }

  plainText = setTag(plainText, stylesProperties.bold, '#b');
  plainText = setTag(plainText, stylesProperties.italic, '#i');
  plainText = setTag(plainText, stylesProperties.underline, '#u');

  //set tables
  let tablesLength = plainText.getElementsByTagName('table').length;
  for (let i = 0; i < tablesLength; i++) {
    plainText.getElementsByTagName('table')[i]
      .insertAdjacentHTML('afterend','<div class="table"></div>');
    plainText.getElementsByClassName('table')[i]
      .append(plainText.getElementsByTagName('table')[i].outerHTML);
  }
  for (let i = 0; i < tablesLength; i++) {
    plainText.getElementsByTagName('table')[i].textContent = '';
  }

  //removing html tags
  plainText = plainText.textContent || plainText.innerText || "";
  plainText = plainText.replaceAll('\t', '');

  styles.remove();
  return plainText;
}
//

function replaceDoubleTag(text, char, newChar) {
  text = text.split(char);
  for (let i = 0; i < text.length-1; i++) {
    if (i % 2 === 0) {
      switch(newChar) {
        case 'u':
          text[i] += '<span className="paragraph-underline">';
          break;
        
        case 'h2':
          text[i] += '<h2 className="paragraph-title">';
          break;

        case 'h3':
          text[i] += '<h3 className="paragraph-subtitle">';
          break;
          
        case 'p':
          text[i] += '<div className="paragraph">';
          break;

        case 'pe':
          text[i] += '<div className="paragraph paragraph-left">';
          break;

        case 't':
          text[i] += '<p className="paragraph-text">';
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
      `<div className="picture"><img src="${url}" className="picture-img"/></div>`
    );
  }
  return text;
}

function setImageViewTag(text) {
  let urls = text.split('#view(');
  for (let i = 1; i < urls.length; i++) {
    let url = urls[i].split(')')[0];
    text = text.replaceAll(
      `#view(${url})`, 
      `<photoview class="photoview-item" hidden is="x3d" key=${url}>${url}</photoview>`
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

  div.remove();
  return div.outerHTML;
}
//


function setSummary(text) {
  let summaryItems = '';
  let div = document.createElement('div');
  div.innerHTML = text;
  
  let itemH2 = div.getElementsByTagName('h2');
  let itemH3 = div.getElementsByTagName('h3');

  for (let i = 0; i < itemH2.length; i++) {
    summaryItems += `<a href='#${itemH2[i].id}'>${itemH2[i].innerText.toUpperCase().trim()}</a>`;
  }
  for (let i = 0; i < itemH3.length; i++) {
    summaryItems += `<a href='#${itemH3[i].id}'>${itemH3[i].innerText.toUpperCase().trim()}</a>`;
  }

  div.remove();
  return summaryItems;
}

function setPhotoview(text) {
  let photoviewItems = [];
  let div = document.createElement('div');
  div.innerHTML = text;

  let items = div.firstChild.getElementsByTagName('photoview')
  for (let i = 0; i < items.length; i++) {
    photoviewItems.push(items[i].innerHTML);
  }
  
  div.remove();
  return photoviewItems;
}
//

async function readTextFile(path) {
  let response = await fetch(path)
    .then(res => res.text())
    .then(data => {
      //remove html
      data = replaceGoogleDocsHtml(data);

      //replace image
      data = setImageTag(data);

      //replace image view
      data = setImageViewTag(data);

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
      let photoview = setPhotoview(data);

      return { 'data': data, 'summary': summary, 'photoview': photoview };
    });

  return response;
}

export default readTextFile;