import ScoreStyles from "./css_modules/ScoreStyles.module.css"

const Score = ({ score }) => {

    return (
        <div className={ScoreStyles.scoreContainer}>
            <div>SCORE</div>
            <div className={ScoreStyles.score}>{score}</div>
        </div>
    )
}

export default Score