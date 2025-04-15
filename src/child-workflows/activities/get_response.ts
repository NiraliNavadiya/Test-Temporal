import { setTimeout as sleep } from "timers/promises"; // ✅ This is allowed in activities

export async function getFormatedResponse(input: string) {
  return ` formated response : ${input}`;
  // const randomNum = Math.floor(Math.random() * 20) + 1;
  // await sleep(5000);
  //   throw Error("getFormatedResponse Error");
  // return getFormatedResponse2(` -- ${input} -- `);
  // return randomNum;
}

export function getFormatedResponse2(input: string) {
  return ` $ ${input} $ `;
}
