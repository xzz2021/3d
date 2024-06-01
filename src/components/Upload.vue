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
    <div>
      <p>支持STP、STEP、STL、IGS、GLTF、OBJ等格式,一次最多上传5个文件,单个文件最多200M</p>
      <p>不同格式文件，材料费用计算可能有所偏差,建议优先选择STL</p>
    </div>
  </el-upload>

  <three-viewer :model-path="modelPath" :model-type="modelType" ref="threeRef"></three-viewer>
</template>
<script setup>
import ThreeViewer from "./ThreeViewer.vue"
import { useUpload } from "../hooks/useUpload"
import { UploadFilled } from "@element-plus/icons-vue"
const { onUpload, modelPath, modelType, threeRef, uploadForm } = useUpload()
</script>
<style scoped lang="scss">
// :deep(.el-overlay) {
//   z-index: 2008 !important;
// }
</style>
