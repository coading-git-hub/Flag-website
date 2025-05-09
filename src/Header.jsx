import React, { useState, useEffect } from 'react'

const Header = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className='header'>
      <div>
         <h1>🌎 Countries of the World 🌎</h1>
      </div>
      <button className='theme-toggle' onClick={toggleTheme}>
        <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  )
}

export default Header
