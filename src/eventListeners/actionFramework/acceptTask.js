import { Actions } from "@twilio/flex-ui";

export function registerAcceptTaskExtensions() {
  Actions.addListener("beforeAcceptTask", async (payload) => {
    console.log("BEFORE ACCEPT TASK: ", payload);
    let { attributes, workerSid, channelType } = payload.task;

    // Set attributes from Amazon Lex Slots
    const slots = JSON.parse(
      attributes.Slots.replace(/=/g, '":"')
        .replace(/, /g, '","')
        .replace(/{/, '{"')
        .replace(/}/, '"}')
    );
    attributes = { ...attributes, ...slots };
    await payload.task.setAttributes(attributes);
  });

  Actions.addListener("afterAcceptTask", async (payload) => {
    console.log("AFTER ACCEPT TASK: ", payload);
    let { attributes, workerSid, channelType } = payload.task;
  });
}
