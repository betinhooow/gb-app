import React from 'react';
import { FiPower } from 'react-icons/fi';
import logoImg from '../../assets/icons/logo.svg';
import { Container, Header, HeaderContent, Profile } from './styles';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Agengss" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>Bem vindo,</div>
            <strong>{user.name}</strong>

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Profile>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
