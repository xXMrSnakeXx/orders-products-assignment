import { CircleLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <CircleLoader color="#4caf50" size={150} />
    </div>
  );
};

export default Loader;
