import './App.css';
import Categories from './Components/Categories/Categories';
import Navbar from './Components/Navbar/Navbar';
import Slider from './Components/Slider/Slider';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Slider></Slider>
      <Categories></Categories>
    </div>
  );
}

export default App;
