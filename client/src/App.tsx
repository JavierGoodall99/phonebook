import './App.css'
import ContactFormDemo from './components/ContactFormDemo'

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Phonebook App</h1>
        <p className="text-gray-600">Manage your contacts easily</p>
      </header>
      
      <main>
        <ContactFormDemo />
      </main>
    </div>
  )
}

export default App
