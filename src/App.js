import Container from "@mui/material/Container";
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components";
import {  Login, Registration, Home, FullHero, AddHero } from "./pages";
import { useEffect } from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
      dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heroes/:id" element={<FullHero />} />
          <Route path="/heroes/:id/edit" element={<AddHero />} />
          <Route path="/add-hero" element={<AddHero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;