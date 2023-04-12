import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState, useEffect } from "preact/hooks";
import config from "./config";
import {
  buildAPIQuery,
  renderBreakdownResult,
  renderAggregateResult,
} from "./utils";
import api from "./apiService";
import "react-chat-elements/dist/main.css";
import { MessageList, Input, Button } from "react-chat-elements";
import { TypingIndicator } from "@chatscope/chat-ui-kit-react";

const MY_BOT = () => {
  const [msgLoading, setMsgLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [filterStepAt, setFilterStepAt] = useState(1);
  const [selectedQueryParams, setSelectedQueryParams] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedFilterOrGroupBy, setSelectedFilterOrGroupBy] = useState(null);
  const [messageStack, setMessageStack] = useState([
    {
      position: "left",
      type: "text",
      title: "Flolio",
      text: "Hi Friend!",
    },
    {
      position: "left",
      type: "text",
      title: "Flolio",
      text: "What do you want to know?",
    },
  ]);
  console.log("initializing chat BOT");

  useEffect(() => {
    const chatList = new Array(
      ...document.querySelectorAll(".rce-container-mbox")
    );
    const lastElement = chatList[chatList.length - 1];
    lastElement.scrollIntoView();
  }, [messageStack]);

  async function getStatsFromSelectedQuery(duration, msgStack) {
    setMsgLoading(true)
    console.log({ selectedQueryParams, selectedFilterOrGroupBy, selectedEvent, duration, msgStack });
    let finalQueryBody = {
      ...selectedQueryParams.body,
      ...duration.body,
    };
    const apiURL = config.API_FILTER_PATH[selectedQueryParams.apiType];
    if (
      selectedQueryParams.id === "events_count" ||
      selectedQueryParams.id === "events_breakdown"
    ) {
      finalQueryBody["filters"] = "event:name==" + config.EVENTS[selectedEvent];
    } else if (selectedFilterOrGroupBy) {
      if (selectedFilterOrGroupBy !== 'All' && selectedQueryParams?.type == 'count')
        finalQueryBody["filters"] = "visit:source==" + selectedFilterOrGroupBy
      if (selectedQueryParams?.type == 'list')
        finalQueryBody["metrics"] = selectedFilterOrGroupBy
    }

    const res = await getAPIData(apiURL, finalQueryBody);
    if (!res.results) {
      showSuggestionMsg(null, msgStack);
      return;
    }
    const formateResp =
      selectedQueryParams.apiType === "breakdown"
        ? renderBreakdownResult(res)
        : renderAggregateResult(res);

    setMessageStack([
      ...msgStack,
      {
        position: "left",
        type: "text",
        title: "Flolio",
        text: formateResp,
      },
    ]);

    console.log({ formateResp });
    setMsgLoading(false)
  }

  async function getAPIData(urlPath, body) {
    const queryString = buildAPIQuery(body);
    const eventURL = `${config.BASE_URL}${urlPath}?${queryString.toString()}`;
    const res = await api.get(eventURL);
    return res;
  }

  function showSuggestionMsg(msg, msgStack) {
    setMessageStack([
      ...msgStack,
      {
        position: "left",
        type: "text",
        title: "Flolio",
        text: msg
          ? msg
          : `I'm sorry, I couldn't understand your query. Please try rephrasing your question or providing more context. Here are some examples of the kinds of questions you can ask me: \n - Give me visitor count from facebook in last week`,
      },
    ]);
  }

  return (
    <div className="messageContainer">
      <div className="chatHeader">
        <h3>Welcome to FLOLiO</h3>
      </div>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={[...messageStack]}
      />
      <div className="puller" />
      {msgLoading ? <TypingIndicator content="CLiO bot is typing" /> : ""}
      {!filterStepAt ? (
        <div className="messageWrapper">
          <Input
            className="messageInput"
            placeholder="Type here..."
            value={inputMessage}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                document.querySelector(".messageSend").click();
              }
            }}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
          />
          <Button
            // ref={sendBTNRef}
            className="messageSend"
            disabled={!inputMessage?.length}
            icon={{
              float: "left",
              size: 15,
              component: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="sendIcon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              ),
            }}
            onClick={() => {
              const val = inputMessage;
              const msgStack = [
                ...messageStack,
                {
                  position: "right",
                  type: "text",
                  text: val,
                },
              ];
              setFilterStepAt(1);
              document.querySelector(".messageInput").value = null;
              setMessageStack(msgStack);
              setInputMessage(null);
            }}
            title="Send"
          />
        </div>
      ) : null}
      {filterStepAt === 1 ? (
        <div className="selectorWrapper">
          {Object.values(config.QUERY_PARAMS).map((item) => {
            return (
              <Button
                text={item.title}
                onClick={() => {
                  setSelectedQueryParams(item);
                  if (
                    item?.id === "events_count" ||
                    item?.id === "events_breakdown"
                  ) {
                    setFilterStepAt(2);
                  } else {
                    setFilterStepAt(1.5);
                  }
                  const msgStack = [
                    ...messageStack,
                    {
                      position: "right",
                      type: "text",
                      text: item.title,
                    },
                    {
                      position: "left",
                      type: "text",
                      title: "Flolio",
                      text:
                        selectedQueryParams?.id === "events_count" ||
                          selectedQueryParams?.id === "events_breakdown"
                          ? `Please select filter event`
                          : `Please select parameter to ${item?.type == 'list' ? 'group results by' : 'filter results'}`,
                    },
                  ];
                  setMessageStack(msgStack);
                }}
                title={item.title}
              />
            );
          })}
        </div>
      ) : null}
      {filterStepAt === 1.5 ? (
        <div className="selectorWrapper">
          {(selectedQueryParams.type == 'list' ? config.LIST_GROUPBYS : config.COUNT_FILTERS).map((item) => {
            return (
              <Button
                style={{
                  textTransform: 'capitalize'
                }}
                text={item.replace('_',' ')}
                onClick={() => {
                  setSelectedFilterOrGroupBy(item);
                  const msgStack = [
                    ...messageStack,
                    {
                      position: "right",
                      type: "text",
                      text: item,
                    },
                    {
                      position: "left",
                      type: "text",
                      title: "Flolio",
                      text: `Please select duration`,
                    },
                  ];
                  setMessageStack(msgStack);
                  setFilterStepAt(3);
                }}
                title={item.title}
              />
            );
          })}
        </div>
      ) : null}
      {filterStepAt === 2 &&
        (selectedQueryParams?.id === "events_count" ||
          selectedQueryParams?.id === "events_breakdown") ? (
        <div className="selectorWrapper">
          {Object.keys(config.EVENTS).map((item) => {
            return (
              <Button
                text={config.EVENTS[item]}
                onClick={() => {
                  setFilterStepAt(3);
                  setSelectedEvent(item);
                  const msgStack = [
                    ...messageStack,
                    {
                      position: "right",
                      type: "text",
                      text: config.EVENTS[item],
                    },
                    {
                      position: "left",
                      type: "text",
                      title: "Flolio",
                      text: `Please select duration`,
                    },
                  ];
                  setMessageStack(msgStack);
                }}
                title={item.title}
              />
            );
          })}
        </div>
      ) : null}
      {filterStepAt === 3 ? (
        <div className="selectorWrapper">
          {config.DURATIONS.map((item) => {
            return (
              <Button
                text={item.title}
                onClick={() => {
                  // setSelectedDuration(item);
                  setFilterStepAt(4);
                  const msgStack = [
                    ...messageStack,
                    {
                      position: "right",
                      type: "text",
                      title: "Flolio",
                      text: `${item.title}`,
                    },
                  ];
                  setMessageStack(msgStack);
                  getStatsFromSelectedQuery(item, msgStack);
                }}
                title={item.title}
              />
            );
          })}
        </div>
      ) : null}
      {filterStepAt === 4 ? (
        <div className="selectorWrapper">
          <Button
            text="Restart?"
            onClick={() => {
              setFilterStepAt(1);
              const msgStack = [
                {
                  position: "left",
                  type: "text",
                  title: "Flolio",
                  text: "Hello friend!",
                },
                {
                  position: "left",
                  type: "text",
                  title: "Flolio",
                  text: "What do you want to know?",
                },
              ];
              setMessageStack(msgStack);
            }}
            title="Restart"
          />
        </div>
      ) : null}
    </div>
  );
};
export default MY_BOT;
