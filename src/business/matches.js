
export const columns = board => {

    const col5 = []
    const col4 = []
    const col3 = []

    for (let i = 0; i < 48; i++) {

        if (col5.includes(i) || col4.includes(i) || col3.includes(i)) continue

        if (i < 32 && board[i].color === board[i + 8].color && board[i].color === board[i + 8 * 2].color
            && board[i].color === board[i + 8 * 3].color && board[i].color === board[i + 8 * 4].color) {

            col5.push(i, i + 8, i + 8 * 2, i + 8 * 3, i + 8 * 4)
        }
        else if (i < 40 && board[i].color === board[i + 8].color && board[i].color === board[i + 8 * 2].color
            && board[i].color === board[i + 8 * 3].color) {

            col4.push(i, i + 8, i + 8 * 2, i + 8 * 3)
        }
        else if (board[i].color === board[i + 8].color && board[i].color === board[i + 8 * 2].color) {

            col3.push(i, i + 8, i + 8 * 2)
        }
    }


    return [col5, col4, col3]
}

export const rows = board => {

    const indicesOf5 = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31,
        36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63]

    const indicesOf4 = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31,
        37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]

    const indicesOf3 = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]

    const row5 = []
    const row4 = []
    const row3 = []

    for (let i = 0; i < 64; i++) {

        if (row5.includes(i) || row4.includes(i) || row3.includes(i)) continue

        if (!indicesOf5.includes(i) && board[i].color === board[i + 1].color && board[i].color === board[i + 2].color
            && board[i].color === board[i + 3].color && board[i].color === board[i + 4].color) {

            row5.push(i, i + 1, i + 2, i + 3, i + 4)
        }
        else if (!indicesOf4.includes(i) && board[i].color === board[i + 1].color && board[i].color === board[i + 2].color
            && board[i].color === board[i + 3].color) {

            row4.push(i, i + 1, i + 2, i + 3)
        }
        else if (!indicesOf3.includes(i) && board[i].color === board[i + 1].color && board[i].color === board[i + 2].color) {
            row3.push(i, i + 1, i + 2)
        }
    }



    return [row5, row4, row3]
}