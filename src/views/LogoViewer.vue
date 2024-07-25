
<template>
    <div class="logo_container">
        <div id="logo3d" ref="logo3dRef"></div>
    </div>
</template>
  
<script setup>
import * as THREE from "three"
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import jsonText from './optimer_bold.typeface.json?raw'
import { onMounted } from "vue";

const jsonurl = new URL('./optimer_bold.typeface.json', import.meta.url).href
const  scene = new THREE.Scene()
// scene.background = new THREE.Color(0x8c8aff)

const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true,
      // preserveDrawingBuffer: true,
    })
    
    renderer.setSize(300, 100)
    renderer.shadowMap.enabled = true // 启用阴影
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setViewport(0, 0, 300, 100) //主场景视区
    renderer.autoClear = false //【scene.autoClear一定要关闭】

    const logo3dRef = ref(null)

    const aspect = 3 / 1
    const camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000) //  模拟人眼  以点看物体  眼 < 物体
    camera.position.set(0, 0, 120)
    camera.lookAt(0,0,0)

    const loader = new FontLoader()
    loader.load(jsonurl,  function (font) {
        const geometry = new TextGeometry("DAYU3D", {
        font: font,
		size: 80,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	})

    const material = new THREE.MeshNormalMaterial()
    // const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const mesh = new THREE.Mesh(geometry, material)
    const box = new THREE.Box3().setFromObject(mesh)
    const center = box.getCenter(new THREE.Vector3())
    mesh.position.sub(center) // 将模型居中
    scene.add(mesh)


    logo3dRef.value && logo3dRef.value.appendChild(renderer.domElement)

      animate();
    })



    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true // 启用阻尼效果  必须调用update()
    controls.dampingFactor = 0.25 // 阻尼系数
    controls.enableZoom = true // 启用缩放
    controls.target.set(0, 0, 0)
    controls.minDistance = 1
    controls.maxDistance = 1000
    // controls.autoRotateSpeed = 4
    // controls.autoRotate = true


    const animate = function () {
      controls.update()
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

onMounted(  () => {
    
})

</script>
  
  <style lang="scss" scoped>
.logo_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 630px);
    #logo3d{
        margin-top: auto;
        width: 300px;
        height: 100px;
    }
}
  </style>
  