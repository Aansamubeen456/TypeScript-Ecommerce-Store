import { FormInput, SubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { customFetch } from '@/utils';
import { AxiosError } from 'axios';
import { ActionFunction, Form, Link, redirect } from 'react-router-dom';

export const action: ActionFunction = async ({
  request,
}): Promise<null | Response> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  try {
    await customFetch.post('/auth/local/register', data);

    toast({ description: 'Registered Successfully' });
    return redirect('/login');
  } catch (error) {
    // console.log(error);

    const errorMsg =
      error instanceof AxiosError
        ? error.response?.data.error.message
        : 'Registration Failed';
    toast({ description: errorMsg });
    return null;
  }
};

function Register() {
  return (
    <section className="h-screen  grid place-items-center">
      <Card>
        <CardHeader className="w-96 bg-muted">
          <CardTitle className="text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" action="/register">
            <FormInput
              type="text"
              //  defaultValue="test"
              name="username"
            />
            <FormInput
              type="email"
              // defaultValue="test@test.com"
              name="email"
            />
            <FormInput
              type="password"
              //  defaultValue="secret"
              name="password"
            />

            {/* <Button type="submit" variant="default" className="w-full mt-4">
              Submit
            </Button> */}

            <SubmitBtn className="w-full mt-4" text="Submit" />

            <p className="text-center mt-4">
              Already a member?
              <Button type="button" variant="link" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default Register;
