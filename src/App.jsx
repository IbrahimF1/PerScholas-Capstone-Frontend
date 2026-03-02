import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProblemPage from './pages/ProblemPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProblemPage />
    </>
  )
}

export default App
