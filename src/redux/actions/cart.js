export const addPizzaToCart = (pizzaObj) => ({
  type: 'ADD_PIZZA_TO_CART',
  payload: pizzaObj,
});

export const delPizzaFromCart = (id) => ({
  type: 'DEL_PIZZA_FROM_CART',
  payload: id,
});

export const delAllPizzasFromCart = () => ({
  type: 'DEL_ALL_PIZZAS_FROM_CART',
  payload: '',
});
