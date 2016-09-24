const initialState = {
  notifications: { toggled: false, disabled: true }
}

export default function (state = initialState, action) {
  switch (action.type) {
  case 'SETTING_NOTIFICATIONS_CHANGED': {
    const toggled = action.toggled !== undefined ? action.toggled : state.notifications.toggled
    const disabled = action.disabled !== undefined ? action.disabled : state.notifications.disabled
    return { ...state, notifications: { toggled, disabled } }
  }

  default:
    return state
  }
}
