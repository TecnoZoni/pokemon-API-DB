import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Landing from "./components/Landing";
import Home from './components/Home';
import PokemonCreate from "./components/PokemonCreate"
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/:id" component={Detail} />
          <Route exact path="/creator" component={PokemonCreate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
