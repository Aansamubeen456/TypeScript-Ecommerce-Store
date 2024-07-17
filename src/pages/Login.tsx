import { FormInput, SubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { loginUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/hooks';
import { ReduxStore } from '@/store';
import { customFetch } from '@/utils';
import { AxiosResponse } from 'axios';
import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useNavigate,
} from 'react-router-dom';

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // console.log(data);

    try {
      const response: AxiosResponse = await customFetch.post(
        '/auth/local',
        data
      );
      // console.log(response.data);

      const username = response.data.user.username;
      const jwt = response.data.jwt;

      store.dispatch(loginUser({ username, jwt }));
      return redirect('/');
    } catch (error) {
      // console.log(error);
      toast({ description: 'Login Failed' });
      return null;
    }
  };

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginasGuestUser = async (): Promise<void> => {
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });

      const username = response.data.user.username;
      const jwt = response.data.jwt;

      dispatch(loginUser({ username, jwt }));
      navigate('/');
    } catch (error) {
      // console.log(error);
      toast({ description: 'Login failed' });
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FormInput
              type="email"
              name="identifier"
              label="email"
              // defaultValue="test@test.com"
            />
            <FormInput
              type="password"
              name="password"
              //  defaultValue="secret"
            />
            <SubmitBtn className="w-full mt-4" text="Login" />
            <Button
              type="button"
              variant="outline"
              className="w-full mt-4"
              onClick={loginasGuestUser}
            >
              Guest User
            </Button>
            <p className="mt-4 text-center">
              Not a member Yet?
              <Button type="button" variant="link" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default Login;
