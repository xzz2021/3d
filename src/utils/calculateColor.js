import pantoneC from "./pantoneC.json"
import pantoneU from "./pantoneU.json"

export const pantoneColors = [...pantoneC, ...pantoneU]

// 计算两个RGB颜色之间的距离（欧几里得距离）
const colorDifference = (rgb1, rgb2) => {
  let rDiff = Math.pow(rgb1[0] - rgb2[0], 2) // 计算红色分量的平方差
  let gDiff = Math.pow(rgb1[1] - rgb2[1], 2) // 计算绿色分量的平方差
  let bDiff = Math.pow(rgb1[2] - rgb2[2], 2) // 计算蓝色分量的平方差
  return Math.sqrt(rDiff + gDiff + bDiff) // 返回平方根作为距离
}

// 找到最接近的N个Pantone颜色
export const closestPantoneColors = (rgbColor, pantoneArr, count = 10) => {
  let distances = [] // 存储每个Pantone颜色的距离

  // 遍历所有Pantone颜色，计算与目标RGB颜色的距离
  pantoneArr.map(item => {
    let pantoneRgb = item.rgb
    let diff = colorDifference(rgbColor, pantoneRgb)
    distances.push({ pantone: item, diff }) // 保存Pantone颜色及其距离
  })

  // 按距离从小到大排序
  distances.sort((a, b) => a.diff - b.diff)

  // 返回最接近的N个Pantone颜色
  return distances.slice(0, count).map(item => item.pantone)
}

export const getPantoneUC = rgbColor => {
  return {
    pantoneU: closestPantoneColors(rgbColor, pantoneU),
    pantoneC: closestPantoneColors(rgbColor, pantoneC),
  }
}
