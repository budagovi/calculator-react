import style from './Button.module.css'

const Button = ({onClick, id, symbol}) => {
  return (
    <button 
      className={style.btn} 
      onClick={onClick} 
      id={id}
    >
      {symbol ? symbol : id.substr(3, 1)}
    </button>
  )
}

export default Button;