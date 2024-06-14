import { ref } from "vue"

const getFileType = fileName => {
  const fileExtension = fileName.split(".").pop().toLowerCase()
  return fileExtension
}
export const useUpload = () => {
  const uploadFormRef = ref(null)
  const forgeRef = ref(null)
  const modelName = ref("")
  const modelPath = ref("")
  const modelType = ref("")
  const threeRef = ref(null)
  const updateModel = model => {
    const { filePath, fileType } = model
    if (filePath && fileType) {
      threeRef.value && threeRef.value.loadModel(filePath, fileType)
    }
  }

  const onUpload = file => {
    clearFiles()
    modelName.value = file.name
    const filePath = URL.createObjectURL(file.raw)
    const model = {
      filePath,
      fileType: getFileType(file.name),
    }
    modelType.value = model.fileType
    modelPath.value = filePath
    // 触发模型加载
    updateModel(model)
  }
  const clearFiles = () => {
    uploadFormRef.value && uploadFormRef.value.clearFiles()
    // threeRef.value && threeRef.value.clearMesh()
  }
  return {
    onUpload,
    uploadFormRef,
    modelType,
    modelPath,
    threeRef,
    forgeRef,
  }
}
