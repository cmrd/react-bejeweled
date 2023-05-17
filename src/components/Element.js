import ElementStyles from "./css_modules/ElementStyles.module.css"

const Element = ({ target, index, handleElementState }) => {

    return (
        <div
            className={`${ElementStyles.element} ${ElementStyles[target.color]}`}
            level={target.level}
            flag={target.flag}
            id={index}
            onClick={() => handleElementState(index)}
        >
        </div>
    )
}

export default Element