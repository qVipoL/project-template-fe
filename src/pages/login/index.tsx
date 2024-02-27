import { AuthPage } from '../../components/refine-overwrites/pages/auth';

export const Login = () => {
  return (
    <AuthPage
      title={false}
      type="login"
      rememberMe={false}
      forgotPasswordLink={false}
      formProps={{}}
    />
  );
};
