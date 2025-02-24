import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import UserForm from './components/UserForm';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-16">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  <Users size={48} className="text-blue-500" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  Portfolio Generator
                </h1>
                <p className="text-xl text-gray-600">
                  Create your professional portfolio in minutes
                </p>
              </div>
              <UserForm />
            </div>
          </div>
        } />
        <Route path="/portfolio/:name" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;