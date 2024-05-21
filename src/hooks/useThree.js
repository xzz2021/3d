import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { XYZLoader } from 'three/examples/jsm/loaders/XYZLoader';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';


export const useThree = () => {

    // const ll = 0.6
    // const aspect = window.innerWidth / window.innerHeight  * 0.6// 窗口宽高比
    // const winW = window.innerWidth
    // const winH = window.innerHeight
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8c8aff)  //  设置场景的背景色
    let pointLight;
    
    // let d = 75 // 控制视锥的尺寸  //  控制相机与模型中心的距离
    // let camera = new THREE.OrthographicCamera(-d, d, d, -d, 1, 1000);
    let renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    // let controls =  new OrbitControls(camera, renderer.domElement)
    let gridHelper;
    const createRenderer = () => {
        renderer.setSize(600, 600);
        renderer.shadowMap.enabled = true; // 启用阴影
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //  此处与renderer.autoClear  冲突
        // renderer.setClearColor(0x8c8aff); // 设置为白色
        // 设置渲染器屏幕像素比
        renderer.setPixelRatio(window.devicePixelRatio || 1);
    }
     // 添加光源  不然模型会是全黑色的
    const createLight = (size) => {
      // 添加灯源前先移除所有的灯光
      removeAllLights(scene)
      //  平行光的距离影响也很大  太远会显得很模糊
      const lightX = size.x + 50;
      const lightY = size.y + 50;
      const lightZ = size.z;
      console.log(lightX, lightY, lightZ);
      const halfZ = lightZ / 2
       // 添加光源  不然模型会是全黑色的
       const ambientLight = new THREE.AmbientLight(0xffffff,0.8);
       scene.add(ambientLight);
      //  return 
      // 左前XY
       const directionLight2 = new THREE.DirectionalLight(0xffffff,0.8)
       directionLight2.position.set(lightX, -lightY/4, halfZ);
       scene.add(directionLight2);
      //  return 
       // 右前
       const directionLight22 = new THREE.DirectionalLight(0xffffff,0.8)
       directionLight22.position.set(lightX, lightY/4, halfZ);
       scene.add(directionLight22);
       // 左后
       const directionLight77 = new THREE.DirectionalLight(0xffffff,0.8)
       directionLight77.position.set(-lightX, -lightY/4, 20);
       scene.add(directionLight77);
       // 右后
       const directionLight27 = new THREE.DirectionalLight(0xffffff,0.8)
       directionLight27.position.set(-lightX, lightY/4, 20);
       scene.add(directionLight27);

       // 顶部
      // const directionLightBottom = new THREE.DirectionalLight(0xffffff,0.4)
      // directionLightBottom.position.set(0, 0, lightZ +50);
      // scene.add(directionLightBottom);

      // //底部
      // const directionLightTop = new THREE.DirectionalLight(0xffffff,0.4)
      // directionLightTop.position.set(0, 0, -200);
      // scene.add(directionLightTop);

      // X 正前方
    //   const directionLightFront = new THREE.DirectionalLight(0xffffff,0.8)
    //   directionLightFront.position.set(lightX * 2, 0, halfZ);
    //    scene.add(directionLightFront);

    //    // -X 正前方
    //   const directionLightBack = new THREE.DirectionalLight(0xffffff,0.8)
    //   directionLightBack.position.set(-lightX * 2, 0, halfZ);
    //    scene.add(directionLightBack);

    //  // Y 正前方
    //   const directionLightRight = new THREE.DirectionalLight(0xffffff,0.2)
    //   directionLightRight.position.set(0, lightY, halfZ);
    //   scene.add(directionLightRight);

    //   // -Y 正前方
    //   const directionLightLeft = new THREE.DirectionalLight(0xffffff,0.2)
    //   directionLightLeft.position.set(0, -lightY, halfZ);
    //   scene.add(directionLightLeft);

    //   // // 左面
    //   const directionLightLeft = new THREE.DirectionalLight(0xffffff,0.2)
    //   directionLightLeft.position.set(0, -150, 20);
    //   scene.add(directionLightLeft);

       //  正前方45度
      // const directionLight33 = new THREE.DirectionalLight(0xffffff,0.1)
      // directionLight33.position.set(0, lightY, halfZ);
      // scene.add(directionLight33);

      //  正后方45度
    //   const directionLightBack45 = new THREE.DirectionalLight(0xffffff,0.5)
    //   directionLightBack45.position.set(-170, 0, 170);
    //   scene.add(directionLightBack45);

      // const spotLight = new THREE.SpotLight(0xffffff,0.3);
      // spotLight.position.set(0, 0, 200);
      // spotLight.castShadow = true;
      // spotLight.angle = Math.PI / 6;
      // spotLight.penumbra = 0.1;
      // spotLight.decay = 2;
      // spotLight.distance = 200;
      // scene.add(spotLight);

      // const spotLightFront = new THREE.SpotLight(0xffffff,0.3);
      // spotLightFront.position.set(200, 0, 0);
      // spotLightFront.castShadow = true;
      // spotLightFront.angle = Math.PI / 6;
      // spotLightFront.penumbra = 0.1;
      // spotLightFront.decay = 2;
      // spotLightFront.distance = 200;
      // scene.add(spotLightFront);


      // const spotLightRight = new THREE.SpotLight(0xffffff,0.3);
      // spotLightRight.position.set(0, 200, 0);
      // spotLightRight.castShadow = true;
      // spotLightRight.angle = Math.PI / 6;
      // spotLightRight.penumbra = 0.1;
      // spotLightRight.decay = 2;
      // spotLightRight.distance = 200;
      // scene.add(spotLightRight);
        }
        // 添加一个跟随相机的平行光源
    const createCameraLight = () => {
          pointLight = new THREE.DirectionalLight(0xffffff,1, 100);
          pointLight.castShadow = true;
          scene.add(pointLight);
    }
    // 自动选择相应 加载器
    const chooseLoader = (type) => {
      let loader;
      switch (type.toLowerCase()) {
        case 'gltf':
        case 'glb':
          loader = new GLTFLoader();
          break;
        case 'obj':
          loader = new OBJLoader();
          break;
        case 'fbx':
          loader = new FBXLoader();
          break;
        case 'stl':
        // case 'x_t':
          loader = new STLLoader();
          break;
        case 'ply':
          loader = new PLYLoader();
          break;
        case 'collada':
        case 'dae':
          loader = new ColladaLoader();
          break;
        case '3ds':
          loader = new TDSLoader();
          break;
        case 'svg':
          loader = new SVGLoader();
          break;
        case 'vrml':
        case 'wrl':
          loader = new VRMLLoader();
          break;
        case 'pcd':
          loader = new PCDLoader();
          break;
        case 'xyz':
          loader = new XYZLoader();
          break;
        case 'pdb':
          loader = new PDBLoader();
          break;
        case 'ktx2':
          loader = new KTX2Loader();
          break;
        default:
          console.error('Unsupported model type:', type);
          return;
      }
      return loader;
    };

        // 设置相机位置和方向
    const createCarmera00 = (size,center) => {
        console.log(size);
        camera.position.z = size.z  * 0.3;
        camera.position.y = -size.y;
        camera.position.x = size.x * 2;
        camera.up.set(0, 0, 1);
        camera.lookAt(center)
    }


    // 设置相机位置和方向
    const createCarmera = (size, center) => {
        console.log(size);
        const d = Math.sqrt(size.x * size.x + size.y * size.y)
        let camera = new THREE.OrthographicCamera(-d, d, d, -d, 1, 1000);
        // 计算相机位置
        // 定位相机到左上角
        // camera.position.set(center.x - size.x, center.y + size.y, center.z)
        camera.position.set(size.x -center.x , -(center.y + size.y), center.z)
        camera.lookAt(center);
        camera.up.set(0, 0, 1);
        return camera
    }

    const createGridHelper = (size) => {
        const num = size.x * size.y / 100 * 5
        scene.remove(gridHelper)
        gridHelper = new THREE.GridHelper(200, num); // 200是网格大小，50是网格线数量
        gridHelper.rotation.x = Math.PI / 2;
        gridHelper.position.z += -size.z / 2 - 3;  // 将网格基底旋转到 YZ 平面
        scene.add(gridHelper);
    }

    //  获取模型信息
    const getModelView = (box) => {
          // 获取模型的宽高
          const model = {}
          model.width = box.max.x - box.min.x;
          model.height = box.max.y - box.min.y;
          model.depth = box.max.z - box.min.z;
          // 计算模型的包装盒体积
          model.volume = model.width * model.height * (box.max.z - box.min.z);
          for (const [key, value] of Object.entries(model)) {
            model[key] = Math.round(value * 1000) / 1000
          }
          return model
    }

    const createControls = (camera, dom ) => {
        // controls = new OrbitControls(camera, dom);
        controls.enableDamping = true; // 启用阻尼效果
        controls.dampingFactor = 0.25; // 阻尼系数
        controls.enableZoom = true; // 启用缩放
        // controls.enablePan = !true;
        controls.enableRotate = true; // 启用旋转
        // controls.screenSpacePanning = false; // 允许基于世界坐标的平移
        controls.target.set(0, 0, 0);
        controls.minDistance = 1;
        controls.maxDistance = 1000;
    }
    // 添加轴辅助器  原点坐标指示
    const addAxes = (size) => {
      const max = Math.max(size.x, size.y, size.z);
        const axesHelper = new THREE.AxesHelper(max/2 + 30);
        scene.add(axesHelper);
    }
    // 移除所有光源
    const removeAllLights = (scene) => {
      const lights = []; // 用于存储场景中所有的光源
      // 遍历场景中的所有对象，找到光源
      scene.traverse(function(object) {
          if (object instanceof THREE.Light) {
              lights.push(object);
          }
      });
      // 移除找到的所有光源
      lights.forEach(light => {
          scene.remove(light);
      });
  }

    const  fitCameraToObject = (camera, size, center, controls) =>{
  
      const maxSize = Math.max(size.x, size.y, size.z);
      const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * camera.fov / 360));
      const fitWidthDistance = fitHeightDistance / camera.aspect;
      const distance = Math.max(fitHeightDistance, fitWidthDistance);
  
      const direction = controls.target.clone()
          .sub(camera.position)
          .normalize()
          .multiplyScalar(distance);
      controls.maxDistance = distance * 10;
      controls.target.copy(center);
  
      camera.near = distance / 100;
      camera.far = distance * 100;
      camera.updateProjectionMatrix();
      camera.position.copy(controls.target).sub(direction);
  
      controls.update();
  }
    // 清空场景所有对象
  const clearScene = () => {
      // 遍历场景中的所有对象
      while (scene.children.length > 0) {
        // 获取第一个子对象
        const object = scene.children[0];
    
        // 如果对象是一个网格
        if (object.isMesh) {
          // 如果网格使用了几何体，释放几何体
          if (object.geometry) {
            object.geometry.dispose();
          }
          // 如果网格使用了材料，释放材料
          if (object.material) {
            if (Array.isArray(object.material)) {
              // 对于数组材料，遍历并释放每个材料
              object.material.forEach(material => material.dispose());
            } else {
              // 对于单个材料，直接释放
              object.material.dispose();
            }
          }
        }
    
        // 从场景中移除对象
        scene.remove(object);
      }
    
      // 可选：如果有需要，也可以清理其他资源，如纹理

  }


  const LoadStep = async(fileUrl) =>{
    // init occt-import-js   已全局引入
    const occt = await occtimportjs();
    // download a step file
    // let fileUrl = 'https://raw.githubusercontent.com/kovacsv/occt-import-js/main/test/testfiles/cax-if/as1_pe_203.stp';
    let response = await fetch (fileUrl);
    let buffer = await response.arrayBuffer ();
    
    // read the imported step file
    let fileBuffer = new Uint8Array (buffer);
    let result = occt.ReadStepFile (fileBuffer, null);
    // process the geometries of the result
    const resultMesh = result.meshes[0]
    let geometry = new THREE.BufferGeometry ();
    
    geometry.setAttribute ('position', new THREE.Float32BufferAttribute (resultMesh.attributes.position.array, 3));
    if (resultMesh.attributes.normal) {
      geometry.setAttribute ('normal', new THREE.Float32BufferAttribute (resultMesh.attributes.normal.array, 3));
    }
    const index = Uint32Array.from (resultMesh.index.array);
    geometry.setIndex (new THREE.BufferAttribute (index, 1));
    
    let material = null;
    if (resultMesh.color) {
      const color = new THREE.Color (resultMesh.color[0], resultMesh.color[1], resultMesh.color[2]);
      material = new THREE.MeshPhongMaterial ({ color: color });
    } else {
      material = new THREE.MeshPhongMaterial ({ color: 0xcccccc });
    }
    
    console.log("🚀 ~ file: useThree.js:376 ~ LoadStep ~ geometry:", geometry)
    return { geometry, material }
    }

    const LoadIges = async(fileUrl) =>{
      // init occt-import-js   已全局引入
      const occt = await occtimportjs();
      console.log("🚀 ~ file: useThree.js:380 ~ LoadIges ~ occt:", occt)
      // return
      // download a step file
      let response = await fetch (fileUrl);
      let buffer = await response.arrayBuffer ();
      // occt.viewer.LoadIges(buffer, { optimiaze: true })
      // occt.viewer
      // return { geometry, material }

      // read the imported step file
      let fileBuffer = new Uint8Array (buffer);
      // let igesResult = occt.ReadIgesFile(fileBuffer, null);
      let result = occt.ReadIgesFile(fileBuffer, null);
      console.log("🚀 ~ file: useThree.js:394 ~ LoadIges ~ result:", result)
      // return
      // 将 IGES 数据转换为 STEP 文件
      // let threeMesh
     if (result.success) {
        const mergedGeometry = new THREE.BufferGeometry();
        const positionArray = [];
        const normalArray = [];
        const indexArray = [];

        let offset = 0;

        result.meshes.forEach(mesh => {
            positionArray.push(...mesh.attributes.position.array);
            if (mesh.attributes.normal) {
                normalArray.push(...mesh.attributes.normal.array);
            }
            if (mesh.index) {
                mesh.index.array.forEach(index => {
                    indexArray.push(index + offset);
                });
                offset += mesh.attributes.position.array.length / 3;
            }
        });

        const positions = new Float32Array(positionArray);
        mergedGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        if (normalArray.length > 0) {
            const normals = new Float32Array(normalArray);
            mergedGeometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
        }

        if (indexArray.length > 0) {
            const indices = new Uint32Array(indexArray);
            mergedGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
        }

        mergedGeometry.computeBoundingBox();
        mergedGeometry.computeBoundingSphere();

        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const combinedMesh = new THREE.Mesh(mergedGeometry, material);
        // scene.add(combinedMesh);
    return { mergedGeometry, material }

    } else {
        console.error("Failed to load IGES file");
    }
    // return { mergedGeometry, material }

      }
  
  const LoadX_T = async (file) => {
    // 初始化node-occ
const occ = await init();
const data = await readFile(filePath);
occ.readParasolid(data, (err, shapes) => {
    if (err) {
        console.error('Failed to parse x_t file:', err);
        return;
    }

    const mergedGeometry = new THREE.BufferGeometry();
    const positionArray = [];
    const normalArray = [];
    const indexArray = [];
    let offset = 0;

    shapes.forEach(shape => {
        shape.faces.forEach(face => {
            face.vertices.forEach(vertex => {
                positionArray.push(vertex.x, vertex.y, vertex.z);
            });
            face.indices.forEach(index => {
                indexArray.push(index + offset);
            });
            offset += face.vertices.length;
        });
    });

    const positions = new Float32Array(positionArray);
    mergedGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    if (normalArray.length > 0) {
        const normals = new Float32Array(normalArray);
        mergedGeometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    }

    if (indexArray.length > 0) {
        const indices = new Uint32Array(indexArray);
        mergedGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
    }

    mergedGeometry.computeBoundingBox();
    mergedGeometry.computeBoundingSphere();

    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    // const combinedMesh = new THREE.Mesh(mergedGeometry, material);
    // scene.add(combinedMesh);
    return { mergedGeometry, material }
  })
}
//  添加面选择器
  const addFaceSelector = () => {
    const  onMouseMove = (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
          const intersect = intersects[0];
          selectedFace = intersect.face;
          highlightFace(intersect);
      }
  }
  
  function highlightFace(intersect) {
      const geometry = intersect.object.geometry;
      const face = intersect.face;
      
      // 创建新的材质
      const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
      
      // 创建一个新的几何体，仅包含选中的面
      const faceGeometry = new THREE.BufferGeometry();
      faceGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
          geometry.attributes.position.getX(face.a), geometry.attributes.position.getY(face.a), geometry.attributes.position.getZ(face.a),
          geometry.attributes.position.getX(face.b), geometry.attributes.position.getY(face.b), geometry.attributes.position.getZ(face.b),
          geometry.attributes.position.getX(face.c), geometry.attributes.position.getY(face.c), geometry.attributes.position.getZ(face.c),
      ], 3));
      
      const faceMesh = new THREE.Mesh(faceGeometry, highlightMaterial);
      scene.add(faceMesh);
  }

  }

  // 设置位面相机位置和方向
  const createFaceCamera = (size, center) => {
          const d = Math.sqrt(size.x * size.x + size.y * size.y)
          let camera = new THREE.OrthographicCamera(-d, d, d, -d, 1, 1000);
          // 计算相机位置
          // 定位相机到左上角
          camera.position.set(center.x - size.x, center.y + size.y, center.z)
          camera.lookAt(center);
          camera.up.set(0, 0, 1);
          return camera
  }
  

    return {
        scene,
        renderer,
        // pointLight,
        // camera,
        // controls,
        createRenderer,
        createLight,
        chooseLoader,
        createCarmera,
        getModelView,
        createControls,
        createGridHelper,
        addAxes,
        fitCameraToObject,
        clearScene,
        createCameraLight,
        LoadStep,
        LoadIges
    }

}