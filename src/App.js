import React, { useEffect, useState }from 'react';
import Tmdb from './Tmdb';

//import components
import MovieRow from './components/movieRow';
import FeatureMovie from './components/featureMovie';
import Header from './components/Header';
import './App.css';
// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>{

  const [MovieList, setMovieList] = useState([]);
  const [FeatureData, setFeatureData] = useState(null);
  const [headerBlack, setHeaderBlack] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //take all movies list
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //take feature movie element
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen =  Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10)
        setHeaderBlack(true);
      else
        setHeaderBlack(false);
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])
    

  return (
  <div className="page">

    <Header black={headerBlack}/>

    {FeatureData && 
      <FeatureMovie item={FeatureData}/>
    }
    <section className="list">
      {MovieList.map((item, key) => (
        < MovieRow key={key} title={item.title} items={item.items}/>
      ))
      }
    </section>

    <footer>
      <p>Made with <span role="img" aria-label="coração">❤️</span> by: Henrique Vieira</p>
      <p>Image rights to netflix</p>
      <p>Data taken from the API of themoviedb.org website</p>
      <p>Interface clone created to learn react js</p>
    </footer>

    {MovieList.length <= 0 &&
      <div className="loading">
        <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando"></img>
      </div>
    }

  </div>
  );
}