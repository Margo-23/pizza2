import React from 'react';
import './scss/app.scss';
import { Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Header from './components/Header';
import NotFound from './pages/NotFound';

// import pizzasJson from './assets/pizzas.json';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

return(
  <SearchContext.Provider value={{searchValue, setSearchValue}}>  
  <div className="wrapper">
  <Header />
  <div className="content">
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
  </Routes>
</div>
</div>
</SearchContext.Provider>


)
}

export default App;
