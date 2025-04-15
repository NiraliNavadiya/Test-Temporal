import { Worker } from "@temporalio/worker";
import { Connection, Client } from "@temporalio/client";
import { parentWorkflow } from "./child-workflows/parent_wf";

async function run() {
  const names = ["Alice", "Bob"]; // 👈 hardcoded

  const connection = await Connection.connect();
  const client = new Client({ connection });

  const worker = await Worker.create({
    workflowsPath: require.resolve("./child-workflows/parent_wf"), // 👈 just point to any workflow file to register all workflows
    taskQueue: "demo",
  });

  worker.run(); // runs in background

  const handle = await client.workflow.start(parentWorkflow, {
    args: [names],
    taskQueue: "demo",
    workflowId: `parent-${Date.now()}`,
  });

  const result = await handle.result();
  console.log("✅ Workflow completed with result:", result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
