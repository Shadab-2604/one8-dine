const LoadingSpinner = ({ size = 40, fullPage = true }) => {
  const spinner = (
    <div
      style={{
        width: size,
        height: size,
        border: '2px solid rgba(212,175,55,0.15)',
        borderTop: '2px solid #D4AF37',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );

  if (!fullPage) return spinner;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
      }}
    >
      {spinner}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LoadingSpinner;
