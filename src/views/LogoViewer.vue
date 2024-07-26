
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
// import jsonText from './optimer_bold.typeface.json?raw'
import { randomGenerateGroupMesh, randomMove } from '../utils/randomGenerateGroupMesh.js'

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
		curveSegments: 6,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 2,
		bevelOffset: 0, 
		bevelSegments: 5
	})

    const material = new THREE.MeshNormalMaterial()
    // const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    // geometry.computeBoundingBox()   // 将模型居中二
    // //    此时得到的不是正中心  因为斜面bevelSize会影响集合 真实数据需要xyz轴都减去斜面-(geometry.boundingBox.max.x - bevelSize的值2）* 0.5
    // geometry.translate(-geometry.boundingBox.max.x * 0.5, -geometry.boundingBox.max.y * 0.5, -geometry.boundingBox.max.z * 0.5)

    geometry.center() // 将模型居中三
    // const box = new THREE.Box3().setFromObject(mesh) 
    // const center = box.getCenter(new THREE.Vector3())
    // mesh.position.sub(center) // 将模型居中一
    scene.add(mesh)

console.time("test need time")

const geometry1 = new THREE.CapsuleGeometry( 5, 5, 4, 8 );
const geometry2 = new THREE.ConeGeometry( 2, 6,32 );
const geometry3 = new THREE.OctahedronGeometry(6,0 );
const geometry4 = new THREE.TorusGeometry(4,2,16,100 );
const geometryArr = [geometry1,geometry2,geometry3,geometry4]
geometryArr.map(item => {
  const currentGroup = randomGenerateGroupMesh(item)
  scene.add( currentGroup );
})
    console.timeEnd("test need time")  //  13ms   3.8ms 
    logo3dRef.value && logo3dRef.value.appendChild(renderer.domElement)
    animate();
    })

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true // 启用阻尼效果  必须调用update()
    controls.dampingFactor = 0.02 // 阻尼系数  数值越小缓慢滑动效果越好
    controls.enableZoom = true // 启用缩放
    controls.target.set(0, 0, 0)
    controls.minDistance = 1
    controls.maxDistance = 1000
    // controls.autoRotateSpeed = 4
    // controls.autoRotate = true

    const animate = function () {
      controls.update()
      randomMove(scene)
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
  