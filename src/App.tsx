import { FC, Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./core/components/Form";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "./index.css";

const App: FC = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/google-form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};
export default App;
