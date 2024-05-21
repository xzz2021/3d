<template>
  <el-upload
    class=""
    ref="uploadForm"
    drag
    action=""
    :limit="1"
    :auto-upload="false"
    :on-change="onUpload"
    accept=".glb,.obj,.gltf,.fbx,.stl,.igs,.stp,.x_t,.iges,.igs"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      直接拖拽文件 或者<em>点击选择</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        文件类型: STL, OBJ, STEP, STP, IGES, IGS, SLDPRT, 3DM, SAT, X_T
      </div>
    </template>
  </el-upload>
  <div style="margin: 20px;">========</div>
  <div> 预览:</div>
  <three-viewer :model-path="modelPath" :model-type="modelType" ref="threeRef" ></three-viewer>
  <div style="margin: 20px;">========</div>
  <div>测试demo:</div>
</template>
<script setup>
import ThreeViewer from './ThreeViewer.vue';
import { useUpload } from '../hooks/useUpload';

const  { onUpload, modelPath, modelType, threeRef, uploadForm, forgeRef } = useUpload()

</script>
<style>
</style>