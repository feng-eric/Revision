import { userActionConstants } from '../constants';

export function registration(state = {}, action) {
    switch (action.type) {
      case userActionConstants.REGISTER_REQUEST:
        return { registering: true };
      case userActionConstants.REGISTER_SUCCESS:
        return {};
      case userActionConstants.REGISTER_FAILURE:
        return {};
      default:
        return state
    }
  }