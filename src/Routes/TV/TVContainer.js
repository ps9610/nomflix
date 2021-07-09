import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "api";

export default class extends React.Component {
  state = {
    onTheAir: null,
    popular: null,
    airingToday: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: onTheAir },
      } = await tvApi.onTheAir();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      //console.log(onTheAir, popular, airingToday);
      this.setState({ onTheAir, popular, airingToday });
    } catch {
      this.setState({
        error: "TV 프로그램 정보를 찾을 수 없습니다🥺",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { onTheAir, popular, airingToday, error, loading } = this.state;
    //console.log(this.state);
    return (
      <TVPresenter
        onTheAir={onTheAir}
        popular={popular}
        airingToday={airingToday}
        error={error}
        loading={loading}
      />
    );
  }
}
