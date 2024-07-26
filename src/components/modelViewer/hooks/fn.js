import * as THREE from "three"

//  独立于模型渲染之外的功能函数
export const useFn = () => {
  const isFullscreen = ref(false)
  const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
  }

  const dialogTableVisible = ref(!true)
  const openDialog = () => {
    setTimeout(() => {
      dialogTableVisible.value = true
    }, 300)
  }

  //  恢复模型（相机） 初始状态
  const restoreCarmera = (camera, controls, initialStatus) => {
    //  固定的初始 状态
    const { savedPosition, savedRotation, controlsarget } = initialStatus
    //  为何要传递参数？  因为数据不是响应式的， 模型加载后 变更后的参数只能实时传递？？
    camera.position.copy(savedPosition)
    camera.rotation.copy(savedRotation)
    // camera.zoom = savedZoom
    camera.updateProjectionMatrix()
    controls.target.copy(controlsarget)
    controls.update()
  }

  const getALLInformation = (box, geometry) => {
    // 获取模型的宽高
    const model3d = {}
    model3d.width = box.max.x - box.min.x
    model3d.height = box.max.y - box.min.y
    model3d.depth = box.max.z - box.min.z
    // 计算模型的包装盒体积

    for (const [key, value] of Object.entries(model3d)) {
      model3d[key] = Number(value.toFixed(2))
    }
    const { volume, surfaceArea } = calVolume(geometry)
    model3d.volume = volume
    model3d.surfaceArea = surfaceArea

    return model3d
  }

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

  //  计算体积和表面积
  const calVolume = geometry => {
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

  const autoResize = (camera, renderer) => {
    nextTick(() => {
      const width = document.getElementById("threecontainer").offsetWidth
      const height = document.getElementById("threecontainer").offsetHeight
      // console.log("🚀: autoResize -> width", width)
      // console.log("🚀: autoResize -> height", height)
      // camera.zoom = width / 4
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })
  }

  return {
    isFullscreen,
    toggleFullscreen,
    dialogTableVisible,
    openDialog,
    restoreCarmera,
    // getModelView,
    getALLInformation,
    autoResize,
  }
}
