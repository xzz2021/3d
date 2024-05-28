// 获取壁厚
/*
 * originPoint 射线的原点
 * direction 射线的方向
 * geometry 模型的geometry数据
 */

import * as THREE from "three"

export const getThickness = (originPoint, direction, geometry) => {
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

/*
 * originPoint 射线的原点
 * dir 射线的方向
 * geometry 模型的geometry数据
 */
export const getIntersectionPoints = (originPoint, dir, geometry) => {
  const res = []
  if (!geometry.index) return []
  if (!geometry.isBufferGeometry) {
    console.log("'geometry' must be an indexed or non-indexed buffer geometry")
    return []
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
      const pointOfIntersection = intersectionTriangle(
        p1,
        p2,
        p3,
        originPoint,
        new THREE.Vector3(-dir.x, -dir.y, -dir.z),
        "doubleSide",
      )
      if (pointOfIntersection) {
        res.push(pointOfIntersection)
      }
    }
  } else {
    const index = geometry.index
    const faces = index.count / 3
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, index.array[i * 3 + 0])
      p2.fromBufferAttribute(position, index.array[i * 3 + 1])
      p3.fromBufferAttribute(position, index.array[i * 3 + 2])
      const pointOfIntersection = intersectionTriangle(
        p1,
        p2,
        p3,
        originPoint,
        new THREE.Vector3(-dir.x, -dir.y, -dir.z),
        "doubleSide",
      )
      if (pointOfIntersection) {
        res.push(pointOfIntersection)
      }
    }
  }
  // console.log(res)

  return res
}

// 检测一条射线和三角形是否相交
/*
 * pointA 三角形的点A
 * pointB 三角形的点B
 * pointC 三角形的点C
 * originPoint 射线的原点
 * dir 射线的方向
 * side 'front' | 'back' | 'doubleSide' 默认只检测正面
 */
export const intersectionTriangle = (pointA, pointB, pointC, originPoint, dir, side = "front") => {
  switch (side) {
    case "front":
      return _checkFront(pointA, pointB, pointC, originPoint, dir)
    case "back":
      return _checkBack(pointA, pointB, pointC, originPoint, dir)
    case "doubleSide":
      return _checkFront(pointA, pointB, pointC, originPoint, dir) || _checkBack(pointA, pointB, pointC, originPoint, dir)
    default:
      return null
  }
}

// 正面相交检测
const _checkFront = (pointA, pointB, pointC, originPoint, dir) => {
  const E1 = pointB.clone().sub(pointA)
  const E2 = pointC.clone().sub(pointA)
  const N = new THREE.Vector3().crossVectors(E1, E2)

  const det = -dir.dot(N)
  const invertDet = 1 / det
  const AO = originPoint.clone().sub(pointA)
  const DAO = new THREE.Vector3().crossVectors(AO, dir)
  const u = E2.dot(DAO) * invertDet
  const v = E1.dot(DAO) * invertDet * -1
  const t = AO.dot(N) * invertDet
  const flag = det <= 1e-6 && t >= 0 && u >= 0 && v >= 0 && u + v <= 1
  if (flag) {
    return originPoint.clone().add(dir.clone().multiplyScalar(t))
  } else {
    return null
  }
}

// 反面相交检测
const _checkBack = (pointA, pointB, pointC, originPoint, dir) => {
  const E1 = pointC.clone().sub(pointA)
  const E2 = pointB.clone().sub(pointA)
  const N = new THREE.Vector3().crossVectors(E1, E2)

  const det = -dir.dot(N)
  const invertDet = 1 / det
  const AO = originPoint.clone().sub(pointA)
  const DAO = new THREE.Vector3().crossVectors(AO, dir)
  const u = E2.dot(DAO) * invertDet
  const v = E1.dot(DAO) * invertDet * -1
  const t = AO.dot(N) * invertDet
  const flag = det <= 1e-6 && t >= 0 && u >= 0 && v >= 0 && u + v <= 1
  if (flag) {
    return originPoint.clone().add(dir.clone().multiplyScalar(t))
  } else {
    return null
  }
}
