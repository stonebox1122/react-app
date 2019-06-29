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