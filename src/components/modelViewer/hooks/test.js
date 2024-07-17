// 获取壁厚
export function getThickness(originPoint, direction, geometry) {
  const points1 = getIntersectionPoints(originPoint, direction, geometry)
  const points2 = getIntersectionPoints(originPoint, new THREE.Vector3(-direction.x, -direction.y, -direction.z), geometry)
  const points = [...points1, ...points2]
  points.sort((a, b) => {
    return a.distanceTo(originPoint) - b.distanceTo(originPoint)
  })
  if (points.length >= 2) {
    return {
      allPoints: points,
      distance: points[0].distanceTo(points[1]),
    }
  }
  return {
    allPoints: [],
    distance: 0,
  }
}

// 获取模型与射线的交点
export function getIntersectionPoints(originPoint, dir, geometry) {
  const res = []
  if (!geometry.index) return res
  if (!geometry.isBufferGeometry) {
    console.log("'geometry' must be an indexed or non-indexed buffer geometry")
    return res
  }
  const isIndexed = geometry.index !== null
  const position = geometry.attributes.position
  const p1 = new THREE.Vector3(),
    p2 = new THREE.Vector3(),
    p3 = new THREE.Vector3()

  if (!isIndexed) {
    const faces = position.count / 3
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, i * 3 + 0)
      p2.fromBufferAttribute(position, i * 3 + 1)
      p3.fromBufferAttribute(position, i * 3 + 2)
      // 这里可以根据需要进行射线与三角形的相交检测逻辑
      // 示例中仅简单地将顶点添加到结果数组
      res.push(p1.clone())
    }
  } else {
    const index = geometry.index
    const faces = index.count / 3
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, index.array[i * 3 + 0])
      p2.fromBufferAttribute(position, index.array[i * 3 + 1])
      p3.fromBufferAttribute(position, index.array[i * 3 + 2])
      // 同样，这里可以添加射线与三角形的相交检测逻辑
      // 示例中仅简单地将顶点添加到结果数组
      res.push(p1.clone())
    }
  }
  return res
}
