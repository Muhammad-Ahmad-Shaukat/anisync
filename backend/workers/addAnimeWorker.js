import { parentPort, workerData } from 'worker_threads';
import { addAnimeLogic } from '../Scripts/addanime'; 
const run = async () => {
  try {
    const { animeid } = workerData; 
    await addAnimeLogic(animeid); 
    parentPort.postMessage({ status: 'done' }); 
  } catch (error) {
    console.error("Error processing worker:", error);
    parentPort.postMessage({ status: 'error', message: error.message });
  }
};

run();
