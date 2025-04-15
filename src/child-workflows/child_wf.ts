import {
  CancellationScope,
  defineQuery,
  defineSignal,
  setHandler,
  sleep,
} from "@temporalio/workflow";

export const addItemSignal = defineSignal<[item: string]>("addItem");
export const getCartItemsQuery = defineQuery<string[]>("getCartItems");

let cartItems: string[] = [];

export async function childWorkflow(name: string): Promise<string> {
  console.log(" ------------------- Workflow started ------------------- ");

  setHandler(addItemSignal, (item: string) => {
    cartItems.push(item);
    console.log(" =========== cartItems =========== ", cartItems);
  });

  setHandler(getCartItemsQuery, () => cartItems);

  await sleep(5000);
  //   await CancellationScope.withTimeout(3000, async () => {
  //   });
  return "success";
}
