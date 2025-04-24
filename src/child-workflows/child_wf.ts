import {
  CancellationScope,
  defineQuery,
  defineSignal,
  proxyActivities,
  setHandler,
  sleep,
} from "@temporalio/workflow";
import type * as activities from "./activities/";
import { createActivities } from "./activities/";

// const { childActivity } = proxyActivities<typeof activities>({
//   retry: {
//     maximumAttempts: 2,
//     nonRetryableErrorTypes: [],
//   },

//   // cancellationType.
//   startToCloseTimeout: "5 seconds",
// });

const { greet } = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: "3 seconds",
  retry: {
    maximumAttempts: 2,
    nonRetryableErrorTypes: ["BadRequestException", "UnauthorizedException"],
  },
});

export const addItemSignal = defineSignal<[item: string]>("addItem");
export const getCartItemsQuery = defineQuery<string[]>("getCartItems");

export async function childWorkflow(name: string): Promise<string> {
  console.log(
    " -------------------Child Workflow started ------------------- "
  );
  const response = await greet(
    `  .................. Hello ${name} ..................  `
  ); //activity
  console.log("response", response);
  // setHandler(addItemSignal, (item: string) => {
  //   cartItems.push(item);
  //   console.log(" =========== cartItems =========== ", cartItems);
  // });

  // setHandler(getCartItemsQuery, () => cartItems);

  // await sleep(5000);
  //   await CancellationScope.withTimeout(3000, async () => {
  //   });
  return response;
}
