import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Register:', formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#6B4423] mb-6 text-center">
        Create Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#6B4423] mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#6B4423] mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="input-field"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="w-full btn-primary">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-[#6B4423]">
        Already have an account?{' '}
        <Link to="/login" className="text-peach hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Register;