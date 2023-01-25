import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "@mui/system";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
