import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import { Welcome } from "./pages/welcome/Welcome"
import { SignIn } from './pages/signin/SignIn';
import { SignUp } from './pages/signup/SignUp';
import { errorState } from './app/states/Error.state';
import { ErrorPopup } from './components/ErrorPopup';
import { Profile } from './pages/profile/Profile';

const BaseRouter = () => {
  const [err, setErr] = useRecoilState(errorState);

  return (
    <>
    {err ? (
      <ErrorPopup err={err} setOpen={setErr} />
    ) : (
      <></>
    )}
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/"/>}/>
        <Route path="/" element={<Welcome/>} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profiles" element={<Profile />} />
      </Routes>
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