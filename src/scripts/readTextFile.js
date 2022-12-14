async function readTextFile(path) {
  let response = await fetch(path)
    .then(res => res.text())
    .then(data => {
      //replace title
      data = data.replaceAll('[titulo]', '<h2>');
      data = data.replaceAll('[/titulo]\r\n', '</h2>');
      
      //replace text
      data = data.replaceAll('[texto]\r\n', '<p>');
      data = data.replaceAll('[/texto]\r\n', '</p>');

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