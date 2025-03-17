import Image from "next/image";

export default function StakeholderSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How FarmConnect Benefits You</h2>
        
        {/* Farmers */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/2">
            <div className="relative h-[300px] w-full">
              <Image 
                src="/images/farmers.jpg" 
                alt="Farmers using FarmConnect" 
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-bold text-primary-600">For Farmers</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Access a larger market with direct connections to retailers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Get better pricing through transparent marketplace</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Reduce transport costs with pooling options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Make data-driven farming decisions based on market insights</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Retailers */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
          <div className="md:w-1/2">
            <div className="relative h-[300px] w-full">
              <Image 
                src="/images/retailers.jpg" 
                alt="Retailers using FarmConnect" 
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-bold text-primary-600">For Retailers/Vendors</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Find competitive produce prices with quality assurance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Access efficient transport solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Optimize stocking decisions with demand insights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Get personalized recommendations based on regional trends</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Transporters */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="relative h-[300px] w-full">
              <Image 
                src="/images/transporters.jpg" 
                alt="Transporters using FarmConnect" 
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-bold text-primary-600">For Transporters</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Maximize vehicle utilization with multiple bookings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Plan fleet allocation effectively</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Reduce empty return trips</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">✓</span>
                <span>Access a steady stream of transport requests</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 