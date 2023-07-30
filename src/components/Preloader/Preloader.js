import './Preloader.css';

export const Preloader = ({ place }) => {
  return (
    <div className={`preloader-wrap preloader-wrap_place_${place}`}>
      <div className='preloader' />
    </div>
  );
};
