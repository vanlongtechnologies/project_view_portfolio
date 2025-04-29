import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    
    try {
      const response = await axios.post('/api/contact/', formData);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.response?.data?.error || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="section-title text-center">Get in Touch</h2>
        <p className="section-subtitle text-center">
          Have a project in mind? Let's create something amazing together
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-primary dark:text-primary-dark mb-6">
              Send a Message
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-lg text-success">
                <p className="font-medium">Your message has been sent successfully!</p>
                <p className="text-sm mt-1">I'll get back to you as soon as possible.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg text-error">
                <p className="font-medium">Failed to send your message.</p>
                <p className="text-sm mt-1">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-primary-dark focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-primary-dark focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-primary-dark focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-secondary dark:text-secondary-dark mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-primary dark:text-primary-dark focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary flex items-center justify-center w-full sm:w-auto ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-primary dark:text-primary-dark mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-primary dark:text-primary-dark">
                    Email Address
                  </h4>
                  <a 
                    href="mailto:contact@designfolio.com" 
                    className="text-secondary dark:text-secondary-dark hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    contact@designfolio.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-primary dark:text-primary-dark">
                    Location
                  </h4>
                  <p className="text-secondary dark:text-secondary-dark">
                    San Francisco, California
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-8">
                <h4 className="text-lg font-semibold text-primary dark:text-primary-dark mb-4">
                  Let's connect
                </h4>
                <p className="text-secondary dark:text-secondary-dark mb-6">
                  Follow me on social media or check out my profiles on design platforms.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.behance.net/gallery/1234567890/Project-Name" 
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-secondary dark:text-secondary-dark hover:bg-accent hover:text-white transition-colors"
                    aria-label="Dribbble"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm10 12c0 1.094-.188 2.156-.531 3.156-1.356-.281-2.82-.344-4.212-.156-.219-.563-.438-1.094-.688-1.625 1.625-.719 2.906-1.656 3.938-2.813A9.935 9.935 0 0 1 22 12zm-3.063-2.813c-.875.969-1.969 1.781-3.344 2.375-.656-1.188-1.344-2.344-2.156-3.406 1.5-.312 2.969-.5 4.469-.5.375 0 .719 0 1.063.31.031.53-.31 1 0 1.5zM10.969 3.75c.875 1.094 1.688 2.313 2.406 3.594-1.531.5-3.219.781-4.906.781-.781 0-1.531-.063-2.25-.156A10.035 10.035 0 0 1 12 2c.344 0 .688.031 1.031.063-.156.53-.281 1.093-.344 1.687h-1.719zm-5.187 1.25c.625.063 1.281.094 1.938.094 1.406 0 2.844-.219 4.156-.625.219.438.406.875.594 1.344-1.781.563-3.375 1.594-4.75 2.969A9.915 9.915 0 0 1 2 12c0-2.594 1-4.969 2.625-6.75.313-.125.75-.156 1.156-.25zm-.875 8.219c1.063-.156 2.156-.25 3.25-.25 1.563 0 3.094.219 4.594.625-.156.406-.344.813-.531 1.219-1.875.625-3.469 1.719-4.781 3.156A9.905 9.905 0 0 1 2 12c0-.938.156-1.813.438-2.656.813 1.094 1.625 2.188 2.469 3.25v.625zm4.75 5c1.094-1.25 2.406-2.188 3.938-2.75.75 1.938 1.219 3.969 1.406 6.031A9.93 9.93 0 0 1 12 22a9.97 9.97 0 0 1-6.906-2.781c1.125-1.344 2.5-2.344 4.063-3zm7.5 2.906c-.156-1.75-.531-3.469-1.156-5.156.906-.125 1.844-.156 2.781-.031A9.935 9.935 0 0 1 17.156 20z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.behance.net/gallery/1234567890/Project-Name" 
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-secondary dark:text-secondary-dark hover:bg-accent hover:text-white transition-colors"
                    aria-label="Behance"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.443 5.35c.639 0 1.23.05 1.77.198.541.099 1.031.297 1.426.495.394.198.689.495.885.891.196.396.295.891.295 1.485 0 .594-.147 1.089-.393 1.485-.295.396-.639.693-1.18.891.738.198 1.278.594 1.672 1.089.394.495.591 1.188.591 1.98 0 .693-.147 1.287-.442 1.683-.295.396-.639.693-1.082.891-.443.198-.984.396-1.525.495-.59.099-1.18.148-1.77.148H1V5.35h6.443zm-.394 5.94c.541 0 .984-.099 1.328-.297.344-.198.492-.594.492-1.089 0-.297-.049-.495-.147-.693-.098-.099-.246-.297-.442-.396-.197-.099-.394-.099-.639-.198-.246 0-.491-.05-.787-.05H3.82v2.723h3.229zm.197 6.237c.295 0 .59 0 .886-.05.295-.05.541-.099.787-.198.246-.099.443-.198.59-.396.148-.198.246-.495.246-.891 0-.693-.197-1.188-.59-1.386-.394-.198-.885-.297-1.475-.297H3.82v3.218h3.426zM18.442 6.44c.541 0 1.033.099 1.475.297.443.198.787.396 1.082.693.295.297.492.594.639.99.147.297.246.693.246 1.089 0 .495-.098.891-.295 1.287-.197.396-.59.693-1.082.792.639.198 1.082.495 1.377.99.295.495.443 1.04.443 1.683 0 .594-.098 1.089-.295 1.485-.197.397-.492.693-.885.891-.393.198-.787.347-1.23.446-.442.05-.885.099-1.377.099-.737 0-1.377-.05-1.918-.198-.54-.148-.984-.297-1.327-.594v-1.98c.393.396.836.693 1.278.891.442.198.984.297 1.525.297.197 0 .442 0 .639-.05.196-.05.393-.099.59-.198.197-.099.344-.247.443-.396.098-.198.147-.396.147-.693 0-.594-.197-.99-.59-1.188-.394-.198-.984-.297-1.77-.297h-1.23V9.46h1.23c.295 0 .59-.05.836-.05.246-.05.443-.099.639-.198.196-.099.344-.247.442-.395.099-.198.148-.396.148-.693 0-.495-.148-.792-.443-.99-.295-.199-.688-.298-1.18-.298-.393 0-.787.05-1.18.199-.393.148-.836.396-1.279.693V5.744c.344-.198.787-.396 1.279-.495.492-.099 1.033-.148 1.574-.148 1.18 0 2.066.248 2.754.693.688.495 1.033 1.238 1.033 2.228 0 .396-.049.693-.147.99-.099.198-.246.396-.443.594-.197.099-.393.198-.639.297-.246.099-.492.099-.787.148v.05c.59 0 1.082.099 1.524.297.443.198.787.396 1.033.693zm-3.524-5.05h-5.344v1.534h5.344V1.39zM14.475 18.515c.492-.495.738-1.089.738-1.881 0-.396-.05-.693-.148-.99-.098-.198-.246-.396-.491-.594-.246-.198-.492-.297-.885-.396-.344-.099-.787-.148-1.279-.148-.639 0-1.328.148-2.066.396-.738.297-1.377.693-1.968 1.287l1.082 1.683c.442-.495.885-.891 1.328-1.089.442-.198.885-.297 1.229-.297.394 0 .688.05.885.148.197.099.295.297.295.594 0 .198-.098.396-.246.594-.148.198-.344.396-.639.594-.246.198-.541.396-.885.594-.344.198-.738.495-1.18.792-.442.298-.787.594-1.131.891-.344.297-.639.594-.836.891-.197.297-.344.594-.443.99-.098.297-.147.693-.147 1.09v.495h7.114v-1.98h-4.015c.049-.198.147-.396.295-.594.148-.198.344-.396.59-.594.247-.198.443-.297.64-.396l1.327-.99c.442-.297.836-.594 1.18-.891.345-.247.59-.495.836-.742z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.behance.net/gallery/1234567890/Project-Name" 
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-secondary dark:text-secondary-dark hover:bg-accent hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.behance.net/gallery/1234567890/Project-Name" 
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-secondary dark:text-secondary-dark hover:bg-accent hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;