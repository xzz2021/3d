<template>
  <div ref="container" id="threecontainer">
    <AxisLine v-if="mesh" :camera2="camera" @backCarmera="backCarmera" @totastMesh="totastMesh(controls)" />
  </div>
  <div v-if="mesh">
    <button id="button" @click="toggleLabel">{{ labelStatus ? "开启" : "关闭" }}三维信息</button>
  </div>

  <div>模型信息:</div>
  <div>长: {{ modelView.height }}</div>
  <div>宽: {{ modelView.width }}</div>
  <div>高: {{ modelView.depth }}</div>
  <div>包装盒体积: {{ modelView.volume }}</div>
  <div>真实体积: {{ modelView.trueVolume }}</div>
  <div>重量: {{ modelView.weight }}</div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import * as THREE from "three"
import { useThree } from "../hooks/useThree.js"
import { useFace } from "../hooks/useFace.js"
import { useLoading } from "../hooks/useLoading.js"

import AxisLine from "./AxisLine.vue"

import { calVolume } from "../utils/calVolume.js"
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper.js"

// import { checkThickness } from "../utils/checkThickness.js"
// 接收props
const props = defineProps({
  modelPath: {
    type: String,
    default: "",
  },
  modelType: {
    type: String,
    default: "",
  },
})
// threejs   scene、mesh camera、renderer、controls 内部有只读属性的value  无法使用vue的响应式  ref 包裹

const container = ref(null)
const labelStatus = ref(false)
let mesh, pointLight, labelArr
let modelView = ref({})
const camera = ref(null)
let {
  scene,
  renderer,
  controls,
  gui,
  addBox,
  addArrow,
  addAxes,
  addGui,
  // addFaceGui,
  addEnvironment,
  changeFace,
  restoreCarmera,
  createLight,
  createControls,
  chooseLoader,
  createCarmera,
  getModelView,
  clearScene,
  LoadStep,
  LoadIges,
  getMeshAndSize,
  addLightOfCamera,
  totastMesh,
} = useThree()
let { sceneOrtho, cameraOrtho } = useFace(camera)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const selectedPoints = []

const measureDistance = (point1, point2) => {
  const distance = point1.distanceTo(point2)
  console.log("截面尺寸:", distance)
}

