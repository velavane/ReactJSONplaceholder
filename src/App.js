import logo from './logo.svg';
import './App.css';
// import { Router, Switch, Route } from "react-router-dom";
import List from '../src/components/list';
import AppRouter from '../src/router';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <List></List> */}
      <AppRouter></AppRouter>

      </header>
    </div>
  );
}

export default App;
