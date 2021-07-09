import React from "react";
import HomePresenter from "./HomePresenter";
import { trendApi } from "api";

export default class extends React.Component {
  state = {
    trend: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: trend },
      } = await trendApi.trend();
      this.setState({ trend });
    } catch {
      this.setState({ error: "정보를 찾을 수 없습니다🥺" });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      swipe: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const { trend, error, loading } = this.state;
    //console.log(this.state);
    return (
      <HomePresenter
        settings={settings}
        trend={trend}
        error={error}
        loading={loading}
      />
    );
  }
}
