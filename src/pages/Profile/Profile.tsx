import { useEffect } from "react";
import { useAppSelector } from "../../app/store";
import { useNavigate } from "react-router";
import Layout from "antd/es/layout/layout";
import { Navbar } from "../../components/Navbar/Navbar";


export const Profile = () => {
    const auth = useAppSelector(state => state.persistedReducer.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthorized) {
            navigate("/signIn");
        }
    })

    return (
        <>
        <Layout>
            <Navbar />
            <h1>Здесь будет профиль</h1>
        </Layout>
        </>
    );
}