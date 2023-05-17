import ButtonPanelStyles from "./css_modules/ButtonPanelStyles.module.css"

import rook from '../images/rook.png';
import rook_sl from '../images/rook_sl.png';
import bishop from '../images/bishop.png';
import bishop_sl from '../images/bishop_sl.png';
import knight from '../images/knight.png';
import knight_sl from '../images/knight_sl.png';
import queen from '../images/queen.png';
import queen_sl from '../images/queen_sl.png';

import Button from "./Button"

const ButtonPanel = ({ jokers, dispatchJokerAction }) => {

    return (

        <div className={ButtonPanelStyles.buttonPanelWrapper}>
            <div className={ButtonPanelStyles.jokerText}>JOKERS</div>
            <div className={ButtonPanelStyles.buttonPanel}>
                <Button
                    disabled={jokers.rook.disabled}
                    status={jokers.rook.status}
                    joker={{ off: rook, on: rook_sl }}
                    onClick={() => dispatchJokerAction({ type: "ROOK_SELECTED" })}
                />
                <Button
                    disabled={jokers.bishop.disabled}
                    status={jokers.bishop.status}
                    joker={{ off: bishop, on: bishop_sl }}
                    onClick={() => dispatchJokerAction({ type: "BISHOP_SELECTED" })}
                />

                <Button
                    disabled={jokers.knight.disabled}
                    status={jokers.knight.status}
                    joker={{ off: knight, on: knight_sl }}
                    onClick={() => dispatchJokerAction({ type: "KNIGHT_SELECTED" })}
                />

                <Button
                    disabled={jokers.queen.disabled}
                    status={jokers.queen.status}
                    joker={{ off: queen, on: queen_sl }}
                    onClick={() => dispatchJokerAction({ type: "QUEEN_SELECTED" })}
                />
            </div>
        </div>
    )
}

export default ButtonPanel