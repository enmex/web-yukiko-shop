import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import { Welcome } from "./pages/welcome/Welcome"
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';
import { errorState } from './app/states/Error.state';
import { ErrorPopup } from './components/ErrorPopup';
import { Profile } from './pages/profile/Profile';
import { CodeVerification } from './pages/Auth/CodeVerification';
import { HeaderComponent } from "./components/Header/Header";
import { FooterComponent } from "./components/Footer/Footer";
import { Main } from "./Styles";

const BaseRouter = () => {
  const [err, setErr] = useRecoilState(errorState);

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      <Main>
        <Routes>
          <Route path="*" element={<Navigate to="/"/>}/>
          <Route path="/" element={<Welcome/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profiles" element={<Profile />} />
          <Route path="/verification" element={<CodeVerification />} />
        </Routes>
      </ Main>
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