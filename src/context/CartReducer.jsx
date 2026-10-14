
function CartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;

      if (!product || product.id == null) return state;

      const stock = Math.max(0, Number(product.stock) || 0);

      if (stock < 1) return state;

      const existingItem = state.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        return state.map((item) => {
          if (String(item.id) !== String(product.id)) {
            return item;
          }

          return {
            ...item,
            quantity: Math.min(item.quantity + 1, item.stock),
          };
        });
      }

      return [
        ...state,
        {
          ...product,
          price: Number(product.price) || 0,
          stock,
          quantity: 1,
        },
      ];
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      return state
        .map((item) => {
          if (String(item.id) !== String(id)) return item;

          const requestedQuantity = Math.floor(Number(quantity));

          return {
            ...item,
            quantity: Math.min(
              Math.max(1, requestedQuantity || 1),
              item.stock
            ),
          };
        })
        .filter((item) => item.stock > 0);
    }

    case "REMOVE_FROM_CART":
      return state.filter(
        (item) => String(item.id) !== String(action.payload)
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export default CartReducer;
