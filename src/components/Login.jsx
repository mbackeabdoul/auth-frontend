import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      setIsLoading(true);

      try {
        const response = await fetch('https://auth-backend-j34e.onrender.com/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message);
        }
        
        setSuccess('Connexion réussie !');
        localStorage.setItem('token', data.token);
        
        // Attendre un peu pour montrer le message de succès
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-3xl font-bold text-center text-gray-900">Connexion</h2>
          
          {error && (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-green-600 text-center">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="text-right">
              <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                Mot de passe oublié ?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>

            <div className="text-center mt-4">
              <p className="text-gray-600">Pas encore de compte ?</p>
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Créez un compte
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;