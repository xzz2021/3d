<template>
  <el-upload
    ref="uploadFormRef"
    drag
    action=""
    :limit="1"
    :auto-upload="false"
    :on-change="onUpload"
    accept=".glb,.obj,.gltf,.fbx,.stl,.igs,.stp,.step,.iges,.dae,.3ds,.3dm"
    :show-file-list="false"
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
  <three-viewer ></three-viewer>
</template>
<script setup>
import ThreeViewer from "@/components/modelViewer/ThreeViewer.vue"
import { useUpload } from "@/hooks/useUpload"
import { UploadFilled } from "@element-plus/icons-vue"
const { onUpload, uploadFormRef } = useUpload()
</script>
<style scoped lang="scss">
:deep(.el-upload-dragger) {
  background: #8080801c;
}
</style>
