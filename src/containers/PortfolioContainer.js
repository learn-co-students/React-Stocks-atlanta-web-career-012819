import React, { Component } from "react";
import Stock from "../components/Stock";

class PortfolioContainer extends Component {
  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.stocks.map((stock, i) => (
          <Stock key={i} data={stock} handleClick={this.props.remove} />
        ))}
      </div>
    );
  }
}

export default PortfolioContainer;
