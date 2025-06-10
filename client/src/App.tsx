import './App.css'
import { useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

function App() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleContactAdded = () => {
    setShowContactForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Phonebook App</h1>
          <p className="text-gray-600 mt-2">Manage your contacts easily</p>
        </header>
        
        <main className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-semibold text-gray-700">My Contacts</h2>
              <button
                onClick={toggleContactForm}
                className="px-5 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center md:justify-start"
              >
                {showContactForm ? 'Cancel' : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Contact
                  </>
                )}
              </button>
            </div>
            
            {showContactForm && (
              <div className="border-b border-gray-200 pb-6 mb-6">
                <ContactForm 
                  onSuccess={handleContactAdded}
                  onCancel={() => setShowContactForm(false)}
                />
              </div>
            )}
            
            <ContactList refreshTrigger={refreshTrigger} />
          </div>
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Phonebook App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
