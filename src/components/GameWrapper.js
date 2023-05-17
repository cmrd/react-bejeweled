import GameWrapperStypes from "./css_modules/GameWrapperStyles.module.css"

const GameWrapper = ({ gameState, children }) => {

    return (
        <div className={GameWrapperStypes.GameWrapper}>
            {gameState && <div className={GameWrapperStypes.gameOverMsg}>GAME<br />OVER </div>}
            {children}
        </div>
    )
}

export default GameWrapper