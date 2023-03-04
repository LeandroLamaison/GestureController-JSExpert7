onmessage = () => {
  console.log('Hello from worker')
  postMessage({ response: 'ok' })
}

