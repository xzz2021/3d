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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { onMounted } from "vue"

export const useThree = () => {

  const initialStatus = ref({})
  
  // 初始化创建场景
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x8c8aff) //  设置场景的背景色0x8c8aff
  //  初始化renderer
  const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true,
    })
    renderer.setSize(800, 600)
    renderer.shadowMap.enabled = true // 启用阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setViewport(0, 0, 800, 600) //主场景视区
    renderer.autoClear = false //【scene.autoClear一定要关闭】

  // 初始化相机位置和方向
    const w = 800 / 2
    const h = 600 / 2
    const camera = new THREE.OrthographicCamera(-w, w, h, -h, 1, 10000) //  直接展示物体每个面的真实 映射  眼 = 物体
    //  根据模型大小和canvas大小动态缩放

    camera.lookAt(0,0,0)
    initialStatus.value.savedPosition = camera.position.clone()
    initialStatus.value.savedRotation = camera.rotation.clone()

    let cameraLight = null;
    const addCameraLight = (scene) => {
       cameraLight = new THREE.DirectionalLight(0xffffff, 0.8)
      cameraLight.castShadow = true
      scene.add(cameraLight)
    }


    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true // 启用阻尼效果  必须调用update()
    controls.dampingFactor = 0.25 // 阻尼系数
    controls.enableZoom = true // 启用缩放
    controls.target.set(0, 0, 0)
    controls.minDistance = 1
    controls.maxDistance = 1000
    controls.autoRotateSpeed = 3
    initialStatus.value.controlsarget = controls.target.clone()

    const animate = () => {
      window.requestAnimationFrame(animate)
      if (camera) {
      controls.update()
      // 使点光源跟随相机
      if(cameraLight){
        const vector = camera.position.clone()
        cameraLight.position.set(vector.x, vector.y, vector.z) //点光源位置
      }
      // 显示器每刷新一次就重新render一次  相当于实时刷新渲染的场景
      // 也就是这里定义的方法 会随显示屏每一帧刷新率而刷新
      renderer.render(scene, camera)
      }
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

onMounted(() => {
  animate()
})

  return {
    initialStatus,
    scene,
    renderer,
    camera,
    controls,
    chooseLoader,
    LoadStep,
    LoadIges,
    addCameraLight
  }
}
