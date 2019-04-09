import React, { Component } from "react";
import Stock from "../components/Stock";

class StockContainer extends Component {
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {/* render the list of stocks here */}
        {this.props.stocks.map((stock, i) => <Stock key={i} data={stock} handleClick={this.props.buy} />)}
      </div>
    );
  }
}

export default StockContainer;
