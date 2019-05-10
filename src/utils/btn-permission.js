import Vue from 'vue'
import store from '@/store'
const _has = val => {
  const isShow = false
  const permissionStr = store.getters.roles
  if (permissionStr === undefined || permissionStr == null) {
    return isShow
  }
  if (permissionStr.indexOf(val) > -1) {
    return true
  }
  return isShow
}
Vue.directive('has', {
  inserted: function(el, binding, vnode) {
    const permissionsName = binding.value.permission
    if (!_has(permissionsName)) {
      el.parentNode.removeChild(el)
    }
  }
})
