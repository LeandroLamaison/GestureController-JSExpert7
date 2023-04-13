
export default async function buildWorker (ctx) {
  ctx.onmessage = ({ data }) => {
    if (data.iterations) {
      console.log('simulating blocking operation...');
      console.time('blocking-op');
      for (let counter = 0; counter < iterations; counter++) console.log('.');
      console.timeEnd('blocking-op');
    }

    ctx.postMessage({ response: 'ok' });
  };
}
