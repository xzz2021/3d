<template>
  <div v-show="dialogOpen">
    <el-dialog v-model="dialogTableVisible" :fullscreen="isFullscreen" :z-index="2001" ref="dialogRef" draggable width="674">
      <template #header>
        <el-button class="el-dialog__headerbtn el-dialog__fullbtn" @click="toggleFullscreen" link :icon="FullScreen" />
      </template>

      <div ref="container" id="threecontainer">
        <AxisLine v-show="mesh" :camera2="camera" @backCarmera="backCarmera" @totastMesh="totastMesh(controls)" />
      </div>
      <button v-show="mesh" id="button" @click="toggleLabel">{{ labelStatus ? "开启" : "关闭" }}三维信息</button>
      <!-- 
    <div>模型信息:</div>
    <div>长: {{ modelView.height }}</div>
    <div>宽: {{ modelView.width }}</div>
    <div>高: {{ modelView.depth }}</div>
    <div>包装盒体积: {{ modelView.volume }}</div>
    <div>真实体积: {{ modelView.trueVolume }}</div>
    <div>重量: {{ modelView.weight }}</div> -->
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as THREE from "three"
import { useThree } from "../hooks/useThree.js"
import { useFace } from "../hooks/useFace.js"
import { useLoading } from "../hooks/useLoading.js"

import AxisLine from "./AxisLine.vue"

import { calVolume } from "../utils/calVolume.js"
// import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper.js"
import { useMitt } from "../hooks/mitt"
import { FullScreen } from "@element-plus/icons-vue"
// import { checkThickness } from "../utils/checkThickness.js"
const isFullscreen = ref(false)
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const dialogRef = ref(null)
onMounted(() => {
  // dialogRef.value.rendered = ture
  // console.log("🚀 ~ file: ThreeViewer.vue:52 ~ dialogRef.value:", dialogRef.value)
})
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
const dialogTableVisible = ref(true)

const dialogOpen = ref(false)
const { onEvent, emitEvent } = useMitt("openPreview")
onEvent(() => {
  dialogTableVisible.value = true
  dialogOpen.value = true
})
const container = ref(null)
const labelStatus = ref(false)
let mesh, pointLight, labelArr
let modelView = ref({})
const camera = ref(null)
let {
  scene,
  renderer,
  controls,
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
  clearScene() //  加载新模型前先清除旧场景所有对象
  openLoading() // 开启加载效果

  // window.removeEventListener("click", onMouseClick)
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
    // geometry.mergeVertices()
    mesh = new THREE.Mesh(geometry, material)
    commonFn(material)
    return
  }
  // 其他常规3d文件走这里   // 获取对应的模型加载器
  const loader = chooseLoader(type)
  loader.load(
    path,
    geometry => {
      const simpleArr = ["obj", "dae", "3ds"]
      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256)
      cubeRenderTarget.texture.type = THREE.HalfFloatType
      let material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0 })
      // let material = new THREE.MeshPhongMaterial({ color: 0xff5533, specular: 0x555555, shininess: 30 })
      mesh = simpleArr.includes(type) ? geometry.scene || geometry : new THREE.Mesh(geometry, material)

      // const shellGeometry = createShell(geometry, -0.05) // 向内偏移 0.05
      // const shellMesh = new THREE.Mesh(shellGeometry, material)
      // scene.add(shellMesh)

      // // 使用布尔运算生成抽壳几何体
      // const cubeCSG = CSG.fromMesh(mesh)
      // const shellCSG = CSG.fromMesh(shellMesh)
      // const hollowCSG = cubeCSG.subtract(shellCSG)

      // const hollowMesh = CSG.toMesh(hollowCSG, new THREE.Matrix4(), material)
      // scene.add(hollowMesh)

      // // 释放不再使用的几何体内存
      // mesh.geometry.dispose()
      // shellGeometry.dispose()
      // cubeCSG.mesh.geometry.dispose()
      // shellCSG.mesh.geometry.dispose()

      commonFn(material)
    },
    undefined,
    error => {
      console.error("模型加载出错, 出错原因:", error)
    },
  )
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
const backCarmera = () => {
  //  为何要传递参数？  因为数据不是响应式的， 模型加载后 变更后的参数只能实时传递？？
  restoreCarmera(camera.value, controls)
}

