import { useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "antd/es/layout/layout";
import { Navbar } from "../../components/Navbar/Navbar";
import { AuthState } from "../../app/store/auth/auth.types";


export const Profile = (
    props: {
        auth: AuthState
    }
) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.auth.isAuthorized) {
            navigate("/signIn");
        }
    })

    return (
        <>
        <Layout>
            <Navbar auth={props.auth}/>
            <h1>Здесь будет профиль</h1>
        </Layout>
        </>
    );
}