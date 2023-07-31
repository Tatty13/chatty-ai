import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage = () => {
	return (
		<div className="notFoundPage">
			<div className="text">
				<h2 className="text__title">Oops...</h2>
				<p className="text__subtitle">
					It seems like you've stumbled upon our 404 page - 
					it's just like a tricky question, to which we 
					already know the answer, and we'll fix it soon! :)
				</p>
				<p className="text__subtitle">
					<span className='text__bold'>Share your funniest interview experience</span> - 
					we're here to laugh and support you on your 
					journey to your dream job!
				</p>
				<div className='text__field text__subtitle'>
					<p className='text__question'>
						Have you ever been asked any non-serious
					   questions during an interview? Or did a 
						question have a double meaning?
					</p>
				</div>
				<p className='text__subtitle'>Let's conquer interviews together 🚀😄</p>
				<div className='text__button-block text__subtitle'>
					<Link to="/" className="text__button">Go to Chat</Link>
				</div>
				
			</div>
		</div>
	)
};