import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pokemons from './pages/Pokemons';
import PokemonDetail from './pages/PokemonDetail';

import './App.less';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Pokemons} />
        <Route path="/pokemon/:id" component={PokemonDetail} />
      </Switch>
    </Router>
  );
}

export default App;
