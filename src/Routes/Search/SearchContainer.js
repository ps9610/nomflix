import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi } from "api";
import { tvApi } from "api";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    //console.log(event);
    this.setState({ searchTerm: value });
  };

  /*     componentDidMount(){
        this.handleSubmit();
    }
 */
  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      //console.log(movieResults, tvResults);
      this.setState({ movieResults, tvResults });
    } catch {
      this.setState({
        error: `검색 결과를 불러오는 도중에 오류가 발생했습니다🥺`,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    //console.log(this.state);
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
