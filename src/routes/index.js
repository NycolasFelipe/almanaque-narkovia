import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import GuiaParaCriacaoDePersonagem from '../pages/GuiaParaCriacaoDePersonagem';
import Mapas from '../pages/Mapas';
import Personagens from '../pages/Personagens';
import { url } from './doc_url';

function RoutesApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/guia-para-criacao-de-personagem' element={<GuiaParaCriacaoDePersonagem url={url('guia-para-criacao-de-personagem')} />} />
          <Route path='/mapas' element={<Mapas url={url('mapas')} />} />
          <Route path='/personagens' element={<Personagens url={url('personagens')} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RoutesApp;