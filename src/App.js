import { useState } from 'react';
import parse from 'html-react-parser';
import readTextFile from './scripts/readTextFile.js';
import file from '../src/documents/teste.txt';
import './App.css';

function App() {
  const [text, setText] = useState('');
  readTextFile(file).then((res) => setText(res));

  return (
    <div className='wrapper'>
      {parse(text)}
    </div>
  ) ;
}

export default App;
