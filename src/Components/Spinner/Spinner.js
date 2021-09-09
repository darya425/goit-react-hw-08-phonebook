import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner">
      <Loader type="Circles" color="#383838" height={100} width={100} />
    </div>
  );
};

export default Spinner;
