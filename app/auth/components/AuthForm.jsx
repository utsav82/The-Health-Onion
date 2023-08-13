'use client';
import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import Input from "app/components/ui/Input.jsx";
import AuthSocialButton from './AuthSocialButton';
import { Button } from "app/components/ui/button"
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation"


const AuthForm = () => {
  const searchParams = useSearchParams()
  const [variant, setVariant] = useState('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {

    setIsLoading(true);

    if (variant === 'REGISTER') {
      console.log("post")
      axios.post("/api/register", data)
        .then(() => {
          toast.success("Registered");
          signIn('credentials', data)
          router.push(searchParams?.get("from") || "/dashboard");
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials");
          }
          else if (callback?.ok) {
            toast.success("Logged in")
            router.push(searchParams?.get("from") || "/dashboard");

          }

        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }

  const socialAction = (action) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        else if (callback?.ok) {
          toast.success("Logged in")
        }

      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  return (
    <div className={`z-0 sm:mx-auto sm:w-full sm:max-w-md `}>
      <div
        className="
          bg-white
          text-card-foreground
          px-4
          py-8
          shadow
          rounded-lg
          sm:px-10
        "
      >
        <h1 className="text-center sm:py-5 font-bold text-2xl ">{variant}</h1>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} size="full" type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={FcGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN' ? 'New to The Health Onion?' : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
