import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi } from "../../api";
import { tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      keywords: null,
      similar: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    // console.log(this.props);

    const { isMovie } = this.state;
    //console.log(this.state);

    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
        const {
          data: { keywords: keywords },
        } = await moviesApi.keyword(parsedId);
        this.setState({ keywords });
        const {
          data: { results: similar },
        } = await moviesApi.similar(parsedId);
        this.setState({ similar });
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        const {
          data: { results: keywords },
        } = await tvApi.keyword(parsedId);
        this.setState({ keywords });
        const {
          data: { results: similar },
        } = await tvApi.similar(parsedId);
        this.setState({ similar });
      }
    } catch {
      this.setState({ error: "Can't find any results" });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, loading, error, keywords, similar } = this.state;
    //console.log(result);
    return (
      <DetailPresenter
        result={result}
        loading={loading}
        error={error}
        keywords={keywords}
        similar={similar}
      />
    );
  }
}
