import { ref } from "vue"
import { useMitt } from "@/hooks/mitt"
import { baseUrl } from "@/utils/env"
import { ElMessage } from "element-plus"
import { useShopStore } from "@/pinia/shopTable.js"
const getFileType = fileName => {
  const fileExtension = fileName.split(".").pop().toLowerCase()
  return fileExtension
}

const M50 = 1024 * 1024 * 50
const currentIndex = ref(0)
const uploadId = Math.random().toString(36).substring(2, 15)

const { emitEvent } = useMitt()
export const useUpload = () => {
  const store = useShopStore()
  const { newItem, orderInfo } = storeToRefs(store)
  const uploadFormRef = ref(null)
  const forgeRef = ref(null)

  const onUpload = async file => {
    const fileType = getFileType(file.name)
    const accept = ".glb,.obj,.gltf,.fbx,.stl,.igs,.stp,.step,.iges,.dae,.3ds,.3dm"
    const arr = accept.replaceAll(".", "").split(",")
    if (!arr.includes(fileType)) return ElMessage.error("文件格式不合法,请重新选择!")
    clearFiles()
    if (file.size > M50 * 10) {
      return ElMessage.error("文件过大,请上传小于500MB的文件")
    } else {
      const res = await multiPartUpload(file)
      if (!res.order) return ElMessage.error("文件上传失败,请刷新后重试!")
      const { order_id, order_name, product } = res?.order
      newItem.value = JSON.parse(JSON.stringify(product))
      orderInfo.value = { order_id, order_name }
      console.log("🚀 ~ xzz: orderInfo.value", orderInfo.value)
      const { filename, drawing_filepath, modelFileInfo, grinding, qty } = newItem.value
      const { length, width, height } = modelFileInfo
      newItem.value.filePath = baseUrl + drawing_filepath
      newItem.value.fileType = getFileType(filename)
      newItem.value.size = `${length}x${width}x${height}`
      newItem.value.nuts = { total: [] }
      newItem.value.paint = { colorList: { c: [], u: [] } }
      // newItem.value.qty = qty || 1
      console.log("🚀 ~ xzz: newItem.value", newItem.value)
      newItem.value.grinding.checkDisabled = grinding?.name != "粗磨"
      // return
      // 触发模型加载
      emitEvent("openPreview", { drawing_filepath: newItem.value.filePath, fileType: newItem.value.fileType })
      emitEvent("openLoading")
      emitEvent("showLogo")
    }
  }

  const multiPartUpload = async file => {
    try {
      return await uploadSlice(file)
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
    const response = await fetch(`/api/cust_attachment/upload_chunk`, {
      // const response = await fetch("/cust_attachment/upload_chunk", {
      method: "POST",
      body: formData,
      credentials: "include",
      mode: "cors",
    })
    if (response.ok) {
      currentIndex.value += 1
      console.log("上传分片:" + currentIndex.value + "/" + totalSlices)
      // Self._calculateUploadPercent();
      if (currentIndex.value < totalSlices) {
        return await uploadSlice(file)
      } else {
        // alert('文件上传且合并成功!');
        const res = await response.json()
        console.log("🚀 ~ xzz: res", res)
        return res
      }
    } else {
      ElMessage.error("上传模型失败,请重新尝试!")
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
  }
  return {
    onUpload,
    uploadFormRef,
    forgeRef,
  }
}
