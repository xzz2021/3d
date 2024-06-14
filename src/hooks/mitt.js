import mitt from "mitt"
import { onUnmounted } from "vue"

const emitter = mitt()

export const useMitt = () => {
  const emitEvent = (name, ...args) => {
    emitter.emit(name, ...args)
  }

  const onEvent = (name, callback) => {
    emitter.on(name, callback)
  }

  // onUnmounted(() => emitter.off(name))
  return {
    emitEvent,
    onEvent,
  }
}
