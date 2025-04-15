import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../../ui/glass-card/glass-card';
import styles from './services.module.scss';

// Sample services data - replace with your actual services
const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices.',
    icon: '🌐'
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces that enhance user experience.',
    icon: '🎨'
  },
  {
    id: 3,
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications for iOS and Android.',
    icon: '📱'
  },
  {
    id: 4,
    title: 'Backend Development',
    description: 'Robust server-side solutions with scalable architecture.',
    icon: '⚙️'
  },
  {
    id: 5,
    title: 'Database Design',
    description: 'Efficient database structures optimized for performance.',
    icon: '🗄️'
  },
  {
    id: 6,
    title: 'DevOps Services',
    description: 'Streamlined deployment and continuous integration pipelines.',
    icon: '🔄'
  }
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const carouselRef = useRef(null);
  const autoRotateInterval = useRef(null);

  // Calculate the total number of services
  const totalServices = services.length;

  // Function to handle manual rotation
  const rotateCarousel = (direction) => {
    setIsAutoRotating(false);
    if (autoRotateInterval.current) {
      clearInterval(autoRotateInterval.current);
    }
    
    if (direction === 'next') {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices);
    } else {
      setActiveIndex((prevIndex) => (prevIndex - 1 + totalServices) % totalServices);
    }
  };

  // Function to handle auto-rotation
  const startAutoRotation = () => {
    if (autoRotateInterval.current) {
      clearInterval(autoRotateInterval.current);
    }
    
    autoRotateInterval.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalServices);
    }, 5000); // Rotate every 5 seconds
  };

  // Function to handle mouse hover
  const handleMouseEnter = () => {
    setIsAutoRotating(false);
    if (autoRotateInterval.current) {
      clearInterval(autoRotateInterval.current);
    }
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setIsAutoRotating(true);
    startAutoRotation();
  };

  // Set up auto-rotation on component mount
  useEffect(() => {
    if (isAutoRotating) {
      startAutoRotation();
    }
    
    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
    };
  }, [isAutoRotating]);

  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.sectionTitle}>My Services</h2>
      
      <div 
        className={styles.carouselContainer}
        ref={carouselRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.carousel}>
          {services.map((service, index) => {
            // Calculate the position of each card in the 3D space
            const angle = (360 / totalServices) * index - (360 / totalServices) * activeIndex;
            const radius = 300; // Adjust this value to change the size of the circle
            
            // Calculate the z-index to ensure proper layering
            const zIndex = Math.round(Math.cos(angle * Math.PI / 180) * 100);
            
            // Calculate the scale based on the angle (cards in front are larger)
            const scale = 0.8 + (Math.cos(angle * Math.PI / 180) * 0.2);
            
            // Calculate the opacity based on the angle (cards in front are more opaque)
            const opacity = 0.6 + (Math.cos(angle * Math.PI / 180) * 0.4);
            
            return (
              <div
                key={service.id}
                className={styles.carouselItem}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity
                }}
              >
                <GlassCard className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                </GlassCard>
              </div>
            );
          })}
        </div>
        
        <div className={styles.controls}>
          <button 
            className={styles.controlButton} 
            onClick={() => rotateCarousel('prev')}
            aria-label="Previous service"
          >
            ←
          </button>
          <button 
            className={styles.controlButton} 
            onClick={() => rotateCarousel('next')}
            aria-label="Next service"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
