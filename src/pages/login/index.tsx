import { AuthPage } from "../../components/pages/auth";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      rememberMe={false}
      forgotPasswordLink={false}
      formProps={{}}
    />
  );
};
