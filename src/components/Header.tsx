import ThemeButton from "./ThemeButton"
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
      C:/ PORTFOLIO
      <div className="config">
        <ThemeButton />
      </div>
    </header>
  )
}

export default Header