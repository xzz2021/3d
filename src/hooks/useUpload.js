import { ref } from "vue"
import { useMitt } from "@/hooks/mitt"
import { baseUrl } from "@/utils/env"
const getFileType = fileName => {
  const fileExtension = fileName.split(".").pop().toLowerCase()
  return fileExtension
}

const M50 = 1024 * 1024 * 50
const currentIndex = ref(0)
const uploadId = Math.random().toString(36).substring(2, 15)

const { emitEvent } = useMitt()
export const useUpload = () => {
  const uploadFormRef = ref(null)
  const forgeRef = ref(null)
  const modelName = ref("")
  const threeRef = ref(null)

  const resData = ref({})
  const onUpload = async file => {
    clearFiles()
    if (file.size > M50 * 10) {
      return alert("文件过大,请上传小于500MB的文件")
    } else {
      await multiPartUpload(file)
    }
    if (!resData.value) return
    modelName.value = file.name
    const filePath = URL.createObjectURL(file.raw)
    const modelFileInfo = {
      filePath,
      fileType: getFileType(file.name),
      resData: resData.value,
    }
    // return
    // 触发模型加载
    emitEvent("openPreview", modelFileInfo)
    emitEvent("openLoading")
  }

  const multiPartUpload = async file => {
    try {
      await uploadSlice(file)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }
  const uploadSlice = async file => {
    const sliceSize = M50 / 50 // 每片大小1MB
    const start = currentIndex.value * sliceSize
    const end = Math.min(start + sliceSize, file.size)
    const totalSlices = Math.ceil(file.size / sliceSize) // 总片数
    const blob = file.raw.slice(start, end)
    const formData = new FormData()
    formData.append("uploadId", uploadId)
    formData.append("file", blob)
    formData.append("chunkNumber", currentIndex.value)
    formData.append("totalChunks", totalSlices)
    formData.append("filename", file.name)
    const response = await fetch(`${baseUrl}/cust_attachment/upload_chunk`, {
      // const response = await fetch("/cust_attachment/upload_chunk", {
      method: "POST",
      body: formData,
    })
    if (response.ok) {
      currentIndex.value += 1
      console.log("上传分片:" + currentIndex.value + "/" + totalSlices)
      // Self._calculateUploadPercent();
      if (currentIndex.value < totalSlices) {
        await uploadSlice(file)
      } else {
        // alert('文件上传且合并成功!');
        const res = await response.json()
        const { product_tmpl_id, product_id, file_url } = res
        resData.value = { product_tmpl_id, product_id, file_url }
        return res
      }
    } else {
      alert("上传模型失败,请重新尝试!")
      throw new Error("上传分片数据失败")
    }
  }

  // const singleUpload = async file => {
  //   const response = await fetch("/cust_attachment/upload_chunk", {
  //     method: "POST",
  //     body: file,
  //   })
  // }

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
