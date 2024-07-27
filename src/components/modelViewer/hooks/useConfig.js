import * as THREE from "three"

export const useConfig = () => {
  //  初始化时添加灯光无效
  const addLight = (scene) => {
    // 添加灯光
    const strength = 1
    //  环境光 会影响 模型的颜色
    const ambientLight = new THREE.AmbientLight(0x7c7c7c, strength)
    scene.add(ambientLight)
    //   方向光 类似太阳和月亮   覆盖全场景
    
    // const directionArr = [
      //     { x: 1000, y: 0, z: 1000 },
      //     { x: 1000, y: 0, z: -1000 },
      //     { x: -1000, y: 0, z: 1000 },
      //     { x: -1000, y: 0, z: -1000 },
      //     { x: 0, y: 1000, z: 0 },
            //     { x: 0, y: -1000, z: 0 },
            //     ]
            // directionArr.map(item => {
            //         const { x, y, z } = item
            //         const directionaLight = new THREE.DirectionalLight(0xffffff, 0.4)
            //         directionaLight.castShadow = true
            //         directionaLight.position.set(x, y, z)
            //         scene.add(directionaLight)
            //         const helper = new THREE.DirectionalLightHelper(directionaLight, 5 );
            //         scene.add( helper );
            //     })
            //  跟随相机的光
            // const cameraLight = new THREE.DirectionalLight(0xffffff, 0.8)
            // cameraLight.castShadow = true
            // scene.add(cameraLight)
      }


  //  业务处理函数
  const clearScene = (scene) => {
    // 遍历场景中的所有对象
    while (scene.children.length > 0) {
      // 获取第一个子对象
      const object = scene.children[0]
      // scene.background = null
      // geometry（几何体）或material（材质）可以在3D物体之间共享,所以THREE不会主动移除
      // 如果对象是一个网格
      if (object.isMesh) {
        // 如果网格使用了几何体，释放几何体
        if (object.geometry) {
          object.geometry.dispose()
        }
        // 如果网格使用了材料，释放材料
        if (object.material) {
          if (Array.isArray(object.material)) {
            // 对于数组材料，遍历并释放每个材料
            object.material.forEach(material => material.dispose())
          } else {
            // 对于单个材料，直接释放
            object.material.dispose()
          }
        }
      }

      // 从场景中移除对象
      scene.remove(object)
    }

    // 可选：如果有需要，也可以清理其他资源，如纹理
  }

    //  变换视角
    const changeFace = (camera, i) => {
        //   0     1     4     5     3     2
        // +蓝z   -蓝z  +红x  -红x  -绿y   +绿y
        const distanceToOrigin = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
        const positionArr = [
          new THREE.Vector3(0, 0, distanceToOrigin), // 正上方
          new THREE.Vector3(0, 0, -distanceToOrigin), // 正下方
          new THREE.Vector3(0, -distanceToOrigin, 0), // 正左方
          new THREE.Vector3(0, distanceToOrigin, 0), // 正右方
          new THREE.Vector3(distanceToOrigin, 0, 0), // 正前方
          new THREE.Vector3(-distanceToOrigin, 0, 0), // 正后方
        ]
        camera.position.copy(positionArr[i])
      }

    
      const meshSize = ref(null)
      const  getMeshSize = mesh => {
        const box = new THREE.Box3().setFromObject(mesh)
        const center = box.getCenter(new THREE.Vector3())
        mesh.position.sub(center) // 将模型居中
        const size = box.getSize(new THREE.Vector3())
        meshSize.value =  { box, center, size }
        return { box, center, size }
      }

    const autoResize = (camera, renderer, size) => {
        nextTick(() => {
          const width = document.getElementById("threecontainer").offsetWidth
          const height = document.getElementById("threecontainer").offsetHeight
          const { x, y, z} = size
          camera.zoom = width/2/x/2
          camera.position.set(x + y , -y, z )
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        })
      }
  // 添加轴辅助器  原点坐标指示
  const addAxes = (size, scene) => {
    const max = Math.max(size.x, size.y, size.z)
    const axesHelper = new THREE.AxesHelper(max / 2 + 30)
    scene.add(axesHelper)
  }

  return {
    clearScene,
    changeFace,
    meshSize,
    getMeshSize,
    autoResize,
    addLight,
    addAxes,
    
  }
}
