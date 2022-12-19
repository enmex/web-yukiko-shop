import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { Welcome } from "./pages/welcome/Welcome"
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';
import { Profile } from './pages/profile/Profile';
import { CodeVerification } from './pages/Auth/CodeVerification';
import { HeaderComponent } from "./components/Header/Header";
import { FooterComponent } from "./components/Footer/Footer";
import { userAuthorized, userState } from "./app/states/User.state";
import { Cart } from "./pages/Cart/Cart";
import { About } from "./pages/About/About";
import { Catalog } from "./pages/Catalog/Catalog";
import { ProductEdit } from "./pages/Product/ProductEdit";
import { ProductInfo } from "./pages/Product/Product";
import { CreateCategory } from "./pages/Category/Category";
import { MainWrapper } from "./Styles";

const BaseRouter = () => {
  const authorized = useRecoilValue(userAuthorized);
  const [user] = useRecoilState(userState);

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      <MainWrapper>
        <Routes>
          <Route path="*" element={<Navigate to="/"/>}/>
          <Route path="/" element={<Welcome/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={authorized ? <Profile /> : <SignIn />} />
          <Route path="/verification" element={user.profile ? <CodeVerification /> : <SignIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/*" element={<ProductInfo />} />
          <Route path="/products/edit" element={<ProductEdit />} />
          <Route path="/categories" element={<CreateCategory />} />
        </Routes>
      </MainWrapper>
      <FooterComponent />
    </BrowserRouter>
    </>
  );
}

const App = () => {
  return (
    <RecoilRoot>
      <BaseRouter />
    </RecoilRoot>
  );
};

export default App;