<template>
  <div v-show="dialogOpen">
    <el-dialog
      v-model="dialogTableVisible"
      :fullscreen="isFullscreen"
      :z-index="2001"
      ref="dialogRef"
      draggable
      width="674"
      top="5vh"
    >
      <template #header>
        <el-button class="el-dialog__headerbtn el-dialog__fullbtn" @click="toggleFullscreen" link :icon="FullScreen" />
      </template>

      <div ref="containerRef" id="threecontainer">
        <AxisLine v-show="mesh" :camera2="camera" @backCarmera="backCarmera" @totastMesh="totastMesh(controls)" />
      </div>
      <!-- <button v-show="mesh" id="button" @click="toggleLabel">{{ labelStatus ? "开启" : "关闭" }}三维信息</button> -->
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as THREE from "three"
import { useThree } from "@/hooks/useThree.js"
import { useFn } from "./hooks/fn.js"
import { useLoading } from "@/hooks/useLoading.js"
import AxisLine from "./AxisLine.vue"
import { calVolume } from "@/utils/calVolume.js"
import { useMitt } from "@/hooks/mitt.js"
import { FullScreen } from "@element-plus/icons-vue"
import { useShopStore } from "@/pinia/shopTable.js"
import { RAWDATA } from "./utils/constant"

let { isFullscreen, toggleFullscreen, dialogTableVisible, dialogOpen, openDialog, restoreCarmera, getALLInformation } = useFn()
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useShopStore()
const { addItem, IsExist, updatePrice } = store

const dialogRef = ref(null)
// 接收props
const props = defineProps({
  modelInformation: {
    type: Object,
    default: () => {},
  },
})

// threejs   scene、mesh 、renderer、controls 内部有只读属性的value  无法使用vue的响应式  ref 包裹

const { onEvent, emitEvent } = useMitt()
onEvent("openPreview", modelFileInfo => {
  loadModel(modelFileInfo)
})
const labelStatus = ref(false)
let mesh, pointLight, labelArr
const camera = ref(null)
let {
  scene,
  renderer,
  controls,
  addBox,
  addArrow,
  addAxes,
  addGui2,
  // addFaceGui,
  addEnvironment,
  changeFace,
  createLight,
  createControls,
  chooseLoader,
  createCarmera,

  clearScene,
  LoadStep,
  LoadIges,
  getMeshAndSize,
  addLightOfCamera,
  totastMesh,
  createTexture,
  containerRef,
  initialStatus,
} = useThree()

const { openLoading, closeLoading } = useLoading()

// 加载模型 前 类型 判断
const loadModel = async modelFileInfo => {
  clearScene() //  加载新模型前先清除旧场景所有对象
  openLoading() // 开启加载效果
  let loadView
  //  特殊3d文件类型判断, 使用自定义的加载方法, 不走官方loader判断
  const { filePath, fileType } = modelFileInfo
  if (fileType == "stp") {
    loadView = await LoadStep(filePath)
  } else if (fileType == "iges" || fileType == "igs") {
    loadView = await LoadIges(filePath)
  } else {
  }
  if (loadView) {
    const { geometry, material } = loadView
    mesh = new THREE.Mesh(geometry, material)
    commonFn(material, modelFileInfo)
    return
  }
  // 其他常规3d文件走这里   // 获取对应的模型加载器
  const loader = chooseLoader(fileType)
  loader.load(
    filePath,
    geometry => {
      const simpleArr = ["obj", "dae", "3ds"]
      let material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.4,
        roughness: 0.3,
      })
      mesh = simpleArr.includes(fileType) ? geometry.scene || geometry : new THREE.Mesh(geometry, material)
      commonFn(material, modelFileInfo)
    },
    undefined,
    error => {
      console.error("模型加载出错, 出错原因:", error)
    },
  )
}

const backCarmera = () => {
  //  为何要传递参数？  因为数据不是响应式的， 模型加载后 变更后的参数只能实时传递？？
  restoreCarmera(camera.value, controls, initialStatus.value)
}

const commonFn = (material, modelFileInfo) => {
  // 此函数最好放当前模块
  // 计算模型的中心点
  const { box, center, size } = getMeshAndSize(mesh)
  // createGridHelper(size)   // 创建网格底座

  scene.background = createTexture()

  createLight(size) // 添加光源

  // 添加一个跟随相机的点光源 此处必须添加
  pointLight = addLightOfCamera()

  camera.value = createCarmera(size, center, mesh.up) // 创建相机
  // addEnvironment()
  // addF  aceGui  (camera)E:\xzz\development\3d\src\components\modelViewer\texture\rural_asphalt_road_2k.hdr

  scene.add(mesh)

  // checkThickness(mesh)
  // detectWallThickness(mesh)
  // 有了渲染器之后   一定要先创建相机   再创建控制器
  controls = createControls(camera.value, renderer.domElement)

  // totastMesh(controls)
  containerRef.value && containerRef.value.appendChild(renderer.domElement) // 挂载

  // addAxes(size) // 添加轴辅助器  原点坐标指示

  // 添加可视化包围盒
  // labelArr = addBox(mesh)
  // addArrow()
  closeLoading()

  animate()

  openDialog()

  //  新增商品推送之前线检查 是否当前项存在
  const check = IsExist(modelFileInfo.filePath)
  !check && getInfoAndPushItem(box, modelFileInfo)
}

const getInfoAndPushItem = (box, modelFileInfo) => {
  //  模型加载完之后 获取商品所有详细信息
  const allInfo = getALLInformation(box, mesh.geometry)
  console.log("🚀 ~ file: ThreeViewer.vue:180 ~ allInfo:", allInfo)
  // 获取预览图片
  renderer.render(scene, camera.value)
  const imageUrl = renderer.domElement.toDataURL("image/jpeg")
  const newItem = { ...RAWDATA, ...allInfo, imageUrl, modelFileInfo, ...modelFileInfo.resData }
  console.log("🚀 ~ file: ThreeViewer.vue:185 ~ newItem:", newItem)
  addItem(newItem)

  setTimeout(() => {
    updatePrice()
  }, 1000)
}

const animate = () => {
  requestAnimationFrame(animate)
  if (mesh && camera.value) {
    controls.update()
    // 使点光源跟随相机
    const vector = camera.value.position.clone()
    pointLight.position.set(vector.x, vector.y, vector.z) //点光源位置
    // 显示器每刷新一次就重新render一次  相当于实时刷新渲染的场景
    // 也就是这里定义的方法 会随显示屏每一帧刷新率而刷新
    renderer.render(scene, camera.value)
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
