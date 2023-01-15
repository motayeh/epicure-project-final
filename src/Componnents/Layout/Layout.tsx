import { Outlet } from "react-router-dom";
import Foot from "./Footer/Footer";
import Head from "./Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
  return (
    <>
      <Head></Head>
      <Outlet />
      <Foot></Foot>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </>
  );
};
export default Layout;
