import './App.css'
import { useState } from 'react'
import ContactFormDemo from './components/ContactFormDemo'
import ContactList from './components/ContactList'

function App() {
  const [showContactForm, setShowContactForm] = useState(false);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Phonebook App</h1>
        <p className="text-gray-600">Manage your contacts easily</p>
      </header>
      
      <main className="grid gap-8">
        <div className="flex justify-center">
          <button
            onClick={toggleContactForm}
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {showContactForm ? 'Hide Contact Form' : 'Add New Contact'}
          </button>
        </div>
        
        {showContactForm && (
          <ContactFormDemo />
        )}
        
        <ContactList />
      </main>
    </div>
  )
}

export default App
