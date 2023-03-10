import ReactDOM from "react-dom/client";
import MainApplicationWrapper from "./App";
import reportWebVitals from "./reportWebVitals";
import Loading from "./core/components/Common/Loading";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-tippy/dist/tippy.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Loading>
    <GoogleOAuthProvider clientId="609750087207-nh6oe38vcgbq7l3niio327cc0qbk4535.apps.googleusercontent.com">
      <MainApplicationWrapper />
    </GoogleOAuthProvider>
  </Loading>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
