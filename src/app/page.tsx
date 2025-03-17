import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { ArrowRight, Check, Star } from 'lucide-react';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with Gradient Background */}
      <section className="w-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-24 px-4 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-white"></div>
          <div className="absolute top-[20%] right-[5%] w-[25%] h-[25%] rounded-full bg-white"></div>
          <div className="absolute bottom-[5%] left-[30%] w-[20%] h-[20%] rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            Revolutionizing Agricultural Supply Chain
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Connecting <span className="text-accent-300">Farmers</span>, <span className="text-accent-300">Retailers</span>, and <span className="text-accent-300">Transporters</span>
          </h1>
          
          <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
            FarmConnect streamlines the agricultural supply chain by creating direct connections between farmers, retailers, and transporters.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link 
                href="/dashboard" 
                className="group bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link 
                  href="/register" 
                  className="group bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/login" 
                  className="group bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-primary-100">
            <div className="flex items-center">
              <Check className="h-5 w-5 mr-2" /> 10,000+ Farmers
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 mr-2" /> 5,000+ Retailers
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 mr-2" /> 2,000+ Transporters
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2" /> 4.8/5 Rating
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section with Cards */}
      <section className="w-full py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How FarmConnect Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects all stakeholders in the agricultural supply chain, creating efficiency and transparency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Farmers */}
            <div className="card-gradient group p-8 hover:translate-y-[-5px] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-md group-hover:shadow-lg transition-all">F</div>
              <h3 className="text-2xl font-semibold mb-4">For Farmers</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>List your produce directly</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Get fair prices without middlemen</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Find reliable transport</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Access market insights</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/register?role=farmer" className="text-primary-600 font-medium hover:text-primary-700 flex items-center">
                  Join as Farmer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* For Retailers */}
            <div className="card-gradient group p-8 hover:translate-y-[-5px] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-md group-hover:shadow-lg transition-all">R</div>
              <h3 className="text-2xl font-semibold mb-4">For Retailers</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-secondary-100 text-secondary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Source fresh produce directly</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-secondary-100 text-secondary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Post specific demands</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-secondary-100 text-secondary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Ensure quality and traceability</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-secondary-100 text-secondary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Optimize your inventory</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/register?role=retailer" className="text-secondary-600 font-medium hover:text-secondary-700 flex items-center">
                  Join as Retailer
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* For Transporters */}
            <div className="card-gradient group p-8 hover:translate-y-[-5px] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-md group-hover:shadow-lg transition-all">T</div>
              <h3 className="text-2xl font-semibold mb-4">For Transporters</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-accent-100 text-accent-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Find available loads</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-accent-100 text-accent-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Optimize routes and reduce empty miles</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-accent-100 text-accent-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Get paid fairly and promptly</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-accent-100 text-accent-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                  <span>Build a reliable client base</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/register?role=transporter" className="text-accent-600 font-medium hover:text-accent-700 flex items-center">
                  Join as Transporter
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="w-full py-24 px-4 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the farmers, retailers, and transporters who have transformed their businesses with FarmConnect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-soft-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl mr-4">R</div>
                <div>
                  <h4 className="font-semibold">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-500">Farmer, Punjab</p>
                </div>
              </div>
              <div className="flex text-accent-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700">
                "FarmConnect has transformed how I sell my produce. I now get 20% better prices and have direct relationships with retailers."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-soft-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-700 font-bold text-xl mr-4">P</div>
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Retailer, Mumbai</p>
                </div>
              </div>
              <div className="flex text-accent-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700">
                "As a retailer, I can now source directly from farmers. The quality is better, prices are competitive, and my customers love it."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-soft-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center text-accent-700 font-bold text-xl mr-4">A</div>
                <div>
                  <h4 className="font-semibold">Amit Patel</h4>
                  <p className="text-sm text-gray-500">Transporter, Gujarat</p>
                </div>
              </div>
              <div className="flex text-accent-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700">
                "My fleet utilization has increased by 30% since joining FarmConnect. I find loads for return journeys and have steady business."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section with Gradient */}
      <section className="w-full py-20 px-4 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-white"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[20%] h-[20%] rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your agricultural business?</h2>
          <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
            Join thousands of farmers, retailers, and transporters who are already benefiting from FarmConnect.
          </p>
          <Link 
            href="/register" 
            className="group bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            Join FarmConnect Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
