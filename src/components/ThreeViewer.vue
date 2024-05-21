
<template>
  <div ref="container" style="border: 1px solid black; margin: 20px; width: 600px; height: 600px;"></div>
       <div>模型信息: </div>
        <div> 长: {{modelView.height}} </div>
        <div> 宽: {{modelView.width}} </div>
        <div> 高: {{modelView.depth}}   </div>
       <div> 包装盒体积: {{modelView.volume}} </div>
       <div> 真实体积: {{modelView.trueVolume}} </div>
       <div> 重量: {{modelView.weight}} </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { ElLoading } from 'element-plus'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useThree } from '../hooks/useThree.js';
import { useFace } from '../hooks/useFace.js';
// 接收props



const props = defineProps({
  modelPath: {
    type: String,
    default: '',
  },
  modelType: {
    type: String,
    default: '',
  },
});

  const container = ref(null);
    let camera, mesh, controls, pointLight, loader;
    let modelView = ref({})

  let { scene, renderer, createRenderer, createLight, chooseLoader, 
        createCarmera, getModelView, clearScene, LoadStep, LoadIges
     } = useThree();

   let { sceneOrtho, cameraOrtho} = useFace()

    const init = () => { 
      //  在此处初始化的模块 才能避免二次加载叠加
      createRenderer()  //  创建渲染器

      // 监听鼠标移动事件
// window.addEventListener('mousemove', onMouseMove, false);
    };
    const loadModel = async(path, type) => {
      const loading = ElLoading.service({ lock: true, text: '正在加载,请稍候...', background: 'rgba(0, 0, 0, 0.7)',  })
      clearScene()  //  加载新模型前先清除旧场景所有对象
      if(type == "stp"){
      // await LoadGeometry(path)
      const { geometry, material } = await LoadStep(path)
      // mesh = await LoadIges(path)
      mesh = new THREE.Mesh (geometry, material);
      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      mesh.position.sub(center);    // 将模型居中
      const size = box.getSize(new THREE.Vector3());
        // createGridHelper(size)   // 创建网格底座
        // addAxes(size) // 添加轴辅助器  原点坐标指示

      // 可视化包围盒
      const boxHelper = new THREE.BoxHelper(mesh, 0xffffff);
            scene.add(boxHelper);
            // const label = createLabel(dimensions, center2);
            // scene.add(label);

        createLight(size)   // 添加光源

        // 添加一个跟随相机的点光源
        pointLight = new THREE.DirectionalLight(0xffffff, 0.5, 100);
        pointLight.castShadow = true;
        scene.add(pointLight);
        camera = createCarmera(size,center)   // 创建相机
        scene.add(mesh);
      // 有了渲染器之后   一定要先创建相机   再创建控制器
      // createControls(camera,renderer.domElement)
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // 启用阻尼效果
        controls.dampingFactor = 0.25; // 阻尼系数
        controls.enableZoom = true; // 启用缩放
        // controls.enablePan = !true;
        controls.enableRotate = true; // 启用旋转
        // controls.screenSpacePanning = false; // 允许基于世界坐标的平移
        controls.target.set(0, 0, 0);
        controls.minDistance = 1;
        controls.maxDistance = 1000;
      // fitCameraToObject(camera, size,center, controls);
        container.value.appendChild(renderer.domElement);  // 挂载


        animate();

        setTimeout(() => { loading.close() }, 500)
           // 获取模型的三维信息
          modelView.value = getModelView(box)
      return
    }
    if(type == "iges" || type == "igs"){
      // await LoadGeometry(path)
      const {mergedGeometry, material} = await LoadIges(path)
      console.log("🚀 ~ file: StlViewer6.vue:131 ~ loadModel ~ geometry:", mergedGeometry)
      // mesh = await LoadIges(path)
      mesh = new THREE.Mesh (mergedGeometry, material);
      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      mesh.position.sub(center);    // 将模型居中
      const size = box.getSize(new THREE.Vector3());
        // createGridHelper(size)   // 创建网格底座
        // addAxes(size) // 添加轴辅助器  原点坐标指示

        createLight(size)   // 添加光源

        // 添加一个跟随相机的点光源
        pointLight = new THREE.DirectionalLight(0xffffff, 0.5, 100);
        pointLight.castShadow = true;
        scene.add(pointLight);
        camera = createCarmera(size,center)   // 创建相机
        scene.add(mesh);
      // 有了渲染器之后   一定要先创建相机   再创建控制器
      // createControls(camera,renderer.domElement)
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // 启用阻尼效果
        controls.dampingFactor = 0.25; // 阻尼系数
        controls.enableZoom = true; // 启用缩放
        // controls.enablePan = !true;
        controls.enableRotate = true; // 启用旋转
        // controls.screenSpacePanning = false; // 允许基于世界坐标的平移
        controls.target.set(0, 0, 0);
        controls.minDistance = 1;
        controls.maxDistance = 1000;
      // fitCameraToObject(camera, size,center, controls);
        container.value.appendChild(renderer.domElement);  // 挂载

        animate();

        setTimeout(() => { loading.close() }, 500)
           // 获取模型的三维信息
          modelView.value = getModelView(box)
      return
    }
      // 获取对应的模型加载器
       loader = chooseLoader(type);
      loader.load(
        path,
        model => {
            const material = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 1, metalness: 0.2});
            // const material = new THREE.MeshStandardMaterial({color: 0xc2c2c2, roughness: 1, metalness: 0});
            mesh = new THREE.Mesh(model, material);
          // 计算模型的中心点
          const box = new THREE.Box3().setFromObject(mesh);
          const center = box.getCenter(new THREE.Vector3());
          mesh.position.sub(center);    // 将模型居中
          const size = box.getSize(new THREE.Vector3());
          // createGridHelper(size)   // 创建网格底座

          // addAxes(size) // 添加轴辅助器  原点坐标指示

          createLight(size)   // 添加光源

          // 添加一个跟随相机的点光源 此处必须添加
          pointLight = new THREE.DirectionalLight(0xffffff, 0.5, 100);
          pointLight.castShadow = true;
          scene.add(pointLight);
          camera = createCarmera(size,center)   // 创建相机
          scene.add(mesh);
      
        // 有了渲染器之后   一定要先创建相机   再创建控制器
        // createControls(camera,renderer.domElement)
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // 启用阻尼效果
        controls.dampingFactor = 0.25; // 阻尼系数
        controls.enableZoom = true; // 启用缩放
        // controls.enablePan = !true;
        controls.enableRotate = true; // 启用旋转
        // controls.screenSpacePanning = false; // 允许基于世界坐标的平移
        controls.target.set(0, 0, 0);
        controls.minDistance = 1;
        controls.maxDistance = 1000;
      // fitCameraToObject(camera, size,center, controls);
        container.value.appendChild(renderer.domElement);  // 挂载
        animate();
        setTimeout(() => { loading.close() }, 500)
           // 获取模型的三维信息
          modelView.value = getModelView(box)
        },
        undefined,
        error => {
          console.error('模型加载出错, 出错原因:', error);
        }
      );
    };
    
    const animate = () => {
      requestAnimationFrame(animate);

  if (mesh && camera) {
    controls.update(); // 更新控制器
        // 使点光源跟随相机
    const vector = camera.position.clone();
    pointLight.position.set(vector.x,vector.y,vector.z); //点光源位置
    //主场景
			renderer.setViewport(0, 0, 600, 600);//主场景视区
			renderer.autoClear = false;//【scene.autoClear一定要关闭】
        renderer.render(scene, camera);
        // 旋转
        // viewBox.rotation.x += 0.01;
        // viewBox.rotation.y += 0.01;
        //次场景:1.复制主场景相机的位置、四元数，2.设置场景视区，3.渲染
			cameraOrtho.position.copy(camera.position);
			cameraOrtho.quaternion.copy(camera.quaternion);//Quaternion（表示对象局部旋转的四元数)
			cameraOrtho.lookAt(scene.position);
      cameraOrtho.up.set(0, 0, 1);  // 同步基准面
			renderer.setViewport(450, 450, 150, 150);//【设置次场景视区视口，(x, y,width,height)，用来显示viewCube】
			renderer.render(sceneOrtho, cameraOrtho);
      // TWEEN.update(1);
      }
    };

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      renderer.dispose();
    });
    defineExpose({ loadModel });

</script>

<style>
#container {
  width: 100%;
  height: 100%;
}
</style>
