
import { Card } from "@/components/ui/card";

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Dr. Jane Smith",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300",
      description: "Jane founded YourRobotics with a vision to make robotics accessible to everyone. With a Ph.D. in Robotics from MIT and 15 years of industry experience, she leads our company's strategic direction.",
    },
    {
      name: "Michael Chen",
      position: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300",
      description: "Michael oversees our technical operations and product development. His background in electrical engineering and passion for open-source hardware drives our commitment to quality and innovation.",
    },
    {
      name: "Sarah Johnson",
      position: "Head of Product",
      image: "https://images.unsplash.com/photo-1563122870-6b0b48a0af09?auto=format&fit=crop&w=300&h=300",
      description: "Sarah leads our product team with an eye for detail and user experience. With experience at leading tech companies, she ensures our product lineup meets the needs of hobbyists and professionals alike.",
    },
  ];

  // Company milestones
  const milestones = [
    {
      year: 2015,
      title: "Company Founding",
      description: "YourRobotics was founded with a mission to provide high-quality robotics components to enthusiasts and professionals.",
    },
    {
      year: 2017,
      title: "Expanded Product Line",
      description: "Introduced over 500 new products across multiple categories, becoming one of the largest robotics suppliers in the region.",
    },
    {
      year: 2019,
      title: "Opened New Headquarters",
      description: "Moved to our current state-of-the-art facility with expanded warehouse and testing capabilities.",
    },
    {
      year: 2021,
      title: "International Expansion",
      description: "Began shipping products internationally, reaching customers in over 50 countries.",
    },
    {
      year: 2023,
      title: "AI Integration",
      description: "Launched our AI assistant to help customers find the right components for their projects and provide technical support.",
    },
  ];

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col space-y-12">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=400&q=80"
              alt="Robotics Technology"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-robo-900/90 to-robo-800/70"></div>
          </div>
          <div className="relative z-10 py-20 px-6 md:px-12 text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About YourRobotics</h1>
            <p className="text-xl text-robo-100">
              We're passionate about robotics and committed to providing the highest quality components for hobbyists, professionals, and educators.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-robo-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-robo-700">
              <p>
                YourRobotics was founded in 2015 by a group of robotics enthusiasts who were frustrated by the lack of quality components available for their projects. What started as a small operation in a garage has now grown into a leading supplier of robotics parts with customers worldwide.
              </p>
              <p>
                We believe that robotics technology should be accessible to everyone, from curious beginners to seasoned experts. That's why we carefully curate our product selection to offer reliable, well-documented components at reasonable prices.
              </p>
              <p>
                Our team is made up of engineers, educators, and robotics enthusiasts who are passionate about helping others bring their ideas to life. Whether you're building your first Arduino project or designing a complex autonomous system, we're here to support you.
              </p>
            </div>
          </div>
          <div className="order-first md:order-last">
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&h=500&q=80"
              alt="Company History"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-robo-50 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-robo-900 mb-6">Our Mission</h2>
            <p className="text-xl text-robo-700">
              "To empower creators, innovators, and learners by providing high-quality robotics components, exceptional technical support, and educational resources that inspire the next generation of technological advancement."
            </p>
          </div>
        </div>

        {/* Our Team */}
        <div>
          <h2 className="text-3xl font-bold text-robo-900 mb-6 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-robo-900">{member.name}</h3>
                  <p className="text-robo-600 mb-3">{member.position}</p>
                  <p className="text-robo-700">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Timeline */}
        <div>
          <h2 className="text-3xl font-bold text-robo-900 mb-6 text-center">Our Journey</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-robo-200 transform md:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-robo-600 border-4 border-white transform -translate-x-1/2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{milestone.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-12 md:w-1/2" : "md:pl-12 md:w-1/2"
                  }`}>
                    <Card className="p-6">
                      <h3 className="text-xl font-bold text-robo-900">{milestone.title}</h3>
                      <p className="text-robo-700 mt-2">{milestone.description}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-robo-900 mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-robo-50 rounded-xl p-8 text-center">
              <div className="text-robo-600 h-20 w-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-robo-900 mb-2">Innovation</h3>
              <p className="text-robo-700">
                We stay at the forefront of robotics technology, continuously seeking new and better solutions for our customers.
              </p>
            </div>
            <div className="bg-robo-50 rounded-xl p-8 text-center">
              <div className="text-robo-600 h-20 w-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-robo-900 mb-2">Quality</h3>
              <p className="text-robo-700">
                We rigorously test all products to ensure they meet our high standards before they reach our customers.
              </p>
            </div>
            <div className="bg-robo-50 rounded-xl p-8 text-center">
              <div className="text-robo-600 h-20 w-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-robo-900 mb-2">Education</h3>
              <p className="text-robo-700">
                We're committed to sharing knowledge and helping people learn about robotics, no matter their skill level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
