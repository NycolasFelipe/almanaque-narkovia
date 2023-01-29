import parse from "html-react-parser";

// FORMATO
// const options = [
//   {
//     "text": "Modelo",
//     "url": "/personagens/modelo",
//   },
//   {
//     "text": "Lua Amaya",
//     "url": "/personagens/lua-amaya",
//   },
// ];

// export function getOptions() {
//   return options.sort((a, b) => a.text.localeCompare(b.text));
// } 

function azOrderTable(options) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let div = document.createElement('div');

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

export default azOrderTable;