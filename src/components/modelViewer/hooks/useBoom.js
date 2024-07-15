import * as THREE from "three"

export const useBoom = () => {
  const is3dm = ref(false)
  const ratioValue = ref(15)

  // 初始化爆炸数据保存到每个mesh的userdata上
  const initExplodeModel = modelObject => {
    if (!modelObject) return

    // 计算模型中心
    const explodeBox = new THREE.Box3()
    explodeBox.setFromObject(modelObject)
    const explodeCenter = getWorldCenterPosition(explodeBox)

    const meshBox = new THREE.Box3()

    // 遍历整个模型，保存数据到userData上，以便爆炸函数使用
    modelObject.traverse(function (value) {
      if (value.isLine || value.isSprite) return
      if (value.isMesh) {
        meshBox.setFromObject(value)

        const meshCenter = getWorldCenterPosition(meshBox)
        // 爆炸方向
        value.userData.worldDir = new THREE.Vector3().subVectors(meshCenter, explodeCenter).normalize()
        // 爆炸距离 mesh中心点到爆炸中心点的距离
        value.userData.worldDistance = new THREE.Vector3().subVectors(meshCenter, explodeCenter)
        // 原始坐标
        value.userData.originPosition = value.getWorldPosition(new THREE.Vector3())
        // mesh中心点
        value.userData.meshCenter = meshCenter.clone()
        value.userData.explodeCenter = explodeCenter.clone()
      }
    })
  }

  const getWorldCenterPosition = (box, scalar = 0.5) => {
    return new THREE.Vector3().addVectors(box.max, box.min).multiplyScalar(scalar)
  }
  // 模型爆炸函数  动态变化
  const explodeModel = (model, scalar) => {
    model.traverse(function (value) {
      if (!value.isMesh || !value.userData.originPosition) return
      const distance = value.userData.worldDir.clone().multiplyScalar(value.userData.worldDistance.length() * scalar)
      const offset = new THREE.Vector3().subVectors(value.userData.meshCenter, value.userData.originPosition)
      const center = value.userData.explodeCenter
      const newPos = new THREE.Vector3().copy(center).add(distance).sub(offset)
      const localPosition = value.parent?.worldToLocal(newPos.clone())
      localPosition && value.position.copy(localPosition)
    })
  }
  return {
    is3dm,
    ratioValue,
    initExplodeModel,
    explodeModel,
  }
}
