import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login:', formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#6B4423] mb-6 text-center">
        Welcome Back
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#6B4423] mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input-field"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#6B4423] mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="w-full btn-primary">
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-[#6B4423]">
        Don't have an account?{' '}
        <Link to="/register" className="text-peach hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;