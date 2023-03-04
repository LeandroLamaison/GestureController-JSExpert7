export function doesSupportWorkerType() {
  let doesSupport = false

  const tester = {
    get type() {
      doesSupport = true
    }
  }

  try {
    new Worker('blob://', tester).terminate()
  } finally {
    return doesSupport
  }
}
