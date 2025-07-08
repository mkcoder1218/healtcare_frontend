import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white w-full">
      {/* Hero section */}
      <div className="relative bg-primary-50 w-full">
        <div className="w-full mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block">Take care of your</span>
                <span className="block text-primary-600">mental health</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Your mental health matters. Our professional therapists are here to help you 
                navigate life's challenges through online and in-person consultations.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="mt-5 sm:mt-8 sm:flex lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/services"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Book Consultation
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Mental health therapy session"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-12 bg-white w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Mental Healthcare Solutions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We offer a range of mental health services to support your well-being.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Service 1 */}
              <div className="relative">
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">In-Person Therapy</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Face-to-face sessions with experienced therapists in a comfortable, private setting.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="relative">
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Online Consultations</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Convenient virtual sessions from the comfort of your home or anywhere you choose.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="relative">
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Crisis Intervention</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Immediate support during mental health emergencies with specialized care.
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="relative">
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Group Therapy</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Therapeutic sessions in a supportive group environment led by professional facilitators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 