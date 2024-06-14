export const getALLInformation = obj => {
  const model3d = get3dInformation(obj.box)
  return { model3d }
}

const get3dInformation = box => {
  // 获取模型的宽高
  const model = {}
  model.width = box.max.x - box.min.x
  model.height = box.max.y - box.min.y
  model.depth = box.max.z - box.min.z
  // 计算模型的包装盒体积
  model.volume = model.width * model.height * (box.max.z - box.min.z)
  for (const [key, value] of Object.entries(model)) {
    model[key] = Math.round(value * 1000) / 1000
  }
  return model
}
