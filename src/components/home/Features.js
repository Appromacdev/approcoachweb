import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChartLine, FaGamepad, FaRobot, FaTrophy } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const FeaturesSection = styled.section`
  padding: 120px 0;
  background-color: var(--light);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/assets/images/pattern-light.png');
    opacity: 0.07;
    z-index: 0;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  padding-bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.8rem;
  color: var(--dark);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  color: var(--text);
  font-size: 1.2rem;
  line-height: 1.7;
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    z-index: 2;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  &:hover .feature-icon {
    animation: ${pulse} 1.5s ease infinite;
    background: linear-gradient(135deg, var(--primary), var(--accent));
  }
  
  &.fade-in {
    opacity: 0;
    animation: ${fadeIn} 0.8s forwards;
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    &:nth-child(4) {
      animation-delay: 0.6s;
    }
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.8rem;
  font-size: 2rem;
  position: relative;
  transition: all 0.5s ease;
  box-shadow: 0 10px 20px rgba(10, 132, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    border: 2px dashed rgba(10, 132, 255, 0.3);
    animation: spin 20s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.7rem;
  color: var(--dark);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: var(--accent);
    transition: width 0.3s;
    margin: 5px auto 0;
  }
  
  ${FeatureCard}:hover & {
    &::after {
      width: 50%;
    }
  }
`;

const FeatureDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.7;
`;

const BackgroundShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(10, 132, 255, 0.03), rgba(201, 155, 60, 0.02));
  
  &.shape-1 {
    width: 500px;
    height: 500px;
    top: -250px;
    left: -100px;
  }
  
  &.shape-2 {
    width: 300px;
    height: 300px;
    bottom: -150px;
    right: -50px;
  }
`;

const Features = () => {
    const featuresRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const featureCards = entry.target.querySelectorAll('.feature-card');
                    featureCards.forEach(card => {
                        card.classList.add('fade-in');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        if (featuresRef.current) {
            observer.observe(featuresRef.current);
        }

        return () => {
            if (featuresRef.current) {
                observer.unobserve(featuresRef.current);
            }
        };
    }, []);

    const features = [
        {
            icon: <FaChartLine />,
            title: 'Performance Analytics',
            description: 'Detailed analysis of your game stats, identifying strengths and areas for improvement with actionable insights.'
        },
        {
            icon: <FaGamepad />,
            title: 'Mini-Games',
            description: 'Fun, interactive mini-games designed to improve specific skills like last hitting, map awareness, and positioning.'
        },
        {
            icon: <FaRobot />,
            title: 'AI Coaching',
            description: 'Personalized advice and recommendations based on your unique playstyle and performance metrics.'
        },
        {
            icon: <FaTrophy />,
            title: 'Rank Progression',
            description: 'Track your improvement over time with detailed progress metrics and achievement badges to mark your growth.'
        }
    ];

    return (
        <FeaturesSection id="features" ref={featuresRef}>
            <BackgroundShape className="shape-1" />
            <BackgroundShape className="shape-2" />

            <SectionTitle>Key Features</SectionTitle>
            <SectionSubtitle>
                Designed to help you improve every aspect of your League of Legends gameplay
                and reach your ranked goals faster
            </SectionSubtitle>

            <FeaturesContainer>
                {features.map((feature, index) => (
                    <FeatureCard key={index} className="feature-card">
                        <FeatureIcon className="feature-icon">{feature.icon}</FeatureIcon>
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureDescription>{feature.description}</FeatureDescription>
                    </FeatureCard>
                ))}
            </FeaturesContainer>
        </FeaturesSection>
    );
};

export default Features;