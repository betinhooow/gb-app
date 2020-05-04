import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Container, Background, Content } from './styles';
import logoImg from '../../assets/icons/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form>
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="login">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>

    <Background />
  </Container>
);

export default SignUp;
