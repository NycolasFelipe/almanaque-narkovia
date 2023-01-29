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
          <Route 
            path='*'
            element={<NotFound title="Página não encontrada" />} 
          />
          <Route 
            path='/pagina-nao-encontrada' 
            element={<NotFound title="Página não encontrada" />}
          />
          <Route 
            path='/' element={<Home title="Almanaque de Narkovia" />}
          />
          <Route 
            path='/guia-para-criacao-de-personagem' 
            element={<GuiaParaCriacaoDePersonagem title="Guia para criação de personagem" url={url('guia-para-criacao-de-personagem')} />} 
          />
          <Route 
            path='/mapas' 
            element={<Mapas title="Mapas" url={url('mapas')} />} 
          />
          <Route 
            path='/personagens' 
            element={<Personagens title="Personagens" />} 
          />
          <Route 
            path='/personagens/:personagem' 
            element={<Personagem />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RoutesApp;