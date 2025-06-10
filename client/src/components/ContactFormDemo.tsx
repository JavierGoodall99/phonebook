import { useState } from 'react';
import ContactForm from './ContactForm';

const ContactFormDemo = () => {
  const [showForm, setShowForm] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const handleSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };
  
  const handleToggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleToggleForm}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {showForm ? 'Hide Form' : 'Add New Contact'}
      </button>
      
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Contact added successfully!
        </div>
      )}
      
      {showForm && (
        <ContactForm 
          onSuccess={handleSuccess}
          onCancel={handleToggleForm}
        />
      )}
    </div>
  );
};

export default ContactFormDemo;
