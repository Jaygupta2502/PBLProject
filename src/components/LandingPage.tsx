import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Calendar, Users, Clock, MapPin, Users2, CheckCircle, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LandingPage() {
  const navigate = useNavigate();
  
  const upcomingEvents = [
    {
      id: 1,
      title: "Career Fair 2025",
      club: "Career Development Club",
      date: "April 15, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Student Center",
      attendees: 1000,
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=2069",
      status: "Approved"
    },
    {
      id: 2,
      title: "Science Exhibition",
      club: "Science Club",
      date: "April 20, 2025",
      time: "11:00 AM - 5:00 PM",
      location: "Science Complex",
      attendees: 300,
      logo: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=2068",
      status: "Approved"
    },
    {
      id: 3,
      title: "Annual Tech Symposium",
      club: "Tech Club",
      date: "March 25, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      attendees: 250,
      logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
      status: "Approved"
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center text-white px-4">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Campus Event Scheduling
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Organize and manage your campus events with ease
          </motion.p>
          <motion.button 
            className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule an Event
          </motion.button>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Calendar className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">Simple and intuitive event scheduling interface</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Work together with your team efficiently</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">Get instant notifications about event changes</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <MapPin className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Venue Management</h3>
              <p className="text-gray-600">Easily manage and book venues</p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* About Section with Parallax */}
      <section
        id="about"
        className="relative py-20 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.h2 
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg leading-relaxed mb-6">
                We're dedicated to making campus event management seamless and efficient. Our platform helps universities and colleges streamline their event scheduling process.
              </p>
              <p className="text-lg leading-relaxed">
                With years of experience in educational institution management, we understand the unique challenges of campus event coordination.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl font-bold mb-2">500+</h3>
                <p>Events Managed</p>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h3 className="text-3xl font-bold mb-2">50+</h3>
                <p>Partner Universities</p>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-2">10k+</h3>
                <p>Happy Users</p>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h3 className="text-3xl font-bold mb-2">24/7</h3>
                <p>Support</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Approved Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Join us at these exciting campus events</p>
          </div>

          <Slider {...sliderSettings} className="approved-events-slider">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="px-4"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  <div className="h-48 relative bg-gray-100 flex items-center justify-center p-6">
                    <img
                      src={event.logo}
                      alt={event.title}
                      className="h-32 w-32 object-contain"
                    />
                    <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      {event.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.club}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users2 className="h-4 w-4 mr-2 text-indigo-600" />
                        <span>{event.attendees} Expected Attendees</span>
                      </div>
                    </div>
                    <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
                      View Event Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </section>

      

      <Footer />
    </div>
  );
}

export default LandingPage;