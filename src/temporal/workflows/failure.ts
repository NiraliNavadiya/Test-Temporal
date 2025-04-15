import { sleep } from "@temporalio/workflow";

export async function failureProneWorkflow(): Promise<string> {
  console.log("Workflow started");
  await sleep(5000);
  throw new Error("Simulated failure for testing");
}
