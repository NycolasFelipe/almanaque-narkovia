import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import GuiaParaCriacaoDePersonagem from '../pages/GuiaParaCriacaoDePersonagem';
import Mapas from '../pages/Mapas';
import Personagens from '../pages/Personagens';
import Personagem from '../pages/Personagem';
import { url } from './doc_url';

function RoutesApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/pagina-nao-encontrada' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/guia-para-criacao-de-personagem' element={<GuiaParaCriacaoDePersonagem url={url('guia-para-criacao-de-personagem')} />} />
          <Route path='/mapas' element={<Mapas url={url('mapas')} />} />
          <Route path='/personagens' element={<Personagens />} />
          <Route path='/personagens/:personagem' element={<Personagem />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RoutesApp;