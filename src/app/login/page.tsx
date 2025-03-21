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
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              </button>
            </div>
          </div>
          
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