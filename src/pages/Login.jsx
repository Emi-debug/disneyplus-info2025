import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from './../assets/Images/logo.png';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/mockAuth';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      setEmail('');
      setPassword('');
      navigate('/'); 
    }
  };

  return (
    <div className="min-h-screen bg-[#040714] flex items-center justify-center px-4 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#040714] via-[#0c111b] to-[#040714]"></div>
      
     
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-md">

        <div className="text-center mb-8 flex items-center justify-center">
                  
          <img src={logo} className='w-[80px] md:w-[115px] object-cover ' alt="Logo"/>
                  
        </div>
       
        
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 shadow-2xl">
          <h2 className="text-white text-2xl font-semibold text-center mb-8">Log In</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                className="w-full bg-[#31343e] border border-[#31343e] text-white px-4 py-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                className="w-full bg-[#31343e] border border-[#31343e] text-white px-4 py-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
              />
            </div>

            {/* ← Muestra el error si existe */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/30"
            >
              LOG IN
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
