import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';

// --- SHADCN UI COMPONENT STUBS ---
// These are basic stubs for demonstration. In a real project,
// you would install these components via the shadcn/ui CLI.

const Button = ({ children, className, variant, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
        link: "text-slate-900 underline-offset-4 hover:underline",
    };
    return (
        <button
            className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} h-10 px-4 py-2 w-full ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

const Card = ({ children, className, ...props }) => <div className={`rounded-xl border bg-white text-slate-900 shadow ${className}`} {...props}>{children}</div>;
const CardHeader = ({ children, className, ...props }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>{children}</div>;
const CardTitle = ({ children, className, ...props }) => <h3 className={`text-2xl font-semibold leading-none tracking-tight text-center ${className}`} {...props}>{children}</h3>;
const CardDescription = ({ children, className, ...props }) => <p className={`text-sm text-slate-500 text-center ${className}`} {...props}>{children}</p>;
const CardContent = ({ children, className, ...props }) => <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
const CardFooter = ({ children, className, ...props }) => <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>{children}</div>;

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
));

const Label = ({ children, className, ...props }) => <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>{children}</label>;


// --- LOGIN FORM COMPONENT ---

const LoginForm = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    alert(`Logging in with Email: ${email}`);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-login">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input id="email-login" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-login">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input id="password-login" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="pt-2">
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-slate-500 w-full">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignUp} className="font-semibold text-slate-900 hover:underline">
            Sign Up
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};


// --- SIGN UP FORM COMPONENT ---

const SignUpForm = ({ onSwitchToSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SignUp attempt with:', { name, email, password });
    alert(`Creating account for ${name} with Email: ${email}`);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Enter your details below to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name-signup">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input id="name-signup" type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-signup">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input id="email-signup" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-signup">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input id="password-signup" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="pt-2">
            <Button type="submit">Create Account</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-slate-500 w-full">
          Already have an account?{' '}
          <button onClick={onSwitchToSignIn} className="font-semibold text-slate-900 hover:underline">
            Sign In
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};


// --- MAIN APP COMPONENT TO MANAGE THE FLOW ---

export default function App() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      {isLoginView ? (
        <LoginForm onSwitchToSignUp={() => setIsLoginView(false)} />
      ) : (
        <SignUpForm onSwitchToSignIn={() => setIsLoginView(true)} />
      )}
    </div>
  );
}
