import './App.css';
import Navbar from './components/navbar/Navbar'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import React,{useState} from 'react';



function App() {
  const [darkmode,setDarkMode] = useState(false);

  function changemode(){
    setDarkMode(!darkmode)
  }

  return (
    // <div className={`App ${darkmode ? 'dark-mode' : 'light-mode'}`}>
    <div className='App'>
      <Navbar changemode= { changemode } />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
