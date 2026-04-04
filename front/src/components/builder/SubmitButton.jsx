import React from 'react';

function SubmitButton({ 
  text = 'Submit', 
  onClick, 
  disabled = false, 
  loading = false,
  className = ''
}) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || loading}
      className={`submit-button ${className} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
};

export default SubmitButton;
