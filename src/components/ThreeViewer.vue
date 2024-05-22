<template>
  <div ref="container" style="border: 1px solid black; margin: 20px; width: 600px; height: 600px"></div>
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
import { ref } from "vue"
import * as THREE from "three"
import { useThree } from "../hooks/useThree.js"
import { useFace } from "../hooks/useFace.js"
import { useLoading } from "../hooks/useLoading.js"
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
let camera, controls, mesh, pointLight, labelArr
let modelView = ref({})

let {
  scene,
  renderer,
  addBox,
  addAxes,
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
} = useThree()

let { sceneOrtho, cameraOrtho } = useFace()

const { openLoading, closeLoading } = useLoading()

const loadModel = async (path, type) => {
  openLoading() // 开启加载效果
  clearScene() //  加载新模型前先清除旧场景所有对象
  let loadView
  //  特殊3d文件类型判断, 使用自定义的加载方法, 不走官方loader判断
  if (type == "stp") {
    loadView = await LoadStep(path)
  } else if (type == "iges" || type == "igs") {
    // await LoadGeometry(path)
    loadView = await LoadIges(path)
  } else {
  }

  if (loadView) {
    const { geometry, material } = loadView
    // mesh = await LoadIges(path)
    mesh = new THREE.Mesh(geometry, material)

    const { box, center, size } = getMeshAndSize(mesh)

    // createGridHelper(size)   // 创建网格底座
    // addAxes(size) // 添加轴辅助器  原点坐标指示

    // 添加可视化包围盒
    labelArr = addBox(mesh)

    createLight(size) // 添加光源

    // 添加一个跟随相机的点光源
    pointLight = addLightOfCamera()

    camera = createCarmera(size, center) // 创建相机
    scene.add(mesh)
    // 有了渲染器之后   一定要先创建相机   再创建控制器
    controls = createControls(camera, renderer.domElement)

    // fitCameraToObject(camera, size,center, controls);
    container.value.appendChild(renderer.domElement) // 挂载

    animate()
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
      if (simpleArr.includes(type)) {
        mesh = model.scene || model
      } else {
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0.2 })
        mesh = new THREE.Mesh(model, material)
      }
      console.log("🚀 ~ loadModel ~ mesh:")
      // 计算模型的中心点
      const box = new THREE.Box3().setFromObject(mesh)
      const center = box.getCenter(new THREE.Vector3())
      mesh.position.sub(center) // 将模型居中
      const size = box.getSize(new THREE.Vector3())
      // createGridHelper(size)   // 创建网格底座

      addAxes(size) // 添加轴辅助器  原点坐标指示

      // 添加可视化包围盒
      labelArr = addBox(mesh)

      createLight(size) // 添加光源

      // 添加一个跟随相机的点光源 此处必须添加
      pointLight = addLightOfCamera()

      camera = createCarmera(size, center, mesh.up) // 创建相机
      scene.add(mesh)

      // 有了渲染器之后   一定要先创建相机   再创建控制器
      controls = createControls(camera, renderer.domElement)

      container.value.appendChild(renderer.domElement) // 挂载
      animate()
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

const animate = () => {
  requestAnimationFrame(animate)

  if (mesh && camera) {
    controls.update() // 更新控制器
    // 使点光源跟随相机
    const vector = camera.position.clone()
    pointLight.position.set(vector.x, vector.y, vector.z) //点光源位置
    //主场景
    renderer.setViewport(0, 0, 600, 600) //主场景视区
    renderer.autoClear = false //【scene.autoClear一定要关闭】
    renderer.render(scene, camera)
    // 旋转
    // viewBox.rotation.x += 0.01;
    // viewBox.rotation.y += 0.01;
    //次场景:1.复制主场景相机的位置、四元数，2.设置场景视区，3.渲染
    cameraOrtho.position.copy(camera.position)
    cameraOrtho.quaternion.copy(camera.quaternion) //Quaternion（表示对象局部旋转的四元数)
    cameraOrtho.lookAt(scene.position)
    cameraOrtho.up.set(0, 0, 1) // 同步基准面
    renderer.setViewport(450, 450, 150, 150) //【设置次场景视区视口，(x, y,width,height)，用来显示viewCube】
    renderer.render(sceneOrtho, cameraOrtho)
    // TWEEN.update(1);
  }
}

//  一键切换显示三维信息
const toggleLabel = () => {
  return
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
</style>
