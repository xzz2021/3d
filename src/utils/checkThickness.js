import * as THREE from "three"

export const checkThickness = mesh => {
  const raycaster = new THREE.Raycaster()
  const thicknesses = []

  mesh.traverse(child => {
    if (child.isMesh) {
      const geometry = child.geometry
      const positionAttribute = geometry.attributes.position
      const normalAttribute = geometry.attributes.normal

      for (let i = 0; i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3().fromBufferAttribute(positionAttribute, i)
        const normal = new THREE.Vector3().fromBufferAttribute(normalAttribute, i)

        // 将顶点坐标转换到世界坐标系
        vertex.applyMatrix4(child.matrixWorld)
        normal.applyMatrix4(child.matrixWorld).normalize()

        raycaster.set(vertex, normal)
        const intersects = raycaster.intersectObject(mesh, true)

        if (intersects.length > 1) {
          // 距离最近的第二个相交点
          const thickness = intersects[1].distance
          thicknesses.push(thickness)
        }
      }
    }
  })

  console.log("最小壁厚:", Math.min(...thicknesses))
  console.log("最大壁厚:", Math.max(...thicknesses))
}
