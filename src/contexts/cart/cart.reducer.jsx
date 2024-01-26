/**
 * Cart Reducer
 * Reducer in charge of handling cart changes that can take place in any component.
 */
function cartReducer(record, action) {
  switch(action.type) {
    case 'cart_changed': {
      return { 
        ...record, 
        totalQuantity: action.totalQuantity,
        prettyTotalQuantity: action.prettyTotalQuantity,
        totalAmount: action.totalAmount,
        items: action.items,
      }
    }
    default: {
      throw new Error(`Unknown Action Dispatched: ${action.type}`);
    }
  }
}




/**
 * Module Exports
 */
export default cartReducer;