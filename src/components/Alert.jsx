import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AlertBox = styled.div`
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
  animation: ${props => props.isVisible ? slideIn : slideOut} 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${props => props.type === 'success' ? '#f0fdf4' : '#fef2f2'};
  border-left: 4px solid ${props => props.type === 'success' ? '#22c55e' : '#ef4444'};
`;

const Icon = styled.div`
  font-size: 20px;
  color: ${props => props.type === 'success' ? '#22c55e' : '#ef4444'};
`;

const Message = styled.p`
  margin: 0;
  color: ${props => props.type === 'success' ? '#166534' : '#991b1b'};
  font-size: 14px;
  font-weight: 500;
`;

const Alert = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // Wait for slide-out animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AlertContainer>
      <AlertBox type={type} isVisible={isVisible}>
        <Icon type={type}>
          {type === 'success' ? '✓' : '✕'}
        </Icon>
        <Message type={type}>{message}</Message>
      </AlertBox>
    </AlertContainer>
  );
};

export default Alert; 