<template>
  <el-dialog
    v-model="dialogTableVisible"
    :fullscreen="isFullscreen"
    :z-index="2001"
    ref="dialogRef"
    draggable
    width="800"
    top="5vh"
    @open="bootPanel"
    title="模型预览"
  >
    <template #header>
      <div>模型预览</div>
      <el-button class="el-dialog__headerbtn el-dialog__fullbtn" @click="toggleFullscreen" link :icon="FullScreen" />
    </template>

    <div ref="containerRef" id="threecontainer">
      <AxisLine v-show="mesh" :camera2="camera" @backCarmera="backCarmera" @totastMesh="totastMesh(controls)" />
      <!-- <div v-if="is3dm"> -->
      <!-- <div class="boomSlider">
        <el-slider v-model="ratioValue" :show-tooltip="false" :min="0" :max="30" size="small" />
      </div> -->
    </div>

    <!-- <button v-show="mesh" id="button" @click="toggleLabel">{{ labelStatus ? "开启" : "关闭" }}三维信息</button> -->
  </el-dialog>
</template>

<script setup>
import { ref } from "vue"
import * as THREE from "three"
import { useThree } from "./hooks/useThree.js"
import { useConfig } from "./hooks/useConfig.js"
import { useFn } from "./hooks/fn.js"
import { useLoading } from "@/hooks/useLoading.js"
import AxisLine from "./AxisLine.vue"
import { useMitt } from "@/hooks/mitt.js"
import { useBoom } from "./hooks/useBoom.js"
import { FullScreen } from "@element-plus/icons-vue"
import { useShopStore } from "@/pinia/shopTable.js"
import { RAWDATA } from "./utils/constant"
import { ElMessage } from "element-plus"
// import { checkThickness } from "@/utils/checkThickness"
// import matcapPorcelainWhite from "./hooks/66.jpg"
let { isFullscreen, toggleFullscreen, dialogTableVisible, openDialog, restoreCarmera, getALLInformation } = useFn()
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useShopStore()
const { addItem, IsExist, updatePrice } = store
const { modelFileInfo } = storeToRefs(store)
const dialogRef = ref(null)

const containerRef = ref(null)
const { is3dm, ratioValue, initExplodeModel, explodeModel } = useBoom()

// threejs   scene、mesh 、renderer、controls 内部有只读属性的value  无法使用vue的响应式  ref 包裹

const { onEvent } = useMitt()
onEvent("openPreview", () => {
  loadModel(modelFileInfo.value)
})
const labelStatus = ref(false)

const {
  initialStatus,
  scene,
  renderer,
  camera,
  controls,
  chooseLoader,
  LoadStep,
  LoadIges,addCameraLight
} = useThree()
let mesh
const {  clearScene,changeFace, meshSize, getMeshSize, autoResize, addLight, addAxes } = useConfig()
const { openLoading, closeLoading } = useLoading()
onEvent("openLoading", openLoading)

//  打开面板需要等待dom渲染之后 执行模型渲染
const bootPanel = () => {
  nextTick(() => {
    commonFn(modelFileInfo.value)
  })
}
// 加载模型 前 类型 判断
const loadModel = async () => {
  clearScene(scene) //  加载新模型前先清除旧场景所有对象
  // openLoading() // 开启加载效果
  let loadView
  //  特殊3d文件类型判断, 使用自定义的加载方法, 不走官方loader判断
  const { filePath, fileType } = modelFileInfo.value
  if (fileType == "stp" || fileType == "step") {
    loadView = await LoadStep(filePath)
  } else if (fileType == "iges" || fileType == "igs") {
    loadView = await LoadIges(filePath)
  } else {
  }
  if (loadView) {
    const { geometry, material } = loadView
    // material.depthWrite = true // 默认情况下应启用深度写入
    // material.depthTest = false // 解决 启用环境贴图后 模型闪烁的问题
    mesh = new THREE.Mesh(geometry, material)
    openDialog()
    return
  }
  // 其他常规3d文件走这里   // 获取对应的模型加载器
  const loader = chooseLoader(fileType)
  loader.load(
    filePath,
    geometry => {
      if (fileType == "3dm") {
        is3dm.value = true
        mesh = geometry
        openDialog()
        return
      }
      const simpleArr = ["obj", "dae", "3ds"]
      let material = new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.3,
      })
      mesh = simpleArr.includes(fileType) ? geometry.scene || geometry : new THREE.Mesh(geometry, material)
      openDialog()
    },
    undefined,
    error => {
      ElMessage.error("模型加载出错, 出错原因:", error)
    },
  )
}

