import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import UserModel from "../model/userModel";
import logo from '../assets/Images/logo.png'

const SignUp = () => {
  const [formValues, setFormValues] = useState(new UserModel({}));

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formValues.username) {
      errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
      errors.username =
        "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.';";
    }

    if(!formValues.email){
errors.email="Email is required"
    }else if(!/\S+@\S+\.\S+/.test(formValues.email)){
      errors.email="Please enter a valid email address"
    }
    if (!formValues.mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formValues.mobile)) {
      errors.mobile = 'Mobile number should be 10 digits';
    }

    if (!formValues.password) {
      errors.password = 'Password is required';
    }
return errors;

  };


  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(formValues);
    
    const errors=validateForm();
    console.log(errors);
    if(Object.keys(errors).length===0){
      // alert("Form submitted")
    }else{
      // alert("Form Submission Failed");
      setFormErrors(errors);
    }
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register-user", formValues);
      console.log(response, 'res');

      if (response.data.success) {
          toast.success(response.data.message || 'Registration successful!');
          setFormValues({username:"",email:"",mobile:"",password:""});
          setFormErrors("");
      } else {
          toast.error(response.data.message || 'Registration failed!');
      }
  } catch (error) {
      console.error('Error during registration:', error);
      toast.error(error.response.data.message || "Something went wrong. Please try again later.");
  }
    
    

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };
  return (
    <div className="min-h-screen bg-[#040714] flex items-center 
    justify-center px-4 py-8 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b 
      from-[#040714] via-[#0c111b] to-[#040714]"></div>
      
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-md">
        
        <div className="text-center mb-8 flex items-center justify-center">
          
            <img src={logo} className='w-[80px] md:w-[115px] object-cover ' alt="Logo"/>
          
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 shadow-2xl">
          <h2 className="text-white text-2xl font-semibold text-center mb-8">Sign Up</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formValues.username}
                onChange={handleInputChange}
                className="w-full bg-[#31343e] border border-[#31343e] text-white px-4 py-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
              />
              {formErrors.username && (
                <span className="text-red-400 text-sm mt-1 block">{formErrors.username}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formValues.email}
                onChange={handleInputChange}
                className="w-full bg-[#31343e] border border-[#31343e] text-white px-4 py-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
              />
              {formErrors.email && (
                <span className="text-red-400 text-sm mt-1 block">{formErrors.email}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Mobile No
              </label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formValues.mobile}
                onChange={handleInputChange}
                className="w-full bg-[#31343e] border border-[#31343e] text-white px-4 py-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
              />
              {formErrors.mobile && (
                <span className="text-red-400 text-sm mt-1 block">{formErrors.mobile}</span>
              )}
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formValues.password}
                onChange={handleInputChange}
                className="w-full bg-[#31343e] border border-[#31343e] text-white px-4 py-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
              />
              {formErrors.password && (
                <span className="text-red-400 text-sm mt-1 block">{formErrors.password}</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/30 mt-2"
            >
              SIGN UP
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Login
            </Link>
          </p>
        </div>

        
      </div>
    </div>
  );
}

export default SignUp;