const commonFn = material => {
  // 此函数最好放当前模块
  // 计算模型的中心点
  const { box, center, size } = getMeshAndSize(mesh)
  // createGridHelper(size)   // 创建网格底座

  addAxes(size) // 添加轴辅助器  原点坐标指示

  // 添加可视化包围盒
  labelArr = addBox(mesh)

  // createLight(size) // 添加光源

  // 添加一个跟随相机的点光源 此处必须添加
  pointLight = addLightOfCamera()

  camera.value = createCarmera(size, center, mesh.up) // 创建相机

  addGui(mesh, material)

  addEnvironment()
  // addFaceGui(camera)

  scene.add(mesh)
  // const aa = getThickness(center, new THREE.Vector3(100, 100, 100), model)
  // console.log("🚀 ~ file: ThreeViewer.vue:208 ~ loadModel ~ aa:", aa)

  // checkThickness(mesh)
  // detectWallThickness(mesh)
  // 有了渲染器之后   一定要先创建相机   再创建控制器
  controls = createControls(camera.value, renderer.domElement)
  container.value.appendChild(renderer.domElement) // 挂载

  // addArrow()
  closeLoading()
  emitEvent()

  animate()
  // const helper33 = new VertexNormalsHelper(mesh, 2, 0x00ff00, 1)
  // scene.add(helper33)
  detectWallThickness(mesh, 10)
  // window.addEventListener("click", onMouseClick)
  calVolume(mesh.geometry)
  // 获取模型的三维信息
  modelView.value = getModelView(box)
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
const animate = time => {
  // time 默认为1秒时长
  // if (!WebGL.isWebGLAvailable()) {
  //   //  webgl支持检查
  //   const warning = WebGL.getWebGLErrorMessage()
  //   container.value.appendChild(warning)
  //   return
  // }
  //显示屏每一帧 执行一次
  // 由于性能或运行差异 每一帧相隔的时间不一样
  //  需要匀速的话 使用 conts t = time /60 根据时间 精确控制动画

  requestAnimationFrame(animate)
  //requestAnimationFrame 是浏览器提供的一个方法，用来在下一次重绘前调用指定的回调函数 render。
  //  这会创建一个递归调用，使得 render 函数在每一帧都被调用，从而实现连续的动画效果。

  // ★★★★  控制循环 厉害的方法 ★★★★ ===>  let t = a % 5; 每5秒  循环回到0

  /*
  let time = new THREE.Clock().getElapsedTime()
  //  两次获取时间的间隔 
  */

  if (mesh && camera.value) {
    controls.update() // enableDamping 启用阻尼效果 必须更新控制器
    // 使点光源跟随相机
    const vector = camera.value.position.clone()
    pointLight.position.set(vector.x, vector.y, vector.z) //点光源位置
    //主场景
    renderer.setViewport(0, 0, 600, 600) //主场景视区
    renderer.autoClear = false //【scene.autoClear一定要关闭】
    // 显示器每刷新一次就重新render一次  相当于实时刷新渲染的场景
    // 也就是这里定义的方法 会随显示屏每一帧刷新率而刷新
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

// const onWindowResize = () => {
//   console.log("🚀 ~ file: ThreeViewer.vue:338 ~ container:", container.clientWidth)
//   return
//   const width = container.clientWidth
//   const height = container.clientHeight
//   renderer.setSize(width, height)
//   camera.aspect = width / height
//   camera.updateProjectionMatrix()
// }

// // onWindowResize()
// // 监听窗口大小变化
// window.addEventListener("resize", onWindowResize, false)
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
defineExpose({ loadModel })
</script>

<style lang="scss" scope>
#container {
  width: 100%;
  height: 100%;
}
#threecontainer {
  position: relative;
  border: 1px solid black;
  text-align: center;
  text-align: -webkit-center;
  margin: 20px;
  // margin: 20px;
  // width: 600px;
  // height: 600px;
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

.el-dialog__fullbtn {
  // background: transparent;
  border: none;
  height: 48px;
  outline: none;
  // padding: 0;
  position: absolute;
  top: 12px;
  right: 45px;
}
</style>
