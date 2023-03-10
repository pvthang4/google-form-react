import { useAxiosLoading } from "../../helpers/axios-loader.helper";
import "../../../index.css";

const Loading = ({ children }: any) => {
  const [loading] = useAxiosLoading();

  return (
    <>
      {children}
      {loading ? (
        <>
          <div className="fui-loading-ripple">
            <div></div>
            <div></div>
          </div>
          <div className="loading-bg"></div>
        </>
      ) : null}
    </>
  );
};
export default Loading;
