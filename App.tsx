import React, { useState } from 'react';
import MascotPanel from './components/MascotPanel';
import LoginForm from './components/LoginForm';
import { LoginState } from './types';
import CelebrationOverlay from './components/CelebrationOverlay';

const App: React.FC = () => {
  const [isShy, setIsShy] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>(LoginState.IDLE);

  const handleLogin = () => {
    setLoginState(LoginState.LOADING);
    
    // Simulate API call
    setTimeout(() => {
      setLoginState(LoginState.SUCCESS);
      // Reset after animation
      setTimeout(() => {
        setLoginState(LoginState.IDLE);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-100 overflow-hidden relative">
      
      {loginState === LoginState.SUCCESS && <CelebrationOverlay />}

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] transition-all duration-300">
        
        {/* Left Side: Interactive Illustration */}
        <div className="w-full md:w-1/2 bg-gray-50 relative overflow-hidden order-1 md:order-1 h-[300px] md:h-auto border-b md:border-b-0 md:border-r border-gray-100">
          <MascotPanel isShy={isShy} isCelebrating={loginState === LoginState.SUCCESS} />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex items-center justify-center order-2 md:order-2">
          <LoginForm 
            setIsShy={setIsShy} 
            onLogin={handleLogin} 
            loginState={loginState}
          />
        </div>
      </div>
    </div>
  );
};

export default App;