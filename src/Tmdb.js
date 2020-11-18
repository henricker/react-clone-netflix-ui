const API_KEY = "6a63f62ca2ef650371ba6847e5f52642";
const API_BASE = "https://api.themoviedb.org/3";

/*
- Originais da netflix
- recomendados (trending)
- em alta (top rated)
- acao
- comedia
- terror
- romance
- documentarios
*/

const basicFeatch = async (endpoint) => {
    const request = await fetch(`${API_BASE}${endpoint}`);
    const json = await request.json();

    return json;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais da Netflix",
        items: await basicFeatch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: "trending",
        title: "Recomendados para você",
        items: await basicFeatch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: "toprated",
        title: "Em alta",
        items: await basicFeatch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: "action",
        title: "Ação",
        items: await basicFeatch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await basicFeatch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: "horror",
        title: "Terror",
        items: await basicFeatch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFeatch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: "documentary",
        title: "Documentário",
        items: await basicFeatch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
      },
    ];
  },

  getMovieInfo: async (elementId, typeElement) => {
    let info = {}

    if(elementId) {

      switch(typeElement) {
        case 'movie':
          info = await basicFeatch(`/movie/${elementId}?language=pt-BR&api_key=${API_KEY}`)
          break;
        case 'tv':
          info = await basicFeatch(`/tv/${elementId}?language=pt-BR&api_key=${API_KEY}`)
          break;
        default:
          info = null;
          break;
      }
    }

    return info;
  }
};
