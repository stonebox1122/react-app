// 保留两位小数
export const toFixed2 = (num) => {
  let number = parseFloat(num);
  if (typeof number !== 'number') {
    return num
  } else {
    number = number.toFixed(2)
  }
  return number
}

/**
 * 手机号的正则判断
 */
export const testPhoneNum = num => {
  let numReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|(199))\d{8}$/
  if (numReg.test(num)) {
    return true
  } else {
    return false
  }
}

/**
 * 存入localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}