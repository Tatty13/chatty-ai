import React from 'react';
import './Articles.css';
import TabsNav from '../../components/TabsNav/TabsNav';
import ArticlesContainer from '../../components/ArticlesContainer/ArticlesContainer';

export const Articles = () => {

  return (
  <section className="articles">
    <TabsNav />
    <ArticlesContainer />
  </section>);
};