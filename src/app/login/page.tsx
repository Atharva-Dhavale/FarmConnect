import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login - FarmConnect',
  description: 'Sign in to your FarmConnect account',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  // If already logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden py-12">
      {/* Background with gradient and shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 -z-10 opacity-90"></div>
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-white opacity-10"></div>
        <div className="absolute top-[60%] -left-[5%] w-[30%] h-[30%] rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[25%] h-[25%] rounded-full bg-white opacity-10"></div>
        <div className="absolute top-[30%] left-[25%] w-[15%] h-[15%] rounded-full bg-white opacity-10"></div>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 animate-fade-in">
        <div className="flex justify-center">
          <Link href="/">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-white to-primary-100 flex items-center justify-center text-primary-700 text-2xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105">
              FC
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-primary-100">
          Or{' '}
          <Link href="/register" className="font-medium text-white hover:text-primary-50 transition-colors underline">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 animate-slide-up">
        <div className="bg-white py-8 px-4 shadow-2xl rounded-xl sm:px-10 border border-white border-opacity-20 backdrop-filter backdrop-blur-sm">
          <LoginForm />
          
          <div className="mt-6">
            <div className="text-center text-sm">
              <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-primary-100">
          <p>
            By signing in, you agree to our{' '}
            <Link href="/terms" className="font-medium text-white hover:text-primary-50 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-medium text-white hover:text-primary-50 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 