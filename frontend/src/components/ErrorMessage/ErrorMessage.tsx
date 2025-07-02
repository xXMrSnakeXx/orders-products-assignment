interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <p className="text-danger fw-bold fs-5 text-center">{message}</p>
    </div>
  );
};

export default ErrorMessage;
