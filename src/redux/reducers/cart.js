const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_TO_CART':
      const currentPizzasItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzasItems,
          totalPrice: [].concat
            .apply([], Object.values(currentPizzasItems))
            .reduce((sum, obj) => obj.price + sum, 0),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const allPizzas = [].concat.apply([], items);
      const totalPrice = allPizzas.reduce((sum, obj) => obj.price + sum, 0);

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice: totalPrice,
      };

      break;

    case 'DEL_PIZZA_FROM_CART':
      delete state.items[action.payload];
      const itemsDeleted = Object.values(state.items).map((obj) => obj.items);
      const allPizzasDeleted = [].concat.apply([], itemsDeleted);
      const totalPriceDeleted = allPizzasDeleted.reduce((sum, obj) => obj.price + sum, 0);

      return {
        ...state,
        items: state.items,
        totalCount: allPizzasDeleted.length,
        totalPrice: totalPriceDeleted,
      };

      break;

    case 'DEL_ALL_PIZZAS_FROM_CART':
      return {
        ...state,
        items: {},
        totalCount: 0,
        totalPrice: 0,
      };
  }
  return state;
};

export default cart;
