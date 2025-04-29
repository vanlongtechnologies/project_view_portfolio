import { Paintbrush, Code, Lightbulb, Users } from 'lucide-react';

function About() {
  const skills = [
    {
      icon: <Paintbrush className="w-6 h-6 text-accent" />,
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing interfaces that enhance user experience across platforms.',
    },
    {
      icon: <Code className="w-6 h-6 text-accent" />,
      title: 'Design Systems',
      description: 'Building cohesive design systems with reusable components that ensure consistency and efficiency.',
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-accent" />,
      title: 'Visual Design',
      description: 'Crafting engaging visual aesthetics that communicate brand values and captivate audiences.',
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: 'User Research',
      description: 'Conducting research to understand user needs and behaviors, informing data-driven design decisions.',
    },
  ];

  return (
    <section id="about" className="section dark:bg-gray-400">
      <div className="container-custom">
        <h2 className="section-title text-center text-primary dark:text-primary-dark">About Me</h2>
        <p className="section-subtitle text-center text-secondary dark:text-secondary-dark">
          A passionate designer focused on creating beautiful and functional experiences
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-primary dark:text-primary-dark mb-4">
              Bringing ideas to life through design
            </h3>
            <p className="text-secondary dark:text-secondary-dark mb-6">
              With over 5 years of experience in the design industry, I specialize in creating compelling visual experiences 
              across various mediums. My passion lies in solving complex problems through thoughtful design, whether 
              it's crafting intuitive user interfaces, developing brand identities, or creating illustrations that tell a story.
            </p>
            <p className="text-secondary dark:text-secondary-dark mb-8">
              I believe that great design is not just about aesthetics but about creating meaningful connections between 
              people and products. By combining technical skills with artistic vision, I strive to deliver designs that 
              are both beautiful and purposeful.
            </p>

            <h4 className="text-xl font-bold text-primary dark:text-primary-dark mb-4">
              Tools & Technologies
            </h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Figma', 'Adobe XD', 'Adobe Illustrator', 'Adobe Photoshop', 'Sketch', 'After Effects', 'Procreate', 'InVision'].map((tool) => (
                <span key={tool} className="bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-dark px-3 py-1 rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                    {skill.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-primary dark:text-primary-dark mb-2">
                    {skill.title}
                  </h4>
                  <p className="text-secondary dark:text-secondary-dark">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;