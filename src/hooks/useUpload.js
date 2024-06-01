import { ref } from "vue"

const getFileType = fileName => {
  const fileExtension = fileName.split(".").pop().toLowerCase()
  return fileExtension
}
export const useUpload = () => {
  const uploadForm = ref(null)
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
    // forgeRef.value.init(file)
    // return
    const model = {
      filePath,
      fileType: getFileType(file.name),
    }
    modelType.value = model.fileType
    modelPath.value = filePath
    updateModel(model)
  }
  const clearFiles = () => {
    uploadForm.value && uploadForm.value.clearFiles()
    // threeRef.value && threeRef.value.clearMesh()
  }
  return {
    onUpload,
    uploadForm,
    modelType,
    modelPath,
    threeRef,
    forgeRef,
  }
}
