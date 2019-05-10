
export const getMainHeight = () => {
  const navHeight = document.querySelector('.navbar') == null ? 55 : document.querySelector('.navbar').offsetHeight
  // const tagsHeight = document.querySelector('.navbar') == null ? 34 : document.querySelector('.tags-view-wrapper').offsetHeight
  const windowHeight = document.body.clientHeight
  // 计算表格的高度用
  const mainContentPadding = windowHeight - navHeight - 20
  return mainContentPadding >= 400 ? mainContentPadding : 400
}
export const getBtnHeigh = () => {
  const btnHeight = document.querySelector('.btn-row') == null ? 0 : document.querySelector('.btn-row').offsetHeight
  return btnHeight
}
export const tableHeigh = () => {
  return parseInt(getMainHeight() - getBtnHeigh() - 86, 10)
}

