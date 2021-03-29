import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import CreateSellOrder from './screens/CreateSellOrder';
import SellList from './screens/SellList';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Route path="/" exact component={CreateSellOrder} />
        <Route path="/selllist" component={SellList} />
      </div>
    </Router>
  );
}

export default App;
