import React from "react";
import { Link } from 'react-router-dom';
import './ArticlesContainer.css';
import articlesData from "./articlesData";

const ArticlesContainer = () => {
	return(
		<div className='articles-container'>
		<button className='slider slider_type_left'></button>
		  <div className='articles-slider'>
			 <ul className='elements'>
			 {articlesData.map((article) => (
					<Link key={article.id} to={`/articles/${article.id}`}>
						<li className='element'>
							<div className='element__block'>
							<img className='element__img' src={article.urlImage} alt={article.title} />
							<h2 className='element__title'>{article.title}</h2>
							<p className='element__subtitle'>{article.subtitle}</p>
							</div>
						</li>
					</Link>
				))}
			 </ul>
		  </div>
		  <button className='slider slider_type_right'></button>
		</div>
	)
}

export default ArticlesContainer;