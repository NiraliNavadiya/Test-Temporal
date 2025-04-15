import { Worker } from "@temporalio/worker";
// 2025-04-14T16:30:54.040Z
import * as activities from "./activities";

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve("./parent_wf"), // <-- points to this file
    taskQueue: "demo",
    activities,
  });

  worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
