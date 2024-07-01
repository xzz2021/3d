import * as THREE from "three"

const volumeOfTriangle = (p1, p2, p3) => {
  const result = p1.clone().cross(p2).dot(p3) / 6
  return result //p1叉乘p2点乘p3除以6
}

const AreaOfTriangle = (p1, p2, p3) => {
  var v1 = new THREE.Vector3()
  var v2 = new THREE.Vector3()
  // 通过两个顶点坐标计算其中两条边构成的向量
  v1 = p1.clone().sub(p2)
  v2 = p1.clone().sub(p3)
  var v3 = new THREE.Vector3()
  // 三角形面积计算
  v3.crossVectors(v1, v2)
  var s = v3.length() / 2
  return s
}

export const calVolume = geometry => {
  let Area = 0.0
  let volumes = 0.0
  // 计算体积和表面积
  let array = geometry.attributes.position.array
  for (let i = 0; i < array.length; i += 9) {
    // 对应三角形三个顶点
    let V1 = new THREE.Vector3(array[i], array[i + 1], array[i + 2])
    let V2 = new THREE.Vector3(array[i + 3], array[i + 4], array[i + 5])
    let V3 = new THREE.Vector3(array[i + 6], array[i + 7], array[i + 8])

    // volume 会产生负数..............
    volumes += volumeOfTriangle(V3, V2, V1)
    Area += AreaOfTriangle(V3, V2, V1)
  }
  const surfaceArea = Number(Area.toFixed(2))
  // console.log("表面积:", surfaceArea)
  const loadedObjectVolume = volumes.toFixed(2)
  //  此处计算的就是实际 体积  空心模型 内部三角不存在 不会计算
  // console.log("体积:", loadedObjectVolume > 0 ? loadedObjectVolume : -loadedObjectVolume, "cm³")
  const volume = loadedObjectVolume > 0 ? loadedObjectVolume : -loadedObjectVolume
  return {
    volume,
    surfaceArea,
  }
}

export const detectWallThickness = mesh => {
  const raycaster = new THREE.Raycaster()
  const position = geometry.attributes.position
  const faces = position.count / 3
  let minDistance = Number.MAX_VALUE

  for (let i = 0; i < faces; i++) {
    const a = new THREE.Vector3().fromBufferAttribute(position, i * 3)
    const b = new THREE.Vector3().fromBufferAttribute(position, i * 3 + 1)
    const c = new THREE.Vector3().fromBufferAttribute(position, i * 3 + 2)

    const midpoint = new THREE.Vector3().addVectors(a, b).add(c).divideScalar(3)
    const normal = new THREE.Triangle(a, b, c).getNormal()

    raycaster.set(midpoint, normal.negate())
    const intersects = raycaster.intersectObject(mesh)

    if (intersects.length > 0 && intersects[0].distance < minDistance) {
      minDistance = intersects[0].distance
    }
  }

  console.log(`Minimum wall thickness: ${minDistance}`)
}
