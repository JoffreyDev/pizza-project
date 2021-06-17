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
          totalCount: [].concat.apply([], Object.values(currentPizzasItems)).length,
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
      break;

    case 'ADD_CURRENT_PIZZA_COUNT':
      state.items[action.payload].items.push(state.items[action.payload].items[0]);

      state.items[action.payload].totalPrice =
        state.items[action.payload].items.length * state.items[action.payload].items[0].price;

      state.items[action.payload].totalCount += 1;

      const itemsSingleAdded = Object.values(state.items).map((obj) => obj.items);
      const allPizzasSingleAdded = [].concat.apply([], itemsSingleAdded);
      const totalPriceSingleAdded = allPizzasSingleAdded.reduce((sum, obj) => obj.price + sum, 0);

      return {
        ...state,
        items: state.items,
        totalCount: allPizzasSingleAdded.length,
        totalPrice: totalPriceSingleAdded,
      };

      break;

    case 'DEL_CURRENT_PIZZA_COUNT':
      state.items[action.payload].items.pop();

         state.items[action.payload].totalPrice =
            state.items[action.payload].items.length * state.items[action.payload].items[0].price

      state.items[action.payload].totalCount -= 1;

      const itemsSingleDeleted = Object.values(state.items).map((obj) => obj.items);
      const allPizzasSingleDeleted = [].concat.apply([], itemsSingleDeleted);
      const totalPriceSingleDeleted = allPizzasSingleDeleted.reduce(
        (sum, obj) => obj.price + sum,
        0,
      );

      return {
        ...state,
        items: state.items,
        totalCount: allPizzasSingleDeleted.length,
        totalPrice: totalPriceSingleDeleted,
      };
  }
  return state;
};

export default cart;
