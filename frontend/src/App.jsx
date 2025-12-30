import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="grid grid-cols-3 gap-4">
      <li>a</li>
      <li>b</li>
      <li>c</li>
      <li>4</li>
      <li>5</li>
    </div>
<h1 className="text-3xl font-bold underline text-red-500 text-center mt-50">
  Tailwind Working
</h1>
</>
  )
}

export default App
