import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { getOptions } from "./options";
import azOrderTable from "../../scripts/azOrderTable";
import './styles.css';

function Personagens(props) {
  const navigate = useNavigate();
  const options = getOptions();

  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <div className='wrapper'>
      <div id='titulo' className='wrapper-title'>
        <h1 onClick={() => navigate('/')}>Almanaque de Narkóvia</h1>
        <h2>Personagens</h2>
      </div>
      <div className="wrapper-content" style={{"height": "100vh"}}>
        <div className="content-text">
          <div className="az-order-table">
            {azOrderTable(options)}
          </div>
        </div>
        <a className='scroll-top' href='#titulo'>
          <ChevronUpIcon />
        </a>
      </div>
    </div>
  )
}

export default Personagens;