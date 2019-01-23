/**
 * Reducer 数据处理
 */
const initialState = {
  menuName: '首页'
};

export default (state=initialState, action) => {
  switch (action) {
    case action.type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      }
    default:
      break;
  }
}