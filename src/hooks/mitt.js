import mitt from "mitt"
import { onUnmounted } from "vue"

const emitter = mitt()

export const useMitt = name => {
  const emitEvent = (...args) => {
    emitter.emit(name, ...args)
  }

  const onEvent = callback => {
    emitter.on(name, callback)
  }

  onUnmounted(() => emitter.off(name))
  return {
    emitEvent,
    onEvent,
  }
}
