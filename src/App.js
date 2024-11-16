import RoutesApp from './routes/index.js';
import { ChakraProvider } from '@chakra-ui/react';
import "./global.css";

function App() {
  return (
    <ChakraProvider>
      <RoutesApp />
    </ChakraProvider>
  ) ;
}

export default App;
