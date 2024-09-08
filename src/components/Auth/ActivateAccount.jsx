import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ActivateAccount = () => {
  const { token } = useParams();
  const { activateAccount } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const activate = async () => {
      const result = await activateAccount(token);
      setMessage(result.message);
      if (result.success) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    };
    activate();
  }, [token, activateAccount, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96 text-center">
        <h2 className="text-xl mb-4">Account Activation</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ActivateAccount;
