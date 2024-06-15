import { ref } from "vue"
import { useMitt } from "@/hooks/mitt"

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

  const onUpload = async file => {
    clearFiles()
    let resData
    if (file.size > M50) {
      resData = await multiPartUpload(file)
    } else {
      resData = await singleUpload(file)
    }
    modelName.value = file.name
    const filePath = URL.createObjectURL(file.raw)
    const modelFileInfo = {
      filePath,
      fileType: getFileType(file.name),
      resData,
    }
    // return
    // 触发模型加载
    emitEvent("openPreview", modelFileInfo)
  }

  const multiPartUpload = async file => {
    try {
      return await uploadSlice(file)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }
  const wait = async seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))
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

    const response = await fetch("http://192.168.1.152/cust_attachment/upload_chunk", {
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
        const resData = await response.json()
        console.log("🚀 ~ file: useUpload.js:75 ~ resData:", resData)
        const productTmplId = resData.product_tmpl_id
        const productId = resData.product_id
        const url = resData.file_url
        // Self.$('.upload-success').html("上传完成："+ JSON.stringify(resData));
        // Self.$('.add_to_cart').removeClass('btn-disabled')
        // console.log('文件上传成功响应:', resData);
        return { productTmplId, productId, url }
      }
    } else {
      alert("上传分片失败!")
    }
  }

  const singleUpload = file => {}

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
