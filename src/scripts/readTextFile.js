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
      data = data.replaceAll('[titulo]', '<h2 className="wrapper-paragraph-title">');
      data = data.replaceAll('[/titulo]', '</h2>');

      //replace subtitle
      data = data.replaceAll('[subtitulo]', '<h3 className="wrapper-paragraph-subtitle">');
      data = data.replaceAll('[/subtitulo]', '</h3>');
      
      //replace wrapper-paragraph
      data = data.replaceAll('[p]', '<div className="wrapper-paragraph">');
      data = data.replaceAll('[p,left]', '<div className="wrapper-paragraph wrapper-paragraph-left">');
      data = data.replaceAll('[/p]', '</div>');
      
      //replace text
      data = data.replaceAll('[txt]', '<p className="wrapper-paragraph-text">');
      data = data.replaceAll('[/txt]', '</p>');

      //replace text fill
      data = data.replaceAll('[txtfill]', '<div className="paragraph-text-fill">');

      //replace bold

      //replace bold
      data = data.replaceAll('[b]', '<b>');
      data = data.replaceAll('[/b]', '</b>');

      //replace underline
      data = data.replaceAll('[u]', '<span className="wrapper-paragraph-underline">');
      data = data.replaceAll('[/u]', '</span>');

      //replace italic
      data = data.replaceAll('[i]', '<i>');
      data = data.replaceAll('[/i]', '</i>');

      return data;
    });
  return response;
}

export default readTextFile;