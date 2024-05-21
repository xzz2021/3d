/* eslint-disable no-undef */

export const useLabel = () => {
  // 创建尺寸信息标签
  // 创建尺寸信息标签
  const createLabel2 = (text, position) => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context.font = "48px Arial"
    context.fillStyle = "white"
    context.fillText(text, 0, 50)

    const texture = new THREE.CanvasTexture(canvas)
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(2, 1, 1) // 调整标签的大小
    sprite.position.copy(position)
    return sprite
  }

  // 创建并添加X轴尺寸标签
  const xLabel = createLabel2(`X: ${size.x.toFixed(3)}`, new THREE.Vector3(box.max.x, box.min.y, box.min.z))
  scene.add(xLabel)

  // 创建并添加Y轴尺寸标签
  const yLabel = createLabel2(`Y: ${size.y.toFixed(3)}`, new THREE.Vector3(box.min.x, box.max.y, box.min.z))
  scene.add(yLabel)

  // 创建并添加Z轴尺寸标签
  const zLabel = createLabel2(`Z: ${size.z.toFixed(3)}`, new THREE.Vector3(box.min.x, box.min.y, box.max.z))
  scene.add(zLabel)
}
