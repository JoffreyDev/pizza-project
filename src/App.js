import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Cart } from './pages';
import { Header } from './components';
import axios from 'axios';
import { setPizzas as setPizzasAction } from './redux/actions/pizzas';
import { connect } from 'react-redux';
import store from './redux/store';

class App extends React.Component {
  componentDidMount() {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      this.props.dispatch(setPizzasAction(data.pizzas));
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Route path="/" render={() => <Home items={this.props.items} />} exact />
          <Route path="/cart" component={Cart} exact />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.pizzas.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPizzas: (items) => dispatch(setPizzasAction(items)),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
