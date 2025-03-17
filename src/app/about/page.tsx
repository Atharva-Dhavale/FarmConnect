import Image from 'next/image';

export const metadata = {
  title: 'About Us - FarmConnect',
  description: 'Learn about FarmConnect and our mission to transform agricultural supply chains',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">About FarmConnect</h1>
      
      {/* Mission Section */}
      <section className="mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At FarmConnect, we're on a mission to transform the agricultural supply chain by creating 
            direct connections between farmers, retailers, and transporters. We believe in empowering 
            farmers with fair prices, providing retailers with quality produce, and optimizing logistics 
            through our network of transporters.
          </p>
          <p className="text-gray-700">
            By eliminating unnecessary intermediaries and leveraging technology, we aim to create a more 
            efficient, transparent, and sustainable agricultural ecosystem that benefits all stakeholders.
          </p>
        </div>
      </section>
      
      {/* Vision Section */}
      <section className="mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">Our Vision</h2>
          <p className="text-gray-700">
            We envision a future where:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
            <li>Farmers receive fair compensation for their hard work and quality produce</li>
            <li>Retailers can source fresh, high-quality agricultural products directly from the source</li>
            <li>Transporters can optimize their routes and reduce empty miles</li>
            <li>Consumers enjoy fresher produce at better prices</li>
            <li>The agricultural supply chain becomes more sustainable and environmentally friendly</li>
          </ul>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-4xl">
                  {i === 1 ? 'JD' : i === 2 ? 'AS' : 'RK'}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{i === 1 ? 'John Doe' : i === 2 ? 'Alice Smith' : 'Robert King'}</h3>
              <p className="text-primary-600 mb-2">{i === 1 ? 'Co-Founder & CEO' : i === 2 ? 'CTO' : 'Head of Operations'}</p>
              <p className="text-gray-600 text-sm">
                {i === 1 
                  ? 'With over 15 years of experience in agriculture and technology, John is passionate about creating sustainable solutions for farmers.' 
                  : i === 2 
                  ? 'Alice leads our technology team, bringing 10+ years of experience in building scalable platforms and data analytics.' 
                  : 'Robert oversees all operational aspects, ensuring smooth connections between farmers, retailers, and transporters.'}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Contact Section */}
      <section>
        <div className="bg-primary-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                We'd love to hear from you! Whether you have questions about our platform, 
                need assistance, or want to provide feedback, our team is here to help.
              </p>
              <div className="space-y-2">
                <p className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@farmconnect.com
                </p>
                <p className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 123-4567
                </p>
                <p className="flex items-start text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    123 Agriculture Road<br />
                    Farmington, FC 54321<br />
                    United States
                  </span>
                </p>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 