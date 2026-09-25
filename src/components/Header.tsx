import ThemeButton from "./ThemeButton"
import LanguageButton from "./LanguageButton"
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
      C:/ PORTFOLIO
      <div className="config">
        <LanguageButton />
      <ThemeButton />
      </div>
    </header>
  )
}

export default Header