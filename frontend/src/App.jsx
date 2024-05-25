import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import CustomCard from './components/demo/CustomCard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/task/new" element={<CustomCard />} />
                <Route path="/task/:id" element={<CustomCard  />} />
            </Routes>
        </Router>
    );
};

export default App;
