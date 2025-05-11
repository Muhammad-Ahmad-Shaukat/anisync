import { parentPort, workerData } from 'worker_threads';
import { addAnimeById } from '../Scripts/addanime.js';

const run = async () => {
  try {
    const result = await addAnimeById(workerData.animeid);
    console.log(`🧵 Worker success: ${result} for animeid ${workerData.animeid}`);
    parentPort.postMessage({ success: true, animeid: workerData.animeid });
  } catch (error) {
    console.error(`❌ Worker failed for animeid ${workerData.animeid}:`, error.message);
    parentPort.postMessage({
      success: false,
      animeid: workerData.animeid,
      error: error.message
    });
  }
};

run();
