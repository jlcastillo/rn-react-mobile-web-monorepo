export const text = (state = 'Hello World', action) => {
    switch (action.type) {
      case 'SWITCH_TEXT':
        return action.text
      default:
        return state
    }
  }
  