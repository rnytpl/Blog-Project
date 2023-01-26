import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "@mui/system";

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: "1.5rem" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
