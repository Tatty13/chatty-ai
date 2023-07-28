import './SavedMessagesList.css';

export const SavedMessagesList = ({ savedMessages }) => {
  const savedMessagesList = savedMessages.map((item, i) => (
    <li
      key={i}
      className={`favorites__item favorites__item__sender_${item.sender}`}>
      <p className='favorites__item-text'>{item.content}</p>
      <div className='favorites__item-info'>
        <span className='favorites__item-date'>{item.date}</span>
        <button
          className='btn favorites_item-btn'
          type='button'
          aria-label='Удалить'
        />
      </div>
    </li>
  ));

  return (
    <div className='favorites__messages-wrap'>
      <ul className='list favorites__list'>{savedMessagesList}</ul>;
    </div>
  );
};
