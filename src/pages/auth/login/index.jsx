import AppTemplate from '../../../components/app-template';
import Login from '../../../components/auth/signin';
const LoginPage = () => {
  return (
    <AppTemplate pageTitle={"Login"}>
      <Login />
    </AppTemplate>
  )
}

export default LoginPage;