import ButtonStyles from "./css_modules/ButtonStyles.module.css"

const Button = ({ disabled, status, joker, onClick }) => {

    return (
        <button className={ButtonStyles.btn} disabled={disabled} status={status} onClick={onClick}>
            {status === "selected" ? <img src={joker.on} alt="Joker"/> : <img src={joker.off} alt="Joker"/>}
        </button>
    )

}

export default Button