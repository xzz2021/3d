import { ref } from "vue"
import { useMitt } from "@/hooks/mitt"

const getFileType = fileName => {
  const fileExtension = fileName.split(".").pop().toLowerCase()
  return fileExtension
}

const { emitEvent } = useMitt()
export const useUpload = () => {
  const uploadFormRef = ref(null)
  const forgeRef = ref(null)
  const modelName = ref("")
  const threeRef = ref(null)

  const onUpload = file => {
    clearFiles()
    modelName.value = file.name
    const filePath = URL.createObjectURL(file.raw)
    const modelFileInfo = {
      filePath,
      fileType: getFileType(file.name),
    }
    // 触发模型加载
    emitEvent("openPreview", modelFileInfo)
  }
  const clearFiles = () => {
    uploadFormRef.value && uploadFormRef.value.clearFiles()
    // threeRef.value && threeRef.value.clearMesh()
  }
  return {
    onUpload,
    uploadFormRef,
    threeRef,
    forgeRef,
  }
}
