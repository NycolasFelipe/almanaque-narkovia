import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import GuiaParaCriacaoDePersonagem from '../pages/GuiaParaCriacaoDePersonagem';

function RoutesApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/guia-para-criacao-de-personagem' element={<GuiaParaCriacaoDePersonagem />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RoutesApp;