import { Connection, Client } from "@temporalio/client";
import { failureProneWorkflow } from "./workflows/failure";

async function run() {
  const connection = await Connection.connect();
  const client = new Client({ connection });

  const handle = await client.workflow.start(failureProneWorkflow, {
    taskQueue: "failure-test-queue",
    // workflowId: "failure-detection-workflow",
    workflowId: `failure-${Date.now()}`,
  });

  console.log(`Started workflow: ${handle.workflowId}`);

  try {
    const result = await handle.result();
    console.log("Workflow result:", result);
  } catch (err) {
    console.error("Workflow failed with error:", err);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
