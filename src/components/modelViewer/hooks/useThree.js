import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader"
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader"
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader"
import { VRMLLoader } from "three/examples/jsm/loaders/VRMLLoader"
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader"
import { XYZLoader } from "three/examples/jsm/loaders/XYZLoader"
import { PDBLoader } from "three/examples/jsm/loaders/PDBLoader"
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader"
import { Rhino3dmLoader } from "three/addons/loaders/3DMLoader.js"
// import { MaterialLoader } from "three/examples/"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

import { TransformControls } from "three/addons/controls/TransformControls.js"

import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

// import imgUrl0 from "./rooitou/px.png"
// import imgUrl1 from "./rooitou/nx.png"
// import imgUrl2 from "./rooitou/py.png"
// import imgUrl3 from "./rooitou/ny.png"
// import imgUrl4 from "./rooitou/pz.png"
// import imgUrl5 from "./rooitou/nz.png"
// threejs 内置了lil-gui  不需要引入其他模块
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"
export const useThree = () => {
  const containerRef = ref(null)

  const initialStatus = ref({})
  // const ll = 0.6
  // const aspect = window.innerWidth / window.innerHeight  * 0.6// 窗口宽高比
  // const winW = window.innerWidth
  // const winH = window.innerHeight
  let scene = new THREE.Scene()
  // const path = "../components/modelViewier/texture/country/"
  // const urls = [`${path}px.jpg`, `${path}nx.jpg`, `${path}py.jpg`, `${path}ny.jpg`, `${path}pz.jpg`, `${path}nz.jpg`]
  // const texture = new THREE.CubeTextureLoader().load(urls)
  // scene.background = texture
  scene.background = new THREE.Color(0x8c8aff) //  设置场景的背景色0x8c8aff
  // scene.background = new THREE.Color(0x7f7f7f) //  设置场景的背景色 0x7f7f7f  0xf2f2f2
  // scene.background = new THREE.Color(0xf2f2f2) //  设置场景的背景色 0x7f7f7f  0xf2f2f2

  // let d = 75 // 控制视锥的尺寸  //  控制相机与模型中心的距离
  // let camera = new THREE.OrthographicCamera(-d, d, d, -d, 1, 1000);
  // let renderer = new THREE.WebGLRenderer({
  //   antialias: true,
  //   powerPreference: "high-performance",
  //   logarithmicDepthBuffer: true,
  //   // preserveDrawingBuffer: true,
  // })
  // let controls =  new OrbitControls(camera, renderer.domElement)
  let gridHelper, savedPosition, savedRotation, gui

  const createRenderer = () => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true,
      // preserveDrawingBuffer: true,
    })
    renderer.setSize(600, 600)
    // renderer.setSize(canvasWidth, canvasHeight)
    renderer.shadowMap.enabled = true // 启用阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    //  此处与renderer.autoClear  冲突
    // renderer.setClearColor(0x8c8aff); // 设置为白色
    // 设置渲染器屏幕像素比  高分辨率屏幕上 渲染更精细  但不建议直接设置  会导致性能问题
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    renderer.setViewport(0, 0, 600, 600) //主场景视区
    renderer.autoClear = false //【scene.autoClear一定要关闭】
    return renderer
  }

  const createLight = size => {
    // 添加灯源前先移除所有的灯光
    removeAllLights(scene)
    //  平行光的距离影响也很大  太远会显得很模糊

    // const { x, y, z } = size
    // 添加光源  不然模型会是全黑色的

    const strength = 1
    //  环境光 会影响 模型的颜色
    // const ambientLight = new THREE.AmbientLight(0xffffff, strength)
    const ambientLight = new THREE.AmbientLight(0x7c7c7c, strength)
    scene.add(ambientLight)

    // const directionArr = [
    //   { x: 1000, y: 0, z: 0 }, // 正前方 x轴
    //   { x: -1000, y: 0, z: 0 }, //  反前方 x轴
    //   { x: 0, y: 1000, z: 0 }, //  正上方 y轴
    //   { x: 0, y: -1000, z: 0 }, //  反上方 y轴
    //   { x: 0, y: 0, z: 1000 }, //  正右方 z轴
    //   { x: 0, y: 0, z: -1000 }, //  反右方 z轴
    // ]
    const directionArr = [
      { x: 1000, y: 1000, z: 1000 },
      { x: 1000, y: -1000, z: 1000 },
      { x: -1000, y: 1000, z: 1000 },
      { x: -1000, y: -1000, z: 1000 },
    ]
    false &&
      directionArr.map(item => {
        const { x, y, z } = item
        const directionaLight = new THREE.DirectionalLight(0xffffff, 0.2)
        directionaLight.castShadow = true
        directionaLight.position.set(x, y, z)
        scene.add(directionaLight)
      })

    // const directionaLight = new THREE.DirectionalLight(0xffffff, strength)
    // // directionaLight.castShadow = true
    // directionaLight.position.set(1000, 0, 0)

    // scene.add(directionaLight)

    // 创建一个 HemisphereLight
    // const skyColor = 0xb1e1ff // 浅蓝色 0xb1e1ff
    // const groundColor = 0x4d4d4d // 深灰色  0x4d4d4d
    // const intensity = 1 // 强度
    // const hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity)

    // // 将光源添加到场景中
    // scene.add(hemiLight)

    // light.position.set(x, y, z)
    // light.position.set(0.32, 0.39, 0.7)
    // light.position.set(100, 100, 100)
  }

  // 自动选择相应 加载器
  const chooseLoader = type => {
    let loader
    switch (type.toLowerCase()) {
      case "gltf":
      case "glb":
        loader = new GLTFLoader()
        break
      case "obj":
        loader = new OBJLoader()
        break
      case "fbx":
        loader = new FBXLoader()
        break
      case "stl":
        // case 'x_t':
        loader = new STLLoader()
        break
      case "ply":
        loader = new PLYLoader()
        break
      case "collada":
      case "dae":
        loader = new ColladaLoader()
        break
      case "3ds":
        loader = new TDSLoader()
        break
      case "3dm":
        {
          loader = new Rhino3dmLoader()
          loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1/")
        }
        break
      case "svg":
        loader = new SVGLoader()
        break
      case "vrml":
      case "wrl":
        loader = new VRMLLoader()
        break
      case "pcd":
        loader = new PCDLoader()
        break
      case "xyz":
        loader = new XYZLoader()
        break
      case "pdb":
        loader = new PDBLoader()
        break
      case "ktx2":
        loader = new KTX2Loader()
        break
      case "json":
        loader = new THREE.MaterialLoader()
        break
      default:
        console.error("Unsupported model type:", type)
        return
    }
    return loader
  }

  // 设置相机位置和方向
  const createCarmera = (size, center) => {
    const { x, y, z } = size //  元素自带基底面  用于相机视角 默认为Z轴

    const width = document.getElementById("threecontainer").offsetWidth
    const height = document.getElementById("threecontainer").offsetHeight
    // const ll = 1.2
    // const d = Math.sqrt(size.x * size.x + size.y * size.y) / ll
    // // const d = 300
    // let camera2 = new THREE.OrthographicCamera(-d, d, d, -d, 0.1, 1000) //  直接展示物体每个面的真实 映射  眼 = 物体
    // let camera = new THREE.OrthographicCamera(x / -2, x / 2, y / 2, y / -2, 1, 1000) //  直接展示物体每个面的真实 映射  眼 = 物体
    // let camera = new THREE.OrthographicCamera(-y / ll, y / ll, z / ll, -z / ll, 1, 1000) //  直接展示物体每个面的真实 映射  眼 = 物体

    const aspect = width / height
    const camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000) //  模拟人眼  以点看物体  眼 < 物体

    // camera.updateProjectionMatrix()
    // 计算相机位置
    // 定位相机到左上角
    camera.position.set(x + y, -y, center.z)
    camera.lookAt(center)
    // camera.up.set(0, 0, 1)

    // const helper = new THREE.CameraHelper(camera)
    // scene.add(helper)
    initialStatus.value.savedPosition = camera.position.clone()
    initialStatus.value.savedRotation = camera.rotation.clone()
    return camera
  }

  const createGridHelper = size => {
    const num = ((size.x * size.y) / 100) * 5
    scene.remove(gridHelper)
    gridHelper = new THREE.GridHelper(200, num) // 200是网格大小，50是网格线数量
    gridHelper.rotation.x = Math.PI / 2
    gridHelper.position.z += -size.z / 2 - 3 // 将网格基底旋转到 YZ 平面
    scene.add(gridHelper)
  }

  const getMeshAndSize = mesh => {
    const box = new THREE.Box3().setFromObject(mesh)
    const center = box.getCenter(new THREE.Vector3())
    mesh.position.sub(center) // 将模型居中
    const size = box.getSize(new THREE.Vector3())
    return { box, center, size }
  }

  const createControls = (camera, dom, type = "orbit") => {
    let controls
    if (type != "orbit") {
      controls = new TransformControls(camera, dom)
    } else {
      controls = new OrbitControls(camera, dom)
    }
    // controls.size = 20
    controls.enableDamping = true // 启用阻尼效果  必须调用update()
    controls.dampingFactor = 0.25 // 阻尼系数
    controls.enableZoom = true // 启用缩放
    // controls.enablePan = !true;
    // controls.screenSpacePanning = false; // 允许基于世界坐标的平移
    controls.target.set(0, 0, 0)
    controls.minDistance = 1
    controls.maxDistance = 1000

    //  默认旋转
    // controls.enableRotate = true // 启用旋转
    // controls.autoRotate = true
    // controls.autoRotateSpeed = 3

    initialStatus.value.controlsarget = controls.target.clone()

    // const transControl = new TransformControls(camera, dom)
    // transControl.setTranslationSnap(1)
    // transControl.setRotationSnap(THREE.MathUtils.degToRad(15))
    // transControl.setScaleSnap(0.25)
    // scene.add(transControl)
    // transControl.attach(mesh)

    // controls.addEventListener( 'change', render );
    return controls
  }
  // 添加轴辅助器  原点坐标指示
  const addAxes = size => {
    const max = Math.max(size.x, size.y, size.z)
    const axesHelper = new THREE.AxesHelper(max / 2 + 30)
    scene.add(axesHelper)
  }

  // 添加一个跟随相机的平行光源
  const addLightOfCamera = () => {
    const pointLight = new THREE.DirectionalLight(0xffffff, 0.8)
    pointLight.castShadow = true
    scene.add(pointLight)
    return pointLight
  }
  //
  const addPotlightOfCamera = () => {
    const spotLight = new THREE.SpotLight(0xffffff, 1)
    // spotLight.position.set(0, 0, 0)
    // spotLight.castShadow = true // 启用阴影  灯光将投射阴影  这样做的代价比较高
    scene.add(spotLight)
    // scene.add(spotLight.target)
    const spotHelper = new THREE.SpotLightHelper(spotLight)
    scene.add(spotHelper)
    return spotLight
  }
  // 移除所有光源
  const removeAllLights = scene => {
    const lights = [] // 用于存储场景中所有的光源
    // 遍历场景中的所有对象，找到光源
    scene.traverse(function (object) {
      if (object instanceof THREE.Light) {
        lights.push(object)
      }
    })
    // 移除找到的所有光源
    lights.forEach(light => {
      scene.remove(light)
    })
  }

  // const fitCameraToObject = (camera, size, center, controls) => {
  //   const maxSize = Math.max(size.x, size.y, size.z)
  //   const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360))
  //   const fitWidthDistance = fitHeightDistance / camera.aspect
  //   const distance = Math.max(fitHeightDistance, fitWidthDistance)

  //   const direction = controls.target.clone().sub(camera.position).normalize().multiplyScalar(distance)
  //   controls.maxDistance = distance * 10
  //   controls.target.copy(center)

  //   camera.near = distance / 100
  //   camera.far = distance * 100
  //   camera.updateProjectionMatrix()
  //   camera.position.copy(controls.target).sub(direction)

  //   controls.update()
  // }
  // 清空场景所有对象
  const clearScene = () => {
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

  const LoadStep = async fileUrl => {
    // init occt-import-js   已全局引入
    // eslint-disable-next-line no-undef
    const occt = await occtimportjs()
    let response = await fetch(fileUrl)
    let buffer = await response.arrayBuffer()
    // read the imported step file
    let fileBuffer = new Uint8Array(buffer)
    let result = occt.ReadStepFile(fileBuffer, null)
    // process the geometries of the result
    const resultMesh = result.meshes[0]
    let geometry = new THREE.BufferGeometry()

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(resultMesh.attributes.position.array, 3))
    if (resultMesh.attributes.normal) {
      geometry.setAttribute("normal", new THREE.Float32BufferAttribute(resultMesh.attributes.normal.array, 3))
    }
    const index = Uint32Array.from(resultMesh.index.array)
    geometry.setIndex(new THREE.BufferAttribute(index, 1))

    let material = null
    if (resultMesh.color) {
      const color = new THREE.Color(resultMesh.color[0], resultMesh.color[1], resultMesh.color[2])
      material = new THREE.MeshPhongMaterial({ color: color })
    } else {
      //  side 属性很重要  用于剖面空心状态的显示
      // material = new THREE.MeshPhongMaterial({ color: 0xcccccc, side: THREE.BackSide })
      material = new THREE.MeshPhongMaterial({ color: 0xcccccc })
    }
    return { geometry, material }
  }

  const LoadIges = async fileUrl => {
    // init occt-import-js   已全局引入
    // eslint-disable-next-line no-undef

    //   occtimportjs ().then (async function (occt) {
    //     let fileUrl = '../test/testfiles/simple-basic-cube/cube.stp';
    //     let response = await fetch (fileUrl);
    //     let buffer = await response.arrayBuffer ();
    //     let fileBuffer = new Uint8Array (buffer);
    //     let result = occt.ReadStepFile (fileBuffer, null);
    //     console.log (result);
    // });

    const occt = await occtimportjs()
    // download a step file
    let response = await fetch(fileUrl)
    let buffer = await response.arrayBuffer()
    // read the imported step file
    let fileBuffer = new Uint8Array(buffer)
    // let igesResult = occt.ReadIgesFile(fileBuffer, null);
    let result = occt.ReadIgesFile(fileBuffer, null)
    if (result.success) {
      const mergedGeometry = new THREE.BufferGeometry()
      const positionArray = []
      const normalArray = []
      const indexArray = []

      let offset = 0

      result.meshes.forEach(mesh => {
        positionArray.push(...mesh.attributes.position.array)
        if (mesh.attributes.normal) {
          normalArray.push(...mesh.attributes.normal.array)
        }
        if (mesh.index) {
          mesh.index.array.forEach(index => {
            indexArray.push(index + offset)
          })
          offset += mesh.attributes.position.array.length / 3
        }
      })
      const positions = new Float32Array(positionArray)
      mergedGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      if (normalArray.length > 0) {
        const normals = new Float32Array(normalArray)
        mergedGeometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3))
      }
      if (indexArray.length > 0) {
        const indices = new Uint32Array(indexArray)
        mergedGeometry.setIndex(new THREE.BufferAttribute(indices, 1))
      }
      mergedGeometry.computeBoundingBox()
      mergedGeometry.computeBoundingSphere()
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
      return { geometry: mergedGeometry, material }
    } else {
      console.error("IGES文件加载失败")
    }
  }

  // const LoadX_T = async file => {
  //   // 初始化node-occ
  //   const occ = await init()
  //   const data = await readFile(filePath)
  //   occ.readParasolid(data, (err, shapes) => {
  //     if (err) {
  //       console.error("Failed to parse x_t file:", err)
  //       return
  //     }

  //     const mergedGeometry = new THREE.BufferGeometry()
  //     const positionArray = []
  //     const normalArray = []
  //     const indexArray = []
  //     let offset = 0

  //     shapes.forEach(shape => {
  //       shape.faces.forEach(face => {
  //         face.vertices.forEach(vertex => {
  //           positionArray.push(vertex.x, vertex.y, vertex.z)
  //         })
  //         face.indices.forEach(index => {
  //           indexArray.push(index + offset)
  //         })
  //         offset += face.vertices.length
  //       })
  //     })

  //     const positions = new Float32Array(positionArray)
  //     mergedGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  //     if (normalArray.length > 0) {
  //       const normals = new Float32Array(normalArray)
  //       mergedGeometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3))
  //     }

  //     if (indexArray.length > 0) {
  //       const indices = new Uint32Array(indexArray)
  //       mergedGeometry.setIndex(new THREE.BufferAttribute(indices, 1))
  //     }

  //     mergedGeometry.computeBoundingBox()
  //     mergedGeometry.computeBoundingSphere()

  //     const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  //     // const combinedMesh = new THREE.Mesh(mergedGeometry, material);
  //     // scene.add(combinedMesh);
  //     return { mergedGeometry, material }
  //   })
  // }
  // //  添加面选择器
  // const addFaceSelector = () => {
  //   const onMouseMove = event => {
  //     event.preventDefault()
  //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  //     raycaster.setFromCamera(mouse, camera)
  //     const intersects = raycaster.intersectObjects(scene.children, true)
  //     if (intersects.length > 0) {
  //       const intersect = intersects[0]
  //       selectedFace = intersect.face
  //       highlightFace(intersect)
  //     }
  //   }

  //   function highlightFace(intersect) {
  //     const geometry = intersect.object.geometry
  //     const face = intersect.face

  //     // 创建新的材质
  //     const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })

  //     // 创建一个新的几何体，仅包含选中的面
  //     const faceGeometry = new THREE.BufferGeometry()
  //     faceGeometry.setAttribute(
  //       "position",
  //       new THREE.Float32BufferAttribute(
  //         [
  //           geometry.attributes.position.getX(face.a),
  //           geometry.attributes.position.getY(face.a),
  //           geometry.attributes.position.getZ(face.a),
  //           geometry.attributes.position.getX(face.b),
  //           geometry.attributes.position.getY(face.b),
  //           geometry.attributes.position.getZ(face.b),
  //           geometry.attributes.position.getX(face.c),
  //           geometry.attributes.position.getY(face.c),
  //           geometry.attributes.position.getZ(face.c),
  //         ],
  //         3,
  //       ),
  //     )

  //     const faceMesh = new THREE.Mesh(faceGeometry, highlightMaterial)
  //     scene.add(faceMesh)
  //   }
  // }

  // // 设置位面相机位置和方向
  // const createFaceCamera = (size, center) => {
  //   const d = Math.sqrt(size.x * size.x + size.y * size.y)
  //   let camera = new THREE.OrthographicCamera(-d, d, d, -d, 1, 1000)
  //   // 计算相机位置
  //   // 定位相机到左上角
  //   camera.position.set(center.x - size.x, center.y + size.y, center.z)
  //   camera.lookAt(center)
  //   camera.up.set(0, 0, 1)
  //   return camera
  // }

  const addBox = mesh => {
    //  三维盒 ????
    // const box = new THREE.Box3().setFromObject(mesh)
    // const boxHelper = new THREE.Box3Helper(box, 0xffffff)
    // 添加可视化包围盒
    const boxHelper = new THREE.BoxHelper(mesh, 0xffffff)
    const box = new THREE.Box3().setFromObject(mesh)
    const labelArr = [boxHelper] //  labelArr 用于记录元素  便于后续 一键清除
    addSizeLabels(box, labelArr)
    scene.add(boxHelper)
    return labelArr
  }

  // 添加尺寸信息的函数
  const addSizeLabels = (box, labelArr) => {
    // const size = new THREE.Vector3()
    // box.getSize(size)
    const size = box.getSize(new THREE.Vector3())
    //  此处scale 用于获得相机距离模型的距离  从而计算 文本放大比例
    const d = Math.sqrt(size.x * size.x + size.y * size.y)
    const scale = (d / 4).toFixed(2)
    const positions = [
      {
        text: `长: ${size.x.toFixed(2)}`,
        position: new THREE.Vector3((box.min.x + box.max.x) / 2, box.min.y, box.min.z),
      },
      {
        text: `宽: ${size.y.toFixed(2)}`,
        position: new THREE.Vector3(box.min.x, (box.min.y + box.max.y) / 2, box.min.z),
      },
      {
        text: `高: ${size.z.toFixed(2)}`,
        position: new THREE.Vector3(box.min.x, box.min.y, (box.min.z + box.max.z) / 2),
      },
    ]

    positions.forEach(dimension => {
      const sprite = createTextSprite(dimension.text, scale)
      sprite.position.copy(dimension.position)
      sprite.material.depthTest = false // 确保文本不被遮挡
      scene.add(sprite) // 添加到场景中
      labelArr.push(sprite)
    })

    // 调整每个标签的位置，使其位于对应的线条中间
    positions[0].position.set((box.min.x + box.max.x) / 2, box.min.y - 0.1, box.min.z - 0.1) // 长：底部中间
    positions[1].position.set(box.min.x - 0.1, (box.min.y + box.max.y) / 2, box.min.z - 0.1) // 宽：左侧中间
    positions[2].position.set(box.min.x - 0.1, box.min.y - 0.1, (box.min.z + box.max.z) / 2) // 高：前面中间

    positions.forEach(dimension => {
      const sprite = createTextSprite(dimension.text)
      sprite.position.copy(dimension.position)
      // sprite.material.depthTest = false; // 确保文本不被遮挡
      sprite.position.z += 0.1 // 防止与其他对象重叠
      scene.add(sprite) // 添加到场景中
      labelArr.push(sprite)
    })
  }

  //  添加 方向 箭头
  const addArrow = () => {
    const dir = new THREE.Vector3(1, 2, 0)

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize()

    const origin = new THREE.Vector3(10, 10, 10)
    const length = 50
    const hex = 0xffff00

    const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex)
    scene.add(arrowHelper)
  }

  const addEnvironment = renderer => {
    // 添加 官方预设环境
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
  }

  const createTexture = () => {
    // const rgbeLoader = new RGBELoader()
    // rgbeLoader.loadAsync("http://xzz2022.top:2222/rural.hdr").then(texture => {
    //   return texture
    // })
    const urls = [imgUrl0, imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5]
    // console.log("🚀 ~ file: ThreeViewer.vue:167 ~ urls:", urls)
    return new THREE.CubeTextureLoader().load(
      urls,
      () => {
        // console.log("Environment map loaded.")
      },
      undefined,
      err => {
        console.error("An error happened:", err)
      },
    )
  }

  const addGui2 = (mesh, material, renderer) => {
    // 创建一个剪裁平面  此处 可以控制轴向剖面
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 30)
    // const helper = new THREE.PlaneHelper(plane, 300, 0xffff00)
    // scene.add(helper)

    // // 设置模型材质
    mesh &&
      mesh.traverse(function (child) {
        if (child.isMesh) {
          // 外部材质
          child.material = new THREE.MeshStandardMaterial({
            color: 0xff00ff,
            side: THREE.BackSide,
            // clippingPlanes: [plane],
            transparent: false, // 确保透明度为false
            opacity: 1,
            depthWrite: false, //  此处一定要关闭  不然会有穿透
            depthTest: true, // 启用深度测试
            clipShadows: true,
          })
          // 内部材质
          const innerMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.FrontSide,
            // clippingPlanes: [plane],
            opacity: 1,
            transparent: false, // 确保透明度为false
            clipShadows: true,
            depthWrite: true,
            depthTest: true, // 启用深度测试
          })
          const innerMesh = child.clone()
          innerMesh.material = innerMaterial
          // child.renderOrder = 1
          // innerMesh.renderOrder = 2
          scene.add(innerMesh)
        }
      })
    // 启用全局剪裁平面
    renderer.localClippingEnabled = true
    renderer.clippingPlanes = [plane]
    // 清除上一次gui添加的元素
    // gui && gui.destroy()
    const gui = new GUI()

    const options = {
      // clipIntersection: true,
      // displayHelper: false,
      solid: true,
    }

    gui
      .add(options, "solid")
      .name("实心/空心")
      .onChange(value => {
        if (value) {
          material.transparent = false
          material.opacity = 1
          material.depthWrite = true
          material.depthTest = true
          material.side = THREE.DoubleSide
        } else {
          material.transparent = true
          material.opacity = 1
          material.depthWrite = false
          material.depthTest = false
          material.side = THREE.DoubleSide
        }
      })

    gui.add(plane, "constant", -30, 30).name("剖面图")
    const params = {
      color: 0xffff00,
      fn: () => {
        gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
      },
    }

    gui.addColor(params, "color").name("颜色")

    // 添加函数 点击执行
    // gui.addColor(params, "fn").name("运动")

    // 添加文件夹
    // const folder = gui.addFolder('设置文件夹')
    // folder.add(params, 'fn').name('运动')
  }

  const addGui222 = (mesh, material) => {
    // 清除上一次gui添加的元素
    gui && gui.destroy()
    gui = new GUI()

    const params = {
      color: 0xffff00,
      fn: () => {
        gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
      },
    }

    gui.addColor(params, "color").name("颜色")

    // 添加函数 点击执行
    // gui.addColor(params, "fn").name("运动")

    // 添加文件夹
    // const folder = gui.addFolder('设置文件夹')
    // folder.add(params, 'fn').name('运动')
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

  //  添加视图控制器
  // const addFaceGui = camera => {
  //   const gui = new dat.GUI()
  //   const options = { View: "" }

  //   gui.add(options, "View", ["顶视图", "底视图", "左视图", "右视图", "前视图", "后视图"]).onChange(function (value) {
  //     switch (value) {
  //       case "顶视图":
  //         changeFace(camera, 0)
  //         break
  //       case "底视图":
  //         changeFace(camera, 1)
  //         break
  //       case "左视图":
  //         changeFace(camera, 2)
  //         break
  //       case "右视图":
  //         changeFace(camera, 3)
  //         break
  //       case "前视图":
  //         changeFace(camera, 4)
  //         break
  //       case "后视图":
  //         changeFace(camera, 5)
  //         break
  //       default:
  //         break
  //     }
  //   })
  // }

  // 创建显示尺寸信息的精灵函数
  const createTextSprite = (text, scale) => {
    const canvas = document.createElement("canvas")

    const context = canvas.getContext("2d")

    // 设置较大的分辨率和字体
    const fontSize = 40 // 增大字体大小
    const padding = 10 // 内边距
    context.font = `Bold ${fontSize}px Arial`
    context.fillStyle = "rgba(255, 255, 255, 1.0)"

    // 计算文本宽度，调整canvas大小
    const metrics = context.measureText(text)
    const textWidth = metrics.width

    canvas.width = textWidth + padding * 2 // 加一些填充
    canvas.height = fontSize + padding * 2 // 固定高度

    // 重新绘制文本到调整过大小的canvas上
    context.font = `Bold ${fontSize}px Arial`
    context.fillStyle = "rgba(255, 255, 255, 1.0)"
    // canvas.zIndex = 9999999
    context.fillText(text, padding, fontSize + padding)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
    const sprite = new THREE.Sprite(spriteMaterial)
    // sprite.renderOrder = 999 // 确保精灵渲染在其他对象之上  ??  不需要

    // 调整比例以适应场景，使用固定的比例
    // const scale = 10 // 固定大小的比例
    sprite.scale.set(scale, scale * (canvas.height / canvas.width), 1)

    return sprite
  }

  const totastMesh = controls => {
    // controls.autoRotateSpeed = 3
    controls.autoRotate = !controls?.autoRotate
  }
  const toggleFullScreen = renderer => {
    // 切换 全屏 展示  控制canvas
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullScreenElement) {
      renderer.domElement.requestFullscreen()
    } else {
      renderer.domElement.exitFullscreen()
    }
  }
  //  检查是否要调整renderer   因为renderer要和canvas大小一致
  const resizeRendererToDisplaySize = renderer => {
    const canvas = renderer.domElement
    //  根据设备显示器性能  自动调整渲染器的精度   高分辨率屏幕上 渲染更精细
    const pixelRatio = window.devicePixelRatio
    const width = Math.floor(canvas.clientWidth * pixelRatio)
    const height = Math.floor(canvas.clientHeight * pixelRatio)
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  const checkThickness00 = mesh => {
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

        if (intersects.length > 0 && intersects[0].distance > 0 && intersects[0].distance < threshold * 1e-15) {
          console.log("🚀 ~ file: useThree.js:873 ~ intersects[0].distance:", intersects[0].distance)
          // highlightFace(mesh, i, 0xff0000) // 高亮颜色为红色
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

    detectWallThickness(mesh, 0.1)
  }

  const checkThickness = mesh => {
    // 遍历模型几何体
    mesh.traverse(child => {
      // 遍历模型的每个子元素
      if (child.isMesh) {
        // 如果子元素是一个网格
        const geometry = child.geometry // 获取网格的几何体
        geometry.computeBoundingBox() // 计算几何体的边界框
        geometry.computeVertexNormals() // 计算几何体的顶点法线

        // 准备进行射线投射
        const positions = geometry.attributes.position.array // 获取几何体的顶点位置数组
        const normals = geometry.attributes.normal.array // 获取几何体的顶点法线数组
        const raycaster = new THREE.Raycaster() // 创建射线投射器
        const thicknesses = [] // 存储计算的壁厚值

        // 获取原始顶点颜色（如果有的话）
        const originalColors = geometry.attributes.color ? geometry.attributes.color.array : null
        const hasVertexColors = !!originalColors

        // 计算厚度
        for (let i = 0; i < positions.length; i += 3) {
          // 遍历顶点位置数组，每次处理一个顶点
          const origin = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]) // 创建顶点位置向量
          const direction = new THREE.Vector3(normals[i], normals[i + 1], normals[i + 2]).normalize() // 创建法线方向向量并归一化

          raycaster.set(origin, direction) // 设置射线投射器的起点和方向

          // 检测交点
          const intersects = raycaster.intersectObject(mesh, true) // 进行射线投射，检测与模型的交点
          if (intersects.length > 1) {
            // 如果检测到多个交点
            const distance = intersects[1].distance - intersects[0].distance // 计算两个交点之间的距离
            thicknesses.push(distance) // 将计算的距离（壁厚）添加到数组中
          } else {
            thicknesses.push(Infinity) // 未找到交点，设置为无穷大
          }
        }
        // console.log("🚀 ~ file: useThree.js:942 ~ thicknesses:", thicknesses)

        // 创建基于厚度的颜色数组
        const colors = new Float32Array(positions.length)
        for (let i = 0; i < thicknesses.length; i++) {
          const color = new THREE.Color()
          if (thicknesses[i] < 2) {
            color.set(0xff0000) // 壁厚小于 2 的部分设置为红色
          } else if (hasVertexColors) {
            // 保持原有颜色
            // color.setRGB(originalColors[i * 3], originalColors[i * 3 + 1], originalColors[i * 3 + 2])
          } else {
            // 使用默认颜色（假设为白色）
            // color.setRGB(1, 1, 1)
          }
          colors[i * 3] = color.r
          colors[i * 3 + 1] = color.g
          colors[i * 3 + 2] = color.b
        }

        // 将颜色数组应用到几何体
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

        // 设置材质以启用顶点颜色
        // child.material = new THREE.MeshBasicMaterial({ vertexColors: true })
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.4,
          roughness: 0.2,
          vertexColors: true,
        })
      }
    })
  }

  const pianyichang00 = mesh => {
    // 计算距离场的函数
    function computeDistanceField(geometry, distances) {
      const raycaster = new THREE.Raycaster()
      const positions = geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        const origin = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])
        raycaster.set(origin, new THREE.Vector3(0, 0, 0)) // 射线方向可以任意设置
        const intersects = raycaster.intersectObject(geometry, true)
        distances[i / 3] = intersects.length > 0 ? intersects[0].distance : Infinity
      }
    }

    // 计算偏移场的函数
    function computeOffsetField(geometry, distances, thicknesses) {
      const positions = geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        const origin = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])
        const offsetDistance = getOffsetDistance(origin, distances)
        thicknesses[i / 3] = offsetDistance
      }
    }

    // 获取偏移距离的辅助函数
    function getOffsetDistance(origin, distances) {
      // 此处应实现获取偏移距离的逻辑
      // 假设我们有一个函数来计算偏移距离
      return computeOffsetDistance(origin, distances)
    }
    // 准备计算距离场
    const geometry = new THREE.BufferGeometry().fromGeometry(new THREE.Geometry().fromBufferGeometry(mesh.children[0].geometry))
    const positions = geometry.attributes.position.array
    const distances = new Float32Array(positions.length / 3)

    // 初始化距离场计算
    computeDistanceField(geometry, distances)

    // 计算偏移场并比较距离
    const thicknesses = new Float32Array(positions.length / 3)
    computeOffsetField(geometry, distances, thicknesses)

    // 创建颜色数组并应用
    const colors = new Float32Array(positions.length)
    for (let i = 0; i < thicknesses.length; i++) {
      const color = new THREE.Color()
      if (thicknesses[i] < 2) {
        color.set(0xff0000) // 红色表示壁厚小于2的区域
      } else {
        color.set(0xffffff) // 其他区域保持原始颜色
      }
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    mesh.children[0].material = new THREE.MeshBasicMaterial({ vertexColors: true })
  }

  const pianyichang = mesh => {
    function calculateThicknessAtPoint(positions, index, geometry) {
      const origin = new THREE.Vector3(positions[index], positions[index + 1], positions[index + 2])
      const direction = new THREE.Vector3(0, 0, 1) // 假设沿z轴方向投射射线

      // 创建射线投射器
      const raycaster = new THREE.Raycaster(origin, direction.normalize())

      // 获取与当前模型的交点
      const intersects = raycaster.intersectObject(geometry, true)

      if (intersects.length < 2) {
        return Infinity // 如果交点少于2个，表示该点不在闭合体内
      }

      // 计算交点之间的距离
      let minDistance = Infinity
      for (let i = 0; i < intersects.length - 1; i++) {
        for (let j = i + 1; j < intersects.length; j++) {
          const distance = intersects[j].distance - intersects[i].distance
          if (distance > 0 && distance < minDistance) {
            minDistance = distance
          }
        }
      }

      return minDistance
    }

    // 切片参数
    const sliceCount = 100 // 切片数量
    const bbox = new THREE.Box3().setFromObject(mesh) // 获取模型的包围盒
    const sliceThickness = (bbox.max.z - bbox.min.z) / sliceCount // 计算每个切片的厚度

    const colors = new Float32Array(mesh.geometry.attributes.position.count * 3)

    // 遍历每个切片
    for (let i = 0; i < sliceCount; i++) {
      const zPos = bbox.min.z + i * sliceThickness

      // 在该切片位置进行壁厚计算
      mesh.traverse(child => {
        if (child.isMesh) {
          const geometry = child.geometry
          const positions = geometry.attributes.position.array
          for (let j = 0; j < positions.length; j += 3) {
            const z = positions[j + 2]
            if (Math.abs(z - zPos) < sliceThickness / 2) {
              // 假设此处进行壁厚计算，获得thickness值
              const thickness = calculateThicknessAtPoint(positions, j, mesh)

              const color = new THREE.Color()
              if (thickness < 2) {
                color.set(0xff0000) // 壁厚小于2的部分设为红色
              } else {
                // color.set(0xffffff) // 其他部分设为白色
              }
              colors[j] = color.r
              colors[j + 1] = color.g
              colors[j + 2] = color.b
            }
          }
        }
      })
    }

    mesh.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    mesh.material = new THREE.MeshBasicMaterial({ vertexColors: true })
  }
  // onMounted(() => {
  //   init()
  // })
  // onUnmounted(() => {
  //   renderer.dispose()
  // })
  return {
    scene,
    gui,
    addBox,
    addArrow,
    addLightOfCamera,
    addGui2,
    // addFaceGui,
    changeFace,
    addEnvironment,
    createControls,
    getMeshAndSize,
    createLight,
    chooseLoader,
    createCarmera,
    createGridHelper,
    addAxes,
    clearScene,
    LoadStep,
    LoadIges,
    resizeRendererToDisplaySize,
    addPotlightOfCamera,
    totastMesh,
    savedRotation,
    savedPosition,
    createTexture,
    containerRef,
    initialStatus,
    createRenderer,
    checkThickness,
    pianyichang,
  }
}
