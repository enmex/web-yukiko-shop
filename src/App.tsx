import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Welcome } from "./pages/Welcome/Welcome"
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';
import { Profile } from './pages/Profile/Profile';
import { CodeVerification } from './pages/Auth/CodeVerification';
import { Cart } from "./pages/Cart/Cart";
import { About } from "./pages/About/About";
import { Catalog } from "./pages/Catalog/Catalog";
import { ProductEdit } from "./pages/Product/ProductEdit";
import { CreateCategory } from "./pages/Category/CreateCategory";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/store";
import { Subcategories } from "./pages/Catalog/Subcategories";
import "./index.css";
import { NotFound } from "./pages/404";
import { ProductInfo } from "./pages/Product/ProductInfo";
import { AccessType, AuthState } from "./app/store/auth/auth.types";
import { removeToken } from "./app/store/auth/auth.slice";
import { Forbidden } from "./pages/Forbidden";
import { useGetAccessTypeQuery } from "./app/store/auth/auth.api";

const BaseRouter = () => {
  const auth = useAppSelector(state => state.persistedReducer.auth);
  const {data: accessType} = useGetAccessTypeQuery();

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/" element={<Welcome/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={
            auth.isAuthorized ? 
            <Profile /> : <Navigate to="/signIn" />
          } />
          <Route path="/verification" element={<CodeVerification />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/*" element={<Subcategories />} />
          <Route path="/products/edit" element={
            auth.isAuthorized && accessType === AccessType.ADMIN ?
            <ProductEdit /> : <Forbidden />
          } />
          <Route path="/products/*" element={<ProductInfo />} />
          <Route path="/categories/create" element={
            auth.isAuthorized && accessType === AccessType.ADMIN ?
            <CreateCategory /> : <Forbidden />
          } />
        </Routes>
    </BrowserRouter>
    </>
  );
}

const App = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.persistedReducer.auth as AuthState);

  useEffect(() => {
    if (new Date().getTime() > auth.expiresAt) {
      dispatch(removeToken());
    }
  });

  return (
    <BaseRouter />
  );
};

export default App;
