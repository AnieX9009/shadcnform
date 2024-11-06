import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ShowComponent from './components/ShowComponent';
import './index.css'; // Keep this if you're using global CSS styles

const Index: React.FC = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/show' element={<ShowComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Index />);

// Remove or keep reportWebVitals if needed for performance tracking
