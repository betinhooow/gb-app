import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import AuthContext from './context/authContext'

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: "beto" }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
);

export default App;
