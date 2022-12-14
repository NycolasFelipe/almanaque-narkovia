async function readTextFile(path) {
  let response = await fetch(path)
    .then(res => res.text())
    .then(data => {
      //replace image
      let urls = data.split('[img](');
      for (let i = 1; i < urls.length; i++) {
        let url = urls[i].split(')')[0];
        data = data.replaceAll(`[img](${url})\r\n`, `<div className="wrapper-picture"><img src='${url}' className="picture"></img></div>`);
      }

      //replace title
      data = data.replaceAll('[titulo]', '<h2>');
      data = data.replaceAll('[/titulo]\r\n', '</h2>');
      
      //replace wrapper-paragraph
      data = data.replaceAll('[p]\r\n', '<div className="wrapper-paragraph">');
      data = data.replaceAll('[p,left]\r\n', '<div className="wrapper-paragraph wrapper-paragraph-left">');
      data = data.replaceAll('[/p]\r\n', '</div>');
      
      //replace text
      data = data.replaceAll('[txt]\r\n', '<p className="wrapper-text">');
      data = data.replaceAll('[/txt]\r\n', '</p>');

      //replace strong
      data = data.replaceAll('[b]', '<b>');
      data = data.replaceAll('[/b]', '</b>');

      //replace italic
      data = data.replaceAll('[i]', '<i>');
      data = data.replaceAll('[/i]', '</i>');

      //replace newline
      data = data.replaceAll('\n', '<br>');

      return data;
    });
  return response;
}

export default readTextFile;