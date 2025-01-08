import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();
  const resetToken = token;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://auth-backend-3-mw39.onrender.com/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      navigate('/login', { state: { message: 'Mot de passe réinitialisé avec succès' } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Réinitialiser le mot de passe
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Nouveau mot de passe</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;