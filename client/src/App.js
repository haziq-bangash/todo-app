import logo from './logo.svg';
import './App.css';
import TodoList from './components/Todo/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles/global.css";

function App() {
  return (
    <div className="App bg-dark text-light">
      <TodoList />
    </div>
  );
}

export default App;
