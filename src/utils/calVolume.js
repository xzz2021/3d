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
  let SurfaceArea = (Area / 100).toFixed(2)
  console.log("表面积:" + SurfaceArea)
  let loadedObjectVolume = (volumes / 1000).toFixed(3)
  console.log("体积:" + loadedObjectVolume > 0 ? loadedObjectVolume : -loadedObjectVolume)
}
