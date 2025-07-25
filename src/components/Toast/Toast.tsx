import React, { useEffect } from 'react';
import { FiX, FiCheck, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <FiCheck size={16} />;
      case 'error': return <FiX size={16} />;
      case 'warning': return <FiAlertTriangle size={16} />;
      case 'info': return <FiInfo size={16} />;
    }
  };

  return (
    <div className={`toast toast-${type} fade-in`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      <div className="toast-content">
        <span className="toast-message">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="toast-close"
        aria-label="Close notification"
      >
        <FiX size={14} />
      </button>
    </div>
  );
};

export default Toast;