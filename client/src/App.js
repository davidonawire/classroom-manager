import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const url = 'http://localhost:5000/api/courses'
  
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
  
    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log('Fetched data: ', data));
  });

  return (
    <div className="App">
      <p>Component loaded. Check console.</p>
    </div>
  );
}

export default App;
