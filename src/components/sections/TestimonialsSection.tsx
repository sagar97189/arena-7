import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TestimonialProps {
  quote: string;
  name: string;
  position: string;
  image: string;
  videoUrl?: string;
  rating: number;
  className?: string;
  isActive: boolean;
  onClick: () => void;
}

const Testimonial = ({ 
  quote, 
  name, 
  position, 
  image, 
  videoUrl, 
  rating, 
  className,
  isActive,
  onClick
}: TestimonialProps) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-lg cursor-pointer transition-all duration-300",
        isActive ? "bg-white shadow-lg scale-105" : "opacity-60 hover:opacity-80",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover" 
        />
        <div>
          <h4 className="font-bold text-lg text-arena-blue">{name}</h4>
          <p className="text-gray-600">{position}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
          />
        ))}
      </div>
      
      <p className="text-gray-700 mb-4 italic">
        <Quote size={20} className="inline text-arena-orange mr-1 mb-1" />
        {quote}
      </p>
      
      {videoUrl && isActive && (
        <div className="mt-4">
          <p className="text-arena-orange font-medium mb-2">Watch Video Testimonial</p>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              className="w-full h-56 rounded-lg"
              src={videoUrl}
              title={`${name} testimonial video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const testimonials = [
    {
      quote: "Arena Animation gave me the skills and confidence to pursue my dream career. The faculty support was outstanding and helped me land my first job at a leading animation studio.",
      name: "Rahul Sharma",
      position: "3D Animator at DreamWorks",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      rating: 5
    },
    {
      quote: "The practical approach to learning at Arena Animation helped me master industry-standard software quickly. The placement assistance was invaluable in kickstarting my career.",
      name: "Priya Patel",
      position: "VFX Artist at Red Chillies",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      rating: 5
    },
    {
      quote: "Joining Arena was the best decision of my life. The curriculum is well-structured and up-to-date with industry requirements, which gave me a competitive edge in the job market.",
      name: "Vikram Singh",
      position: "Game Developer at Ubisoft",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      rating: 4
    },
    {
      quote: "The mentorship I received at Arena Animation Faridabad was exceptional. They not only taught me technical skills but also how to approach creative challenges professionally.",
      name: "Neha Gupta",
      position: "Graphic Designer at Ogilvy",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      rating: 5
    }
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-sliding functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change testimonial every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying]);

  // Pause auto-sliding on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section id="testimonials" className="section-container">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="section-subtitle">STUDENT TESTIMONIALS</h5>
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-description">
            Hear directly from our alumni about their learning experience and how Arena Animation helped shape their careers.
          </p>
        </div>
        
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-3xl">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Testimonial
                  {...testimonials[activeIndex]}
                  isActive={true}
                  onClick={() => {}}
                />
              </motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {testimonials.filter((_, i) => i !== activeIndex).map((testimonial, index) => (
              <Testimonial
                key={index}
                {...testimonial}
                isActive={false}
                onClick={() => setActiveIndex(testimonials.indexOf(testimonial))}
              />
            ))}
          </div>
          
          <div className="absolute top-1/3 left-0 -translate-x-1/2 hidden md:block">
            <button 
              onClick={() => {
                prevTestimonial();
                setIsAutoPlaying(false);
              }}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-arena-orange hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/3 right-0 translate-x-1/2 hidden md:block">
            <button 
              onClick={() => {
                nextTestimonial();
                setIsAutoPlaying(false);
              }}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-arena-orange hover:text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="flex justify-center space-x-4 mt-8 md:hidden">
            <button 
              onClick={() => {
                prevTestimonial();
                setIsAutoPlaying(false);
              }}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-arena-orange hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => {
                nextTestimonial();
                setIsAutoPlaying(false);
              }}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-arena-orange hover:text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
