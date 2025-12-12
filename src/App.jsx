import { useState } from 'react'
import './App.css'
import Header from './Componets/Header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router' // ← Sin BrowserRouter
import WatchList from './pages/WatchList'
import Series from './pages/Series'
import Movies from './pages/Movies'
import Search from './pages/Search'
import Login  from  './pages/Login'
import Signup  from  './pages/Signup'
import NotFound from './pages/NotFound'
import { AuthProvider } from './contexts/authContext';
import { useAuth } from './hooks/useAuth';
import Dashboard from './Componets/dashboard/Dashboard';

const AuthContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <Header />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/watchList' element={<WatchList />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<Series />} />
            <Route path='/search' element={<Search />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="w-full">
        {/* ← SIN <Router> aquí */}
        <AuthProvider>
          <AuthContent />
        </AuthProvider>
      </div>
    </div>
  )
}

export default App