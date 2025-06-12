"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignInSchema } from "@/schemas/signinSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/states/hooks";
import { useSignInUserMutation } from "@/states/myApi";
import { setUser } from "@/states/userSlice";

// Infer the form type from the Zod schema
type SignInFormValues = z.infer<typeof SignInSchema>;

//
//

export default function SigninPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [loginUser] = useSignInUserMutation();
  const { replace: redirect } = useRouter();

  // zod implementation
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsSubmitting(true);

    try {
      const user = await loginUser(data).unwrap();
      dispatch(setUser(user));
      console.log(user);
      toast("Success", { description: "User logged in successfully" });
      redirect(`/`);

      //
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  //
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Magical Blog Platform
          </h1>
          <p className="mb-4">Sign in to start your blogging</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* identifier */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  "Signin"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div>
          <p className="text-center">
            Already a member?{" "}
            <Link href="/signin" className="text-blue-600 hover:text-blue-800">
              Signin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