const { openLoading, closeLoading } = useLoading()
const loadModel = async (path, type) => {
  openLoading() // 开启加载效果
  clearScene() //  加载新模型前先清除旧场景所有对象
  window.removeEventListener("click", onMouseClick)
  let loadView
  //  特殊3d文件类型判断, 使用自定义的加载方法, 不走官方loader判断
  if (type == "stp") {
    loadView = await LoadStep(path)
  } else if (type == "iges" || type == "igs") {
    loadView = await LoadIges(path)
  } else {
  }

  if (loadView) {
    const { geometry, material } = loadView
    geometry.computeVertexNormals()
    geometry.mergeVertices()
    mesh = new THREE.Mesh(geometry, material)

    const { box, center, size } = getMeshAndSize(mesh)

    // createGridHelper(size)   // 创建网格底座
    // addAxes(size) // 添加轴辅助器  原点坐标指示

    // 添加可视化包围盒
    labelArr = addBox(mesh)

    scene.add(mesh)

    createLight(size) // 添加光源

    // 添加一个跟随相机的点光源
    pointLight = addLightOfCamera()

    camera.value = createCarmera(size, center) // 创建相机

    // scene.add(mesh)
    // 有了渲染器之后   一定要先创建相机   再创建控制器
    controls = createControls(camera.value, renderer.domElement)

    // const { x, y, z } = size

    container.value.appendChild(renderer.domElement) // 挂载

    animate()

    // addGui(material)

    closeLoading()
    // 获取模型的三维信息
    modelView.value = getModelView(box)
    return
  }
  // 其他常规3d文件走这里
  // 获取对应的模型加载器
  const loader = chooseLoader(type)
  loader.load(
    path,
    model => {
      const simpleArr = ["obj", "dae", "3ds"]
      let material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 1,
        metalness: 0,
        side: THREE.DoubleSide,
        // flatShading: true, // 显示线框
        // reflectivity: 0.3,

        // side: THREE.FrontSide,
        // clippingPlanes: [new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)], // 添加裁剪平面
        // clipShadows: true,
      })
      if (simpleArr.includes(type)) {
        mesh = model.scene || model
      } else {
        mesh = new THREE.Mesh(model, material)
      }

      calVolume(model)
      // mesh.castShadow = true // 使文字投射阴影
      // console.log("🚀 ~ file: ThreeViewer.vue:132 ~ loadModel ~ mesh:", mesh)

      // 设置剖面平面
      // const plane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)

      // mesh.position.set(0, 0, 0)
      // 计算模型的中心点
      const { box, center, size } = getMeshAndSize(mesh)
      // createGridHelper(size)   // 创建网格底座

      addAxes(size) // 添加轴辅助器  原点坐标指示

      // 添加可视化包围盒
      labelArr = addBox(mesh)

      createLight(size) // 添加光源

      // 添加一个跟随相机的点光源 此处必须添加
      pointLight = addLightOfCamera()

      camera.value = createCarmera(size, center, mesh.up) // 创建相机

      addGui(mesh, material)

      // addEnvironment()
      // addFaceGui(camera)
      scene.add(mesh)
      // const aa = getThickness(center, new THREE.Vector3(100, 100, 100), model)
      // console.log("🚀 ~ file: ThreeViewer.vue:208 ~ loadModel ~ aa:", aa)

      // checkThickness(mesh)

      // 有了渲染器之后   一定要先创建相机   再创建控制器
      controls = createControls(camera.value, renderer.domElement)
      container.value.appendChild(renderer.domElement) // 挂载

      // addArrow()
      animate()
      // const helper33 = new VertexNormalsHelper(mesh, 2, 0x00ff00, 1)
      // scene.add(helper33)
      window.addEventListener("click", onMouseClick)
      closeLoading()
      // 获取模型的三维信息
      modelView.value = getModelView(box)
    },
    undefined,
    error => {
      console.error("模型加载出错, 出错原因:", error)
    },
  )
}
const onMouseClick = event => {
  console.log("🚀 ~ file: ThreeViewer.vue:217 ~ onMouseClick ~ event:", event)
  // 将鼠标位置转换到归一化设备坐标 (NDC) 中 (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera.value)

  // 计算物体和射线的相交点
  console.log("🚀 ~ file: ThreeViewer.vue:230 ~ onMouseClick ~ scene:", scene)
  console.log("🚀 ~ file: ThreeViewer.vue:230 ~ onMouseClick ~ mesh:", mesh)
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
const backCarmera = () => {
  //  为何要传递参数？  因为数据不是响应式的， 模型加载后 变更后的参数只能实时传递？？
  restoreCarmera(camera.value, controls)
}

const animate = () => {
  // if (!WebGL.isWebGLAvailable()) {
  //   //  webgl支持检查
  //   const warning = WebGL.getWebGLErrorMessage()
  //   container.value.appendChild(warning)
  //   return
  // }
  requestAnimationFrame(animate)

  if (mesh && camera.value) {
    controls.update() // 更新控制器
    // 使点光源跟随相机
    const vector = camera.value.position.clone()
    pointLight.position.set(vector.x, vector.y, vector.z) //点光源位置
    //主场景
    renderer.setViewport(0, 0, 600, 600) //主场景视区
    renderer.autoClear = false //【scene.autoClear一定要关闭】
    renderer.render(scene, camera.value)
    // 旋转
    // viewBox.rotation.x += 0.01;
    // viewBox.rotation.y += 0.01;
    //次场景:1.复制主场景相机的位置、四元数，2.设置场景视区，3.渲染
    cameraOrtho.position.copy(camera.value.position)
    cameraOrtho.quaternion.copy(camera.value.quaternion) //Quaternion（表示对象局部旋转的四元数)
    cameraOrtho.lookAt(scene.position)
    cameraOrtho.up.set(0, 0, 1) // 同步基准面
    renderer.setViewport(450, 450, 150, 150) //【设置次场景视区视口，(x, y,width,height)，用来显示viewCube】
    renderer.render(sceneOrtho, cameraOrtho)
    // TWEEN.update(1);
  }
}

//  一键切换显示三维信息
const toggleLabel = () => {
  if (!mesh) return
  if (labelStatus.value) {
    labelArr.map(item => {
      scene.add(item)
    })
  } else {
    labelArr.map(item => {
      scene.remove(item)
    })
  }
  labelStatus.value = !labelStatus.value
}

// 一键还原模型初始状态
const autoBack = () => {}
defineExpose({ loadModel })
</script>

<style>
#container {
  width: 100%;
  height: 100%;
}
#threecontainer {
  position: relative;
  border: 1px solid black;
  margin: 20px;
  width: 600px;
  height: 600px;
}
#button {
  /* position: absolute;
  top: 20px;
  left: 20px; */
  padding: 10px 20px;
  background-color: #ff9800;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

#button:focus {
  outline: none;
}

#faceBox {
  position: absolute;
  bottom: 10px;
  left: 10px;
  /* border: 1px solid black;
  width: 50px;
  height: 50px; */
}
</style>
