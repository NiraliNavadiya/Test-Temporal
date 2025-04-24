import { childWorkflow } from "./child_wf";

// 🟡 Avoid destructuring — use `activities.getFormatedResponse`

import type { createActivities } from "./activities/create_activities";
import type * as activities from "./activities/";

import { executeChild, proxyActivities, sleep } from "@temporalio/workflow";

const { getFormatedResponse } = proxyActivities<typeof activities>({
  retry: {
    maximumAttempts: 2,
    nonRetryableErrorTypes: [],
  },

  // cancellationType.
  startToCloseTimeout: "5 seconds",
});

export async function parentWorkflow(names: string[]): Promise<string> {
  const response = await getFormatedResponse(names.join(" , ")); //activity

  await executeChild(childWorkflow, {
    args: ["Child Flow Args From Parent"],
    workflowId: `child-workflow-${Date.now()}`,
  });

  return response;
}

export { childWorkflow };

//child workflow
// for (const name of names) {
//   const childHandle = await startChild(childWorkflow, {
//     args: [name],
//     workflowId: `child-workflow-${Date.now()}`,
//   });

//   await childHandle.signal(addItemSignal, "👟 Shoes");
//   const signal = await childHandle.signal(addItemSignal, "🧢 Hat");
//   log.info("signal ---", { signal });

//   // const currentCart = await childHandle.query(getCartItemsQuery);
//   // console.log("Cart now contains:", currentCart);
//   const result = await childHandle.result();
//   log.info("result ---", { result });

//   results.push(result);
// }
