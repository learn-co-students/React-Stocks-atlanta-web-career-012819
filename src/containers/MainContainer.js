import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

const API = "http://localhost:3000/stocks";

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      portfolio: [],
      type: "All",
      sortBy: null
    };
  }

  buy = stock => {
    if (!this.state.portfolio.includes(stock)) {
      this.setState({
        portfolio: [...this.state.portfolio, stock]
      });
    }
  };

  remove = stock => {
    const i = this.state.portfolio.indexOf(stock);
    this.setState({
      portfolio: [
        ...this.state.portfolio.slice(0, i),
        ...this.state.portfolio.slice(i + 1)
      ]
    });
  };

  handleFilter = e => {
    this.setState({
      type: e.target.value
    });
  };

  handleSort = e => {
    this.setState({
      sortBy: e.target.value
    });
  };

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ stocks: data }));
  }

  render() {
    const sorted = this.state.sortBy
      ? this.state.stocks.sort((a, b) => {
          if (this.state.sortBy === "Alphabetically") {
            if (a.ticker > b.ticker) return 1;
            else if (a.ticker < b.ticker) return -1;
            else return 0;
          } else if (this.state.sortBy === "Price") {
            return a.price - b.price;
          } else return 0;
        })
      : this.state.stocks;

    const filtered =
      this.state.type === "All"
        ? sorted
        : sorted.filter(stock => stock.type === this.state.type);

    return (
      <div>
        <SearchBar
          handleSort={this.handleSort}
          sortBy={this.state.sortBy}
          handleFilter={this.handleFilter}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer stocks={filtered} buy={this.buy} />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={this.state.portfolio}
              remove={this.remove}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
