import { useState } from "preact/hooks";
import "./app.css";
import MY_BOT from "./BOT";

export function App() {
  const [showBOT, setShowBOT] = useState(false);

  return (
    <>
      <div style={{ margin: "10px" }}>
        {showBOT ? (
          <div
            style={{
              position: "absolute",
              right: "50px",
              bottom: "150px",
            }}
          >
            <MY_BOT setShowBOT={setShowBOT} showBOT={showBOT} />
          </div>
        ) : null}
        <div class="action">
          <img
            height="100px"
            width="100px"
            onClick={() => setShowBOT(!showBOT)}
            style="cursor: pointer;"
            src={window.BOT_CONFIG.CHATBOT_ICON}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
