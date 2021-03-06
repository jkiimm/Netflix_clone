import React, { useState, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

function HomeApi() {
  const defaultState = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true
  };

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    try {
      const getMovieInfo = async () => {
        const {
          data: { results: nowPlaying }
        } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming }
        } = await moviesApi.upcoming();
        const {
          data: { results: popular }
        } = await moviesApi.popular();

        setState({
          nowPlaying,
          upcoming,
          popular,
          loading: false
        });
        // == setState({nowPlaying:nowPlaying ---})
      };
      getMovieInfo();
    } catch {
      setState({
        error: "Can't find moives information",
        loading: false
      });
    }
  }, []);

  const { nowPlaying, upcoming, popular, error, loading } = state;
  return (
    <HomePresenter>
      nowPlaying={nowPlaying}
      upcoming={upcoming}
      popular={popular}
      error={error}
      loading={loading}
    </HomePresenter>
  );
}

export default HomeApi;
// export default class extends React.Component {
//   state = {
//     nowPlaying: null,
//     upcoming: null,
//     popular: null,
//     error: null,
//     loading: true
//   };

//   async componentDidMount() {
//     try {
//       const {
//         data: { results: nowPlaying }
//       } = await moviesApi.nowPlaying();
//       const {
//         data: { results: upcoming }
//       } = await moviesApi.upcoming();
//       const {
//         data: { results: popular }
//       } = await moviesApi.popular();
//       console.log(nowPlaying);
//       this.setState({
//         nowPlaying,
//         upcoming,
//         popular
//       });
//     } catch {
//       this.setState({
//         error: "Can't find movies information."
//       });
//     } finally {
//       this.setState({
//         loading: false
//       });
//     }
//   }

//   render() {
//     const { nowPlaying, upcoming, popular, error, loading } = this.state;
//     return (
//       <HomePresenter>
//         nowPlaying={nowPlaying}
//         upcoming={upcoming}
//         popular={popular}
//         error={error}
//         loading={loading}
//       </HomePresenter>
//     );
//   }
// }
