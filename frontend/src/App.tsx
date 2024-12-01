import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

export const App = () => {

  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton>
            <Button>
              Iniciar Sesion
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  )
}