import './App.css';
import RoutesApp from './routes/index.js';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <RoutesApp />
    </ChakraProvider>
  ) ;
}

export default App;
