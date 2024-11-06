import React from 'react';
import { Button } from "@/components/ui/button";
import { Routes, Route, Link } from 'react-router-dom'; // For navigation
import ShowComponent from './components/ShowComponent'; // Displays list of posts
import CreateComponent from './components/CreateComponent'; // Form to create new post
import './App.css'; // Import your styles if necessary

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/show"><Button>View Posts</Button></Link></li>
          <br/><br/>
          <li><Link to="/create"><Button>Create Post</Button></Link></li>
        </ul>
      </nav>

      <Routes>
        {/* Route to display all posts */}
        <Route path="/show" element={<ShowComponent />} />

        {/* Route to create a new post */}
        <Route path="/create" element={<CreateComponent />} />

        {/* Default Route */}
        <Route path="/" element={<h1>Welcome to the Post Manager</h1>} />
      </Routes>
    </div>
  );
};

export default App;
