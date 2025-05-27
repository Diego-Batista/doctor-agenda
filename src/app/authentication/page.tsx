import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

export default function AuthenticationPage() {
  return (
    <div className="flex h-screen w-screen items-center space-x-1">
      {/* <div className="h-full w-1/2 bg-amber-300">
        <Image
          src="/doutor.jpg"
          alt="Picture of the author"
          width={800}
          height={800}
          className="size-full object-cover"
        />
      </div> */}
      <div className="flex h-full w-1/2 items-center justify-center">
        <div className="space-y-8">
          <h1 className="text-primary text-center text-[45px] font-bold">
            DOCTOR-AGENDA
          </h1>
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <SignInForm />
            </TabsContent>
            <TabsContent value="register">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
