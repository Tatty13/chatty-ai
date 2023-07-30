export const ChatSendBtn = ({ isDisabled }) => {
  return (
    <button
      type='submit'
      className='btn chat__btn chat__send-btn'
      area-aria-label='send'
      disabled={isDisabled}
    />
  );
};
