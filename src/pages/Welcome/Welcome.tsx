import { Layout } from "antd";
import { Navbar } from "../../components/Navbar/Navbar";
import { AuthState } from "../../app/store/auth/auth.types";
  
export const Welcome = (
    props: {
        auth: AuthState
    }
) => {
    return (
        <>
        <Layout>
            <Navbar auth={props.auth}/>
        </Layout>
        </>
    );
};