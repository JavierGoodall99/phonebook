import { useState } from 'react';
import ContactForm from './ContactForm';

const ContactFormDemo = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const handleSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="p-4">
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Contact added successfully!
        </div>
      )}
      
      <ContactForm 
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ContactFormDemo;
