import React from "react";
import { VERSION } from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";
import japanese from "./i18n/JP";

import CustomTaskListContainer from "./components/CustomTaskList/CustomTaskList.Container";
import reducers, { namespace } from "./states";
import { registerActionExtensions } from "./eventListeners/actionFramework";

const PLUGIN_NAME = "AmazonLexPlugin";

export default class AmazonLexPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    // Console i18n
    manager.strings = { ...manager.strings, ...japanese };

    // Action Framework
    registerActionExtensions();

    flex.TaskListItem.defaultProps.itemSize = "LargeSelected";
    manager.strings.TaskExtraInfo = `
      <h1>予約希望内容</h1>
      宿泊地：{{task.attributes.Location}}<br />
      チェックイン日：{{task.attributes.CheckInDate}}<br />
      泊数：{{task.attributes.Nights}}<br />
      ルームタイプ：{{task.attributes.RoomType}}<br />
    `;

    /*
    const options = { sortOrder: -1 };
    flex.AgentDesktopView
      .Panel1
      .Content
      .add(<CustomTaskListContainer key="AmazonLexPlugin-component" />, options);
      */
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
