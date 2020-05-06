import React from 'react';
import { Container, Toast } from './styles';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

const ToastContainer: React.FC = () => {
  return (
    <Container>
    <Toast type="info">
      <FiAlertCircle size={20} />

      <div>
        <strong>Erro</strong>
        <p>Descricao erro</p>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </Toast>
      <Toast type="error">
        <FiAlertCircle size={20} />

        <div>
          <strong>Erro</strong>
          <p>Descricao erro</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
      <Toast type="success">
        <FiAlertCircle size={20} />

        <div>
          <strong>Erro</strong>
          <p>Descricao erro</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
    </Container>
  )
}

export default ToastContainer;
