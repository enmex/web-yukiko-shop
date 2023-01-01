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
import { removeToken, setToken } from "./app/store/auth/auth.slice";
import { Forbidden } from "./pages/Forbidden";
import { useGetAccessTypeQuery, useRefreshTokenMutation } from "./app/store/auth/auth.api";

const BaseRouter = (
  props: {
    auth: AuthState
  }
) => {
  const {data: accessType} = useGetAccessTypeQuery();

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/" element={<Welcome auth={props.auth}/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={
            props.auth.isAuthorized ? 
            <Profile auth={props.auth} /> : <Navigate to="/signIn" />
          } />
          <Route path="/verification" element={<CodeVerification />} />
          <Route path="/cart" element={<Cart auth={props.auth} />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog auth={props.auth} />} />
          <Route path="/catalog/*" element={<Subcategories auth={props.auth} />} />
          <Route path="/products/edit" element={
            props.auth.isAuthorized && accessType === AccessType.ADMIN ?
            <ProductEdit auth={props.auth} /> : <Forbidden />
          } />
          <Route path="/products/*" element={<ProductInfo auth={props.auth} />} />
          <Route path="/categories/create" element={
            props.auth.isAuthorized && accessType === AccessType.ADMIN ?
            <CreateCategory auth={props.auth} /> : <Forbidden />
          } />
        </Routes>
    </BrowserRouter>
    </>
  );
}

const App = () => {
  const now = new Date().getTime();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.persistedReducer.auth as AuthState);
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    (async () => {
      if (now > auth.refresh.expiresAt) {
        dispatch(removeToken());
      }
      if (now > auth.access.expiresAt) {
        refreshToken().unwrap().then(token => {
          dispatch(setToken(token));
        });
      }
    })();
  }, [auth]);

  return (
    <BaseRouter auth={auth}/>
  );
};

export default App;
