export const MicBtn = ({ isRecordStart, onClick }) => {
  return (
    <button
      type='button'
      className={`btn chat__btn chat__mic-btn ${
        isRecordStart && 'chat__mic-btn_active'
      }`}
      onClick={onClick}
    />
  );
};
