import './SavedMessagesList.css';

export const SavedMessagesList = ({ savedMessages, onStarClick }) => {
  console.log('savedMessages', savedMessages);
  const savedMessagesList = savedMessages.map(
    ({ sender, content, date }, i) => (
      <li
        key={i}
        className={`favorites__item favorites__item__sender_${sender}`}>
        <p className='favorites__item-text'>{content}</p>
        <div className='favorites__item-info'>
          <span className='favorites__item-date'>{date}</span>
          <button
            className='btn favorites_item-btn'
            type='button'
            aria-label='Удалить'
            onClick={() => onStarClick({ sender, content })}
          />
        </div>
      </li>
    )
  );

  return (
    <div className='favorites__messages-wrap'>
      {savedMessages.length ? (
        <ul className='list favorites__list'>{savedMessagesList}</ul>
      ) : (
        <h2 className='favorites__no-messages'>There are no saved messages</h2>
      )}
    </div>
  );
};
