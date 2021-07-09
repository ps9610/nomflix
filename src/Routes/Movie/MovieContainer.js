import React from "react";
import MoviePresenter from "./MoviePresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      //console.log(nowPlaying);
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      //console.log(upcoming);
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      //console.log(popular);
      this.setState({
        nowPlaying,
        upcoming,
        popular,
      });
    } catch {
      this.setState({
        error: "영화 정보를 찾을 수 없습니다🥺",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    //console.log(this.state);
    return (
      <MoviePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
