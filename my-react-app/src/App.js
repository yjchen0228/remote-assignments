import ReactLikeButton from './ReactLikeButton';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Appworks assignment: wk3</h1>
      {/* Here, we're adding our ReactLikeButton component into the JSX. */}
      <ReactLikeButton />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
