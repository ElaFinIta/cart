import logo from './ice-cream-solid.svg';
import './App.css';
import Product from './Product';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Product /> 
    </div>
  );
}

export default App;
