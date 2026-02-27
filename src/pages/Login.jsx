import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = \\@company.local\; 
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pin,
    });

    if (error) {
      alert("Invalid username or PIN");
    } else {
      const { data: empData } = await supabase
        .from('employees')
        .select('role')
        .eq('code', username)
        .single();
        
      localStorage.setItem('userRole', empData?.role || 'staff');
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee Login</h2>
        <input 
          type="text" 
          placeholder="Username / Code" 
          className="w-full mb-4 p-2 border rounded"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="PIN" 
          className="w-full mb-6 p-2 border rounded"
          value={pin} 
          onChange={(e) => setPin(e.target.value)} 
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
