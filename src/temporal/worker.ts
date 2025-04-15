import { Worker } from "@temporalio/worker";
import path from "path";

async function run() {
  const worker = await Worker.create({
    workflowsPath: path.join(__dirname, "./workflows/failure.ts"), // 👈 points to folder, NOT a file
   activities : ,
    taskQueue: "failure-test-queue",
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
