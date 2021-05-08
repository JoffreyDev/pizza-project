import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories, SortPopup } from '../components';
import { PizzaBlock, LoadingBlock } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();

  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { sortBy, category } = useSelector(({ filters }) => filters);
  const cartItems = useSelector(({ cart }) => cart.items);

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [sortBy, category]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((index) => {
    dispatch(setSortBy(index));
  }, []);

  const hadleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickItem={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup onClickType={onSelectSortType} activeSortType={sortBy.type} items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items && isLoaded
          ? items.map((obj) => (
              <PizzaBlock
                onAddPizza={hadleAddPizzaToCart}
                cartCount={cartItems[obj.id] && cartItems[obj.id].length}
                key={obj.id}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
