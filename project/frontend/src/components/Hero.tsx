import { ArrowDown } from 'lucide-react';

function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden dark:bg-gray-600">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-primary-dark mb-6 slide-up" style={{ animationDelay: '200ms' }}>
            Creative Design{' '}
            <span className="text-accent">Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary dark:text-secondary-dark mb-8 slide-up" style={{ animationDelay: '400ms' }}>
            Showcasing UI/UX, Illustration, and Motion Design Works
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 slide-up" style={{ animationDelay: '600ms' }}>
            <a href="#portfolio" className="btn btn-primary">
              View Portfolio
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      <a 
        href="#portfolio" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-sm mb-2 text-secondary dark:text-secondary-dark">Scroll</span>
        <ArrowDown size={20} className="text-accent" />
      </a>
    </section>
  );
}

export default Hero;