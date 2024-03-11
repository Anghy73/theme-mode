import { useEffect, useState } from 'react'
import { Sun, Moon, System } from './icons/icons'

function App () {
  const [activeThemes, setActiveThemes] = useState(false)
  const [theme, setTheme] = useState('system')

  const root = document.documentElement
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const verifTheme = () => {
    if (window.localStorage.getItem('theme') === 'dark' || ((!window.localStorage.theme) && darkQuery.matches)) {
      root.classList.add('dark')
      root.classList.remove('light')
      if (!window.localStorage.theme) {
        setTheme('system')
        return
      }
      setTheme('dark')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
      if (!window.localStorage.theme) {
        setTheme('system')
        return
      }
      setTheme('light')
    }
  }

  useEffect(() => {
    verifTheme()
  }, [])

  darkQuery.addEventListener('change', () => {
    verifTheme()
  })

  const handleThemeSelection = () => {
    setActiveThemes(!activeThemes)
  }

  const handleClickDark = () => {
    console.log('dark')
    root.classList.add('dark')
    window.localStorage.setItem('theme', 'dark')

    setTheme('dark')
    handleThemeSelection()
  }

  const handleClickLight = () => {
    console.log('light')
    root.classList.remove('dark')
    root.classList.add('light')
    window.localStorage.setItem('theme', 'light')
    setTheme('light')
    handleThemeSelection()
  }

  const handleClickSystem = () => {
    console.log('system')
    window.localStorage.removeItem('theme')

    if (darkQuery.matches) {
      root.classList.add('dark')
      root.classList.remove('light')
      // window.localStorage.setItem('theme', 'dark')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
      // window.localStorage.setItem('theme', 'light')
    }

    setTheme('system')
    handleThemeSelection()
  }

  document.body.addEventListener('click', (evt) => {
    if (evt.target.getAttribute('id') === 'main') {
      setActiveThemes(false)
    }
  })

  return (
    <main id='main' className='w-screen h-screen flex justify-center items-center bg-white text-black dark:bg-neutral-800 dark:text-white'>
      <div className='flex flex-col relative'>
        <button id='themes' onClick={handleThemeSelection} className='flex gap-2 justify-center items-center bg-gray-950 px-4 py-2 rounded-md text-white text-2xl cursor-pointer hover:bg-gray-800'>
          <span>
            {theme === 'system' ? <System /> : theme === 'dark' ? <Moon /> : <Sun />}
          </span>Theme
        </button>

        {
          activeThemes && (
            <div className='flex flex-col justify-center items-center bg-black rounded-md p-2 min-w-52 absolute top-10 text-white'>
              <button className='hover:bg-gray-800 rounded-md text-2xl flex items-center w-full px-2 py-1 gap-3' onClick={handleClickDark}><span><Moon /></span>Dark</button>
              <button className='hover:bg-gray-800 rounded-md text-2xl flex items-center w-full px-2 py-1 gap-3' onClick={handleClickLight}><span><Sun /></span>Light</button>
              <button className='hover:bg-gray-800 rounded-md text-2xl flex items-center w-full px-2 py-1 gap-3' onClick={handleClickSystem}><span><System /></span>System</button>
            </div>
          )
        }
      </div>
    </main>
  )
}

export default App
