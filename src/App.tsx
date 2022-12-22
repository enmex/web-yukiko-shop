import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Welcome } from "./pages/Welcome/Welcome"
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';
import { Profile } from './pages/Profile/Profile';
import { CodeVerification } from './pages/Auth/CodeVerification';
import { HeaderComponent } from "./components/Header/Header";
import { Cart } from "./pages/Cart/Cart";
import { About } from "./pages/About/About";
import { Catalog } from "./pages/Catalog/Catalog";
import { ProductEdit } from "./pages/Product/ProductEdit";
import { CreateCategory } from "./pages/Category/CreateCategory";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/store";
import { setToken } from "./app/store/auth/auth.slice";
import { Auth } from "./app/types/User";
import { Subcategories } from "./pages/Catalog/Subcategories";
import "./index.css";
import { NotFound } from "./pages/404";

const BaseRouter = () => {
  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/" element={<Welcome/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verification" element={<CodeVerification />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/*" element={<Subcategories />} />
          <Route path="/products/edit" element={<ProductEdit />} />
          <Route path="/categories/create" element={<CreateCategory />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}

const App = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  useEffect(() => {
    const cache = localStorage.getItem('token');
    if (cache) {
      if (!auth.isAuthorized) {
        const token = JSON.parse(cache) as Auth;
        dispatch(setToken(token));
      }
    }
  });

  return (
    <BaseRouter />
  );
};

export default App;