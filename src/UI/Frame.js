import style from './Frame.module.css';

const Frame = (props) => {
  return (
    <div className={style.frame}>
      {props.children}
    </div>
  )
}

export default Frame;