const backCarmera = () => {
  //  为何要传递参数？  因为数据不是响应式的， 模型加载后 变更后的参数只能实时传递？？
  restoreCarmera(camera, controls.value, initialStatus.value)
}

const commonFn = async modelFileInfo => {
  // 此函数最好放当前模块
  // 计算模型的中心点
  const { box, center, size } = getMeshSize(mesh)
  addAxes(size, scene)
  autoResize(camera, renderer, size)

  addLight(scene)
  addCameraLight(scene)
  initialStatus.value.savedPosition = camera.position.clone()
  initialStatus.value.savedRotation = camera.rotation.clone()

  scene.add(mesh)

  containerRef.value && containerRef.value.appendChild(renderer.domElement) // 挂载

  closeLoading()

  //  新增商品推送之前先检查 是否当前项存在
  const check = IsExist(modelFileInfo.filePath)
  !check && getInfoAndPushItem(box, modelFileInfo, mesh)
}

const getInfoAndPushItem = async (box, modelFileInfo, mesh) => {
  //  模型加载完之后 获取商品所有详细信息
  const model3d = getALLInformation(box, mesh.geometry)
  const imageUrl = await screenShot(box)
  const newItem = { ...RAWDATA, model3d, imageUrl, modelFileInfo }
  addItem(newItem)
  setTimeout(() => {
    updatePrice()
  }, 1000)
}

const findMinIndex = arr => {
  if (arr.length === 0) {
    return -1 // 如果数组为空，返回 -1 表示无效索引
  }
  let minIndex = 0
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[minIndex]) {
      minIndex = i
    }
  }
  return minIndex
}

const screenShot = async box => {
  // 1. 先比较获取面积最大的面
  // const size = box.getSize(new THREE.Vector3())
  // const { x, y, z } = size
  // // // 2. 从而确定轴  改变相机显示视角
  // let index = findMinIndex([z, 999999, y, 9999999, x])
  // changeFace(camera, index)
  // const maxDimension = Math.max(x, y, z)
  // const fov = camera.fov * (Math.PI / 180) // convert vertical fov to radians
  // const fitHeightDistance = maxDimension / (2 * Math.atan(fov / 2))
  // const fitWidthDistance = fitHeightDistance / camera.aspect
  // const distance = Math.max(fitHeightDistance, fitWidthDistance)
  // const obj = { x: 4, y: 2, z: 0 }
  // Object.entries(obj).forEach(([key, value]) => {
  //   if (index == value) {
  //     camera.position[key] = distance
  //     // camera.position[key] = size[key]
  //   }
  // })

  // camera.lookAt(meshSize.value.center)
  // 3. 调整模型 适配 canvas  大小
  await new Promise(resolve => setTimeout(resolve, 10))
  // 获取预览图片
  renderer.render(scene, camera)
  const imageUrl = renderer.domElement.toDataURL("image/jpeg")

  // 4. 恢复初始视角
  // restoreCarmera(camera, controls, initialStatus.value)
  return imageUrl
}


// const animate = () => {
//   requestAnimationFrame(animate)
//   // if (mesh && camera) {
//   controls.value.update()
//   // 使点光源跟随相机
//   const vector = camera.position.clone()
//   pointLight.position.set(vector.x, vector.y, vector.z) //点光源位置
//   // 显示器每刷新一次就重新render一次  相当于实时刷新渲染的场景
//   // 也就是这里定义的方法 会随显示屏每一帧刷新率而刷新
//   renderer.value.render(scene, camera)
//   // }
// }

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
watch(isFullscreen, val => {
  const dom = document.querySelector("#threecontainer")
  dom.style.height = val ? `calc(100vh - 70px)` : `600px`
  autoResize(camera, renderer)
})

defineExpose({ loadModel })
</script>

<style lang="scss" scope>
#threecontainer {
  position: relative;
  width: 100%;
  height: 600px;
  // border: 1px solid black;
  text-align: center;
  text-align: -webkit-center;
  // height: 100%;
}
#button {
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
.boomSlider {
  position: absolute;
  bottom: 25px;
  right: 10px;
  width: 200px;
}
</style>
