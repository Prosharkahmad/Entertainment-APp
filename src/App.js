import './App.css';
import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
   <Button type="primary"><Link to="/GenreIds">Primary Button</Link></Button>
    </div>
  );
}

export default App;
