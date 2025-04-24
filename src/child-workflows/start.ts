import { Runtime, DefaultLogger } from "@temporalio/worker";
import { Connection, Client } from "@temporalio/client";
import { parentWorkflow } from "./parent_wf";

async function run() {
  const logger = new DefaultLogger("WARN", ({ level, message }) => {
    console.log(`Custom logger: ${level} — ${message}`);
  });
  Runtime.install({
    logger,
    // telemetryOptions: {
    //   metrics: {
    //     prometheus: { bindAddress: "0.0.0.0:9464" },
    //   },
    //   logging: { forward: { level: "DEBUG" } },
    // },
  });

  const names = ["Alice", "Bob"]; // ✅ Hardcoded names

  // 1. Start the worker
  const connection = await Connection.connect({
    address: "localhost:7233",
  });
  const client = new Client({ connection });

  const handle = await client.workflow.start(parentWorkflow, {
    args: [names],
    taskQueue: "demo",
    workflowId: `New WorkFlow ${Date.now()}`,
  });

  const result = await handle.result();
  console.log("✅ Workflow completed with result:", result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
