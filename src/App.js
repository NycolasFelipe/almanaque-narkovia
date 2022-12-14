import { useState } from 'react';
import parse from 'html-react-parser';
import readTextFile from './scripts/readTextFile.js';
import file from '../src/documents/teste.txt';

function App() {
  const [text, setText] = useState('');
  readTextFile(file).then((res) => setText(res));

  return <>{parse(text)}</>;
}

export default App;
