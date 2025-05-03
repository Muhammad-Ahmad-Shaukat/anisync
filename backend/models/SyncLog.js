import mongoose from "mongoose";

const syncLogSchema = new mongoose.Schema({
  source: { type: String, required: true, unique: true },
  lastSyncedAt: { type: Date, required: true }
});

const SyncLog = mongoose.model("SyncLog", syncLogSchema);
export default SyncLog;
