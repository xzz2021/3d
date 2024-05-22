<template>
  <el-upload
    class=""
    ref="uploadForm"
    drag
    action=""
    :limit="1"
    :auto-upload="false"
    :on-change="onUpload"
    accept=".glb,.obj,.gltf,.fbx,.stl,.igs,.stp,.iges,.dae,.3ds"
  >
    <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
    <div class="el-upload__text">
      直接拖拽文件 或者
      <em>点击选择</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">文件类型: STL, OBJ, STEP, STP, IGES, IGS, DAE, 3DS, GLTF, GLB,</div>
    </template>
  </el-upload>
  <div style="margin: 20px">========</div>
  <div>预览:</div>
  <three-viewer :model-path="modelPath" :model-type="modelType" ref="threeRef"></three-viewer>
  <div style="margin: 20px">========</div>
  <div>测试demo:</div>
</template>
<script setup>
import ThreeViewer from "./ThreeViewer.vue"
import { useUpload } from "../hooks/useUpload"
import { UploadFilled } from "@element-plus/icons-vue"
const { onUpload, modelPath, modelType, threeRef, uploadForm } = useUpload()
</script>
<style></style>
