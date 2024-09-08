import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const result = await forgotPassword(email);
    setMessage(result.message);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleForgotPassword}>
        <h2 className="text-xl mb-4">Forgot Password</h2>
        {message && <div className="mb-4 text-green-500">{message}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="block w-full mb-3 p-2 border"
          required
        />
        <button type="submit" className="bg-yellow-500 text-white p-2 rounded w-full">
          Send Reset Link
        </button>
        <p className="mt-4 text-sm">
          Remembered your password? <a href="/" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
