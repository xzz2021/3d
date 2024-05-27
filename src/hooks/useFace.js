//  此处 只创建六面体
import * as THREE from "three"
import TWEEN from "@tweenjs/tween.js"
// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()
// let selectedFace = null;
// 初始化变量来存储上一次点击的面
// let previousMaterial = null;

const sceneOrtho = new THREE.Scene()
let viewBox, cameraOrtho
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
let intersects
// 定义立方体六个面的笛卡尔坐标
// const faceNormals = [
//   new THREE.Vector3(0, 0, 1), // 前面
//   new THREE.Vector3(0, 0, -1), // 后面
//   new THREE.Vector3(0, 1, 0), // 顶面
//   new THREE.Vector3(0, -1, 0), // 底面
//   new THREE.Vector3(-1, 0, 0), // 左面
//   new THREE.Vector3(1, 0, 0), // 右面
// ]

export const useFace = () => {
  const createviewBox = () => {
    viewBox = new THREE.Mesh(new THREE.BoxGeometry(90, 90, 90, 1, 1, 1), createMaterial())
    // const axes = new THREE.AxesHelper(100)
    // viewBox.add(axes)
    addAxes()
  }
  const addAxes = () => {
    const gridHelper = new THREE.GridHelper(10, 10)
    viewBox.add(gridHelper)

    // 创建坐标轴辅助器
    const axisLength = 80
    const arrowSize = 8

    const xAxis = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      axisLength,
      0xff0000,
      arrowSize,
      arrowSize * 0.5,
    )
    viewBox.add(xAxis)

    const yAxis = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0),
      axisLength,
      0x00ff00,
      arrowSize,
      arrowSize * 0.5,
    )
    viewBox.add(yAxis)

    const zAxis = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
      axisLength,
      0x0000ff,
      arrowSize,
      arrowSize * 0.5,
    )
    viewBox.add(zAxis)
  }

  const createFaceCarmera = size => {
    //次相机
    // const aspect = 1
    // const frustumSize = 200
    const d = Math.sqrt(size.x * size.x + size.y * size.y) * 0.5
    // cameraOrtho = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 20000000000);
    cameraOrtho = new THREE.OrthographicCamera(-d, d, d, -d, 0.1, 20000000000000)
    //    cameraOrtho = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );
    //     cameraOrtho = new THREE.OrthographicCamera(-d, d, d, -d, 0.1, 2000);
    // cameraOrtho.position.z = 500;
    //    cameraOrtho.position.set(0, 0, 100);
    // const { x, y, z } = up || { x: 0, y: 0, z: 1 }
    // cameraOrtho.up.set(x, y, z)
  }

  // const createOrthoControls = (camera, dom) => {
  //   let controls

  //     controls = new TransformControls(camera, dom)
  //   controls.enableDamping = true // 启用阻尼效果
  //   controls.dampingFactor = 0.25 // 阻尼系数
  //   controls.enableZoom = true // 启用缩放
  //   // controls.enablePan = !true;
  //   controls.enableRotate = true // 启用旋转
  //   // controls.screenSpacePanning = false; // 允许基于世界坐标的平移
  //   controls.target.set(0, 0, 0)
  //   controls.minDistance = 1
  //   controls.maxDistance = 1000

  //   savedTarget = controls.target.clone()

  //   return controls
  // }
  // 创建文字
  const createTextTexture = text => {
    // 创建一个 <canvas> 元素，用于绘制文本
    var canvas = document.createElement("canvas")
    // 设置画布的宽度为 256 像素
    canvas.width = 256
    // 设置画布的高度为 256 像素
    canvas.height = 256
    // 获取画布的 2D 渲染上下文，以便在画布上绘制内容
    var context = canvas.getContext("2d")

    // 设置画布的背景颜色为绿色，与 materialArr[0] 的颜色相同
    context.fillStyle = "#ccc9c0" // 背景颜色
    // 在画布上绘制填充的矩形（覆盖整个画布），作为背景色
    context.fillRect(0, 0, canvas.width, canvas.height)

    // 设置文本的字体和大小
    context.font = "64px Arial"
    // 设置文本的颜色为白色
    context.fillStyle = "#0c0d0d"
    // 设置文本的对齐方式为水平居中
    context.textAlign = "center"
    // 设置文本的基线为垂直居中
    context.textBaseline = "middle"
    // 在画布上绘制文本，文本内容居中显示
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    // 使用画布内容创建一个 Three.js 纹理
    var texture = new THREE.CanvasTexture(canvas)
    // 返回创建的纹理
    return texture
  }

  // 创建正六面体  并添加 视图 文字
  const createMaterial00 = () => {
    const materialArr = []
    // map 给当前面 添加文字
    const text = ["右视图", "左视图", "后视图", "前视图", "顶视图", "底视图"]
    text.map(item => {
      materialArr.push(new THREE.MeshBasicMaterial({ map: createTextTexture(item) }))
    })
    //  调整文字 统一 水平方向
    materialArr[0].map.rotation = Math.PI / 2
    materialArr[1].map.rotation = -Math.PI / 2
    materialArr[2].map.rotation = -Math.PI
    materialArr[3].map.rotation = 0

    // 确保纹理更新后可见
    materialArr.forEach(material => {
      material.map.center.set(0.5, 0.5)
      material.map.needsUpdate = true
    })
    return materialArr
  }

  const createMaterial = () => {
    // const colorArr = [0x0000ff, 0x00ff00, 0xff0000, 0xffff00, 0x00ffff, 0xff00ff]
    const materialArr = []
    // map 给当前面 添加文字
    const text = ["右视图", "左视图", "后视图", "前视图", "顶视图", "底视图"]
    // let i = 0
    text.map(item => {
      materialArr.push(new THREE.MeshBasicMaterial({ map: createTextTexture(item) }))
      // i++
    })
    //  调整文字 统一 水平方向
    materialArr[0].map.rotation = Math.PI / 2
    materialArr[1].map.rotation = -Math.PI / 2
    materialArr[2].map.rotation = -Math.PI
    materialArr[3].map.rotation = 0

    // 确保纹理更新后可见
    materialArr.forEach(material => {
      material.map.center.set(0.5, 0.5)
      material.map.needsUpdate = true
    })
    return materialArr
  }

  const onClick = event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, cameraOrtho)

    intersects = raycaster.intersectObject(viewBox)

    if (intersects.length > 0) {
      const face = intersects[0].face
      const materialIndex = face.materialIndex

      // 恢复所有面的颜色
      viewBox.material.forEach((material, index) => {
        material.color.setHex(index === materialIndex ? 0xff0000 : 0x00ff00) // 只高亮当前面
      })
    }
  }

  const initFace = () => {
    // 添加鼠标点击事件监听器
    createviewBox()
    const box = new THREE.Box3().setFromObject(viewBox)
    const center = box.getCenter(new THREE.Vector3())
    viewBox.position.sub(center) // 将模型居中
    const size = box.getSize(new THREE.Vector3())

    createFaceCarmera(size)
    sceneOrtho.add(cameraOrtho)
    sceneOrtho.add(viewBox)
    // window.addEventListener("click", onClick, false)
    // window.addEventListener('click', onMouseClick, false);
  }
  initFace() //  调用hook时直接执行初始化

  return {
    sceneOrtho,
    cameraOrtho,
    TWEEN,
  }
}
