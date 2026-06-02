import { Button } from "@/components/ui/button";
import { ChevronRight, Users, Clock, TrendingUp, Headphones, Shield, CheckCircle, Handshake, Target, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Yavoren Services - Workforce Solutions Website
 * Design: Modern Professional with Teal Accent
 * Color Palette: Teal (#0E8B8B), Dark Gray (#2D3748), Light Gray (#F7FAFC)
 * Typography: Poppins Bold for headings, Inter Regular for body
 */

interface ProjectMilestone {
  id: number;
  period: string;
  status: string;
  title: string;
  client: string;
  endClient: string;
  pax: number | string;
  image?: string;
  locations?: string[];
}

interface Service {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Industry {
  name: string;
  icon: React.ReactNode;
}

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const projectMilestones: ProjectMilestone[] = [
  {
    id: 1,
    period: "2022 - CURRENT",
    status: "01",
    title: "SKILLED & GENERAL LABOUR SUPPLY AND WORKFORCE MANAGEMENT",
    client: "Longterm Distribution Sdn. Bhd. - Kluang",
    endClient: "Kimberly Clark",
    pax: "30-50",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-warehouse-bt3k2U3pKZPiwf73tspwMY.webp",
  },
  {
    id: 2,
    period: "JUNE 2023 - DEC 2023",
    status: "02",
    title: "NETWORKING CABLING FOR MOBILE NETWORK SHARING",
    client: "Asianatics Sdn. Bhd.",
    endClient: "Q Sentral, KL Sentral",
    pax: 12,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-warehouse-bt3k2U3pKZPiwf73tspwMY.webp",
  },
  {
    id: 3,
    period: "MAY 2024 - DEC 2024",
    status: "03",
    title: "MAXIS NETWORK CABLING WORKS",
    client: "Asianatics Sdn. Bhd.",
    endClient: "Maxis Network",
    pax: 16,
    locations: ["Wisma RTM", "Wisma Genting", "Menara Great Eastern 1"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-warehouse-bt3k2U3pKZPiwf73tspwMY.webp",
  },
  {
    id: 4,
    period: "JULY 2024 - DEC 2024",
    status: "04",
    title: "NETWORKING CABLING FOR MOBILE NETWORK SHARING",
    client: "Asianatics Sdn. Bhd.",
    endClient: "Plaza Covillea",
    pax: 16,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-warehouse-bt3k2U3pKZPiwf73tspwMY.webp",
  },
  {
    id: 5,
    period: "MARCH 2025 - CURRENT",
    status: "05",
    title: "GENERAL WORKER & CLEANERS",
    client: "Dynaplas Polymer Sdn. Bhd.",
    endClient: "Dynaplas Polymer Sdn. Bhd.",
    pax: "5-10",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-warehouse-bt3k2U3pKZPiwf73tspwMY.webp",
  },
  {
    id: 6,
    period: "AUG 2025 - CURRENT",
    status: "06",
    title: "SKILLED & GENERAL LABOUR SUPPLY AND WORKFORCE MANAGEMENT (LOCAL)",
    client: "Longterm Distribution Sdn. Bhd. - PTT Bandar Hub",
    endClient: "Mixed Endusers",
    pax: 10,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-warehouse-bt3k2U3pKZPiwf73tspwMY.webp",
  },
  {
    id: 7,
    period: "AUG 2025 - CURRENT",
    status: "07",
    title: "SKILLED & GENERAL LABOUR SUPPLY AND WORKFORCE MANAGEMENT (LOCAL)",
    client: "Longterm Distribution Sdn. Bhd. - Pelabuhan Tanjung Pelepas",
    endClient: "Mixed Endusers",
    pax: 10,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-warehouse-bt3k2U3pKZPiwf73tspwMY.webp",
  },
  {
    id: 8,
    period: "AUG 2025 - APRIL 2026",
    status: "08",
    title: "LINE OPERATORS, QC, PACKAGING, ELECTRONIC TESTERS",
    client: "Nulalax Sdn. Bhd.",
    endClient: "Nulalax Sdn. Bhd.",
    pax: 50,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-warehouse-bt3k2U3pKZPiwf73tspwMY.webp",
  },
];

const services: Service[] = [
  {
    id: 1,
    number: "1",
    title: "TEMPORARY STAFFING",
    description: "Short-term workers for seasonal or project-based needs.",
    icon: <Clock className="w-8 h-8" />,
  },
  {
    id: 2,
    number: "2",
    title: "PERMANENT RECRUITMENT",
    description: "Finding full-time employees for client companies.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 3,
    number: "3",
    title: "SKILLED LABOUR SUPPLY",
    description: "Providing specialized professionals like electricians, plumbers or IT experts.",
    icon: <CheckCircle className="w-8 h-8" />,
  },
  {
    id: 4,
    number: "4",
    title: "UNSKILLED LABOUR SUPPLY",
    description: "Offering general worker for basic task.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 5,
    number: "5",
    title: "WORKFORCE MANAGEMENT",
    description: "Handling payroll, compliance, and employee benefits for the supplied workforce.",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    id: 6,
    number: "6",
    title: "ON-SITE SUPERVISION",
    description: "Managing the supplied workforce directly at the client's location.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 7,
    number: "7",
    title: "TRAINING SERVICES",
    description: "Preparing workers with necessary certifications or skills.",
    icon: <Lightbulb className="w-8 h-8" />,
  },
  {
    id: 8,
    number: "8",
    title: "LABOR ACCOMMODATION",
    description: "Offering accommodation and manage supply accommodation needs for client's general workers.",
    icon: <Users className="w-8 h-8" />,
  },
];

const industries: Industry[] = [
  { name: "Manufacturing", icon: <TrendingUp className="w-8 h-8" /> },
  { name: "Warehousing & Distribution", icon: <Users className="w-8 h-8" /> },
  { name: "Logistics & Supply Chain", icon: <TrendingUp className="w-8 h-8" /> },
  { name: "Telecommunications Infrastructure", icon: <Users className="w-8 h-8" /> },
  { name: "Electronics Manufacturing", icon: <TrendingUp className="w-8 h-8" /> },
  { name: "Commercial Buildings", icon: <Users className="w-8 h-8" /> },
];

const benefits: Benefit[] = [
  {
    title: "COST-EFFECTIVE",
    description: "Reduces recruitment and administrative costs.",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    title: "FLEXIBILITY",
    description: "Adjust workforce size based on demand.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "COMPLIANCE",
    description: "Ensures workers meet local legal and regulatory requirements.",
    icon: <Shield className="w-8 h-8" />,
  },
  {
    title: "TIME-SAVING",
    description: "Faster hiring process.",
    icon: <Clock className="w-8 h-8" />,
  },
  {
    title: "ACCESS TO EXPERTISE",
    description: "Companies can tap into a pool of pre-vetted, experienced workers.",
    icon: <CheckCircle className="w-8 h-8" />,
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0E8B8B] to-[#0D9B9B] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">Y</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#2D3748]">YAVOREN</span>
              <span className="text-xs text-[#0E8B8B] font-semibold">SERVICES</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-[#2D3748] hover:text-[#0E8B8B] transition-colors">About</a>
            <a href="#services" className="text-[#2D3748] hover:text-[#0E8B8B] transition-colors">Services</a>
            <a href="#projects" className="text-[#2D3748] hover:text-[#0E8B8B] transition-colors">Projects</a>
            <a href="#contact" className="text-[#2D3748] hover:text-[#0E8B8B] transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pb-20 bg-gradient-to-b from-[#F7FAFC] to-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-[#0E8B8B] text-white px-4 py-2 rounded-full text-sm font-semibold">
                WORKFORCE SOLUTIONS
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] leading-tight">
                Your Partner <span className="text-[#0E8B8B]">In Progress</span>
              </h1>
              <p className="text-lg text-[#718096] leading-relaxed">
                Delivering reliable, professional, and innovative workforce solutions that create value and build lasting partnerships.
              </p>
              <div className="flex gap-4 pt-4">
                <Button className="bg-[#0E8B8B] hover:bg-[#0D7B7B] text-white">
                  Get Started <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-[#0E8B8B] text-[#0E8B8B] hover:bg-[#F7FAFC]">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-96 md:h-full rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663607210190/WmNwsKT5p2CtqWqtQn4i52/hero-handshake-7GZuqGgeorYr6XLak9VfcV.webp"
                alt="Partnership"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748]">
                About <span className="text-[#0E8B8B]">Us</span>
              </h2>
              <p className="text-[#718096] leading-relaxed">
                Founded in 2022, Skill Birds Services began as a reputable labour supply company, committed to delivering reliable and efficient manpower solutions. Building on a strong foundation and growing client trust, the company evolved into Yavoren Services, expanding its capabilities beyond labour supply to include a wider range of service solutions.
              </p>
              <p className="text-[#718096] leading-relaxed">
                Today, the organization operates as YAVOREN Services Sdn Bhd, reflecting its growth, professionalism, and broader vision in the industry. YAVOREN Services specializes in end-to-end workforce solutions, including recruitment, training, and placement for both short-term and long-term assignments.
              </p>
              <p className="text-[#718096] leading-relaxed">
                With a focus on quality, consistency, and client satisfaction, YAVOREN Services continues to support businesses across various sectors by providing skilled manpower and dependable service support.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-[#0E8B8B] text-white p-8 rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Target className="w-8 h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">OUR VISION</h3>
                    <p className="text-sm leading-relaxed">
                      In line with our founding objectives, SKILL BIRDS pledges to offer our clients the best and competitive services and solution related to local / foreign workers in MALAYSIA. We aspire to be a Centre of excellence, pioneering and applying the best practices in the industry within the boundary of law.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#F7FAFC] text-[#2D3748] p-8 rounded-lg">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 flex-shrink-0 mt-1 text-[#0E8B8B]" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">OUR MISSION</h3>
                    <p className="text-sm leading-relaxed">
                      We strive to provide innovative & responsive solutions that exceed the expectations of our clients. We simplify the process for our clients to identify & resolve issues by expediting resolution time frame. We help clients to create value in their businesses through our value-generating services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-[#F7FAFC]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">
              Our <span className="text-[#0E8B8B]">Services</span>
            </h2>
            <p className="text-[#718096] max-w-2xl mx-auto">
              YAVOREN Services Sdn. Bhd. provides comprehensive workforce solutions designed to meet the diverse needs of businesses across various industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-[#0E8B8B]"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#0E8B8B] text-white p-3 rounded-lg flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2D3748] mb-2">
                      {service.number}. {service.title}
                    </h3>
                    <p className="text-[#718096] text-sm">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Timeline Section */}
      <section id="projects" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">
              Years of Experience & <span className="text-[#0E8B8B]">Project History</span>
            </h2>
            <p className="text-[#718096]">Proven Track Record. Trusted by Reputable Clients.</p>
          </div>

          <div className="space-y-8">
            {projectMilestones.map((project, index) => (
              <div key={project.id} className="flex gap-8">
                {/* Timeline Marker */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-16 h-16 bg-[#0E8B8B] text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {project.status}
                  </div>
                  {index < projectMilestones.length - 1 && (
                    <div className="w-1 h-24 bg-[#A0D8D8] mt-4"></div>
                  )}
                </div>

                {/* Project Card */}
                <div className="flex-1 bg-[#F7FAFC] p-8 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#0E8B8B] mb-2">{project.period}</div>
                      <h3 className="text-xl font-bold text-[#2D3748] mb-4">{project.title}</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-[#718096]">Client: </span>
                          <span className="text-[#2D3748] font-semibold">{project.client}</span>
                        </div>
                        <div>
                          <span className="text-[#718096]">End Client: </span>
                          <span className="text-[#2D3748] font-semibold">{project.endClient}</span>
                        </div>
                        {project.locations && (
                          <div>
                            <span className="text-[#718096]">Locations: </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {project.locations.map((loc, i) => (
                                <span key={i} className="text-[#2D3748] bg-white px-2 py-1 rounded text-xs">
                                  • {loc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="bg-[#0E8B8B] text-white w-fit px-4 py-2 rounded-full font-semibold">
                          {project.pax} PAX
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-[#E2E8F0]">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0E8B8B] mb-2">500+</div>
              <p className="text-[#718096]">Workers Successfully Deployed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0E8B8B] mb-2">8+</div>
              <p className="text-[#718096]">Active Projects</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0E8B8B] mb-2">6</div>
              <p className="text-[#718096]">Industries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-[#F7FAFC]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">
              Industries We <span className="text-[#0E8B8B]">Serve</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-[#0E8B8B] text-white p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-white bg-opacity-20 p-4 rounded-full">
                    {industry.icon}
                  </div>
                </div>
                <h3 className="font-bold text-lg">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4">
              Why <span className="text-[#0E8B8B]">Choose Us?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="bg-[#F7FAFC] p-8 rounded-lg text-center">
              <div className="bg-[#0E8B8B] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#2D3748] mb-3">TIMELY DEPLOYMENT</h3>
              <ul className="text-sm text-[#718096] space-y-2">
                <li>✓ On-Time Workforce Delivery</li>
                <li>✓ Emergency Support</li>
              </ul>
            </div>

            <div className="bg-[#F7FAFC] p-8 rounded-lg text-center">
              <div className="bg-[#0E8B8B] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#2D3748] mb-3">QUALITY OF WORKFORCE</h3>
              <ul className="text-sm text-[#718096] space-y-2">
                <li>✓ Skilled and Verified Workers</li>
                <li>✓ Background Checks</li>
                <li>✓ Replacement Guarantee</li>
              </ul>
            </div>

            <div className="bg-[#F7FAFC] p-8 rounded-lg text-center">
              <div className="bg-[#0E8B8B] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#2D3748] mb-3">WORK PERFORMANCE</h3>
              <ul className="text-sm text-[#718096] space-y-2">
                <li>✓ High Productivity</li>
                <li>✓ Work Ethics</li>
              </ul>
            </div>

            <div className="bg-[#F7FAFC] p-8 rounded-lg text-center">
              <div className="bg-[#0E8B8B] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#2D3748] mb-3">CONTINUOUS SUPPORT</h3>
              <ul className="text-sm text-[#718096] space-y-2">
                <li>✓ Ongoing Assistance</li>
                <li>✓ Regular Monitoring</li>
              </ul>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="bg-[#2D3748] text-white p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-8 text-center">BENEFITS FOR BUSINESSES</h3>
            <div className="grid md:grid-cols-5 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-[#0E8B8B] p-3 rounded-full">
                      {benefit.icon}
                    </div>
                  </div>
                  <h4 className="font-bold mb-2 text-sm">{benefit.title}</h4>
                  <p className="text-xs text-gray-300">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 md:py-24 bg-[#0E8B8B] text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment</h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <Shield className="w-8 h-8" />, title: "Safety & Compliance" },
                  { icon: <Handshake className="w-8 h-8" />, title: "Client Satisfaction" },
                  { icon: <CheckCircle className="w-8 h-8" />, title: "Quality Service" },
                  { icon: <Users className="w-8 h-8" />, title: "Reliable Workforce" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      {item.icon}
                    </div>
                    <span className="font-semibold text-sm">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white bg-opacity-10 p-8 rounded-lg border border-white border-opacity-20">
              <p className="text-lg leading-relaxed">
                "Delivering reliable, compliant and quality workforce solutions that drive your business forward."
              </p>
              <p className="mt-6 font-semibold">YAVOREN SERVICES SDN. BHD.</p>
              <p className="text-sm text-gray-200">YOUR PARTNER IN PROGRESS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D3748] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">YAVOREN SERVICES</h4>
              <p className="text-gray-400 text-sm">Your trusted partner for comprehensive workforce solutions.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-[#0E8B8B] transition-colors">Temporary Staffing</a></li>
                <li><a href="#" className="hover:text-[#0E8B8B] transition-colors">Permanent Recruitment</a></li>
                <li><a href="#" className="hover:text-[#0E8B8B] transition-colors">Training Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#about" className="hover:text-[#0E8B8B] transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-[#0E8B8B] transition-colors">Our Services</a></li>
                <li><a href="#projects" className="hover:text-[#0E8B8B] transition-colors">Projects</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">Email: info@yavoren.com</p>
              <p className="text-gray-400 text-sm">Phone: +60 XXX XXXX XXX</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 YAVOREN SERVICES SDN. BHD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
