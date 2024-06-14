const onMouseClick = event => {
  // 将鼠标位置转换到归一化设备坐标 (NDC) 中 (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera.value)

  // 计算物体和射线的相交点
  const intersects = raycaster.intersectObject(scene, true)

  if (intersects.length > 0) {
    const intersect = intersects[0]
    const point = intersect.point
    selectedPoints.push(point)

    // 可视化选中的点
    const sphere = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const sphereMesh = new THREE.Mesh(sphere, material)
    sphereMesh.position.copy(point)
    scene.add(sphereMesh)

    if (selectedPoints.length === 2) {
      measureDistance(selectedPoints[0], selectedPoints[1])
    }
  }
}

const createShell = (geometry, offset) => {
  const shellGeometry = geometry.clone()
  const position = shellGeometry.attributes.position
  const normal = new THREE.Vector3()

  for (let i = 0; i < position.count; i++) {
    normal.fromBufferAttribute(geometry.attributes.normal, i)
    position.setXYZ(
      i,
      position.getX(i) + normal.x * offset,
      position.getY(i) + normal.y * offset,
      position.getZ(i) + normal.z * offset,
    )
  }
  shellGeometry.attributes.position.needsUpdate = true

  return shellGeometry
}

const detectWallThickness = (mesh, threshold) => {
  const raycaster = new THREE.Raycaster()
  const position = mesh.geometry.attributes.position
  const faces = position.count / 3

  for (let i = 0; i < faces; i++) {
    const a = new THREE.Vector3().fromBufferAttribute(position, i * 3)
    const b = new THREE.Vector3().fromBufferAttribute(position, i * 3 + 1)
    const c = new THREE.Vector3().fromBufferAttribute(position, i * 3 + 2)

    const midpoint = new THREE.Vector3().addVectors(a, b).add(c).divideScalar(3)
    const normal = new THREE.Triangle(a, b, c).getNormal(new THREE.Vector3())

    raycaster.set(midpoint, normal.negate())
    const intersects = raycaster.intersectObject(mesh)

    if (intersects.length > 0 && intersects[0].distance < threshold) {
      highlightFace(mesh, i, 0xff0000) // 高亮颜色为红色
    }
  }
}

const highlightFace = (mesh, faceIndex, color) => {
  const position = mesh.geometry.attributes.position
  const colors = new Float32Array(position.count * 3)
  const colorVec = new THREE.Color(color)

  for (let i = 0; i < 3; i++) {
    colors[(faceIndex * 3 + i) * 3] = colorVec.r
    colors[(faceIndex * 3 + i) * 3 + 1] = colorVec.g
    colors[(faceIndex * 3 + i) * 3 + 2] = colorVec.b
  }

  mesh.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  mesh.material = new THREE.MeshPhongMaterial({ vertexColors: true, side: THREE.DoubleSide })
}
