
const invalidIndices = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]

const width = 8

const monitorBoard = board => {

  let atVerticalRange_column = 0
  let atVerticalRange_row = 0

  // Rows
  for (let i = 0; i < board.length; i++) {

    if (atVerticalRange_row > 5) atVerticalRange_row = 0

    if (invalidIndices.includes(i)) continue

    if (i + 1 < 64 && i + 2 < 64 && 
      board[i].color === board[i + 1].color && board[i].color === board[i + 2].color) return true

    if (i + 1 < 64 && i + 3 < 64 && atVerticalRange_row + 3 < 8 &&
      board[i].color === board[i + 1].color && board[i].color === board[i + 3].color) return true

    if (i + 2 < 64 && i + 3 < 64 && atVerticalRange_row + 3 < 8 &&
      board[i].color === board[i + 2].color && board[i].color === board[i + 3].color) return true

    if (i - (width - 1) >= 0 && i - (width - 2) >= 0 &&
      board[i].color === board[i - (width - 1)].color && board[i].color === board[i - (width - 2)].color) return true

    if (i - (width - 1) >= 0 && i + 2 < 64 &&
      board[i].color === board[i - (width - 1)].color && board[i].color === board[i + 2].color) return true

    if (i + (width + 1) < 64 && i + (width + 2) < 64 &&
      board[i].color === board[i + (width + 1)].color && board[i].color === board[i + (width + 2)].color) return true

    if (i + (width + 1) < 64 && i + 2 < 64 &&
      board[i].color === board[i + (width + 1)].color && board[i].color === board[i + 2].color) return true

    if (i + 1 < 64 && i - width + 2 >= 0 &&
      board[i].color === board[i + 1].color && board[i].color === board[i - width + 2].color) return true

    if (i + 1 < 64 && i + width + 2 < 64 &&
      board[i].color === board[i + 1].color && board[i].color === board[i + width + 2].color) return true

      atVerticalRange_row++
  }

  // Columns
  for (let i = 0; i < 48; i++) {

    if (atVerticalRange_column >= 8) atVerticalRange_column = 0

    if (i + width < 64 && i + width * 2 < 64 &&
      board[i].color === board[i + width].color && board[i].color === board[i + width * 2].color) return true

    if (i + width < 64 && i + width * 3 < 64 &&
      board[i].color === board[i + width].color && board[i].color === board[i + width * 3].color) return true

    if (i + width * 2 < 64 && i + width * 3 < 64 &&
      board[i].color === board[i + width * 2].color && board[i].color === board[i + width * 3].color) return true

    if (i + (width - 1) < 64 && i + (width * 2 - 1) < 64 && atVerticalRange_column - 1 >= 0 &&
      board[i].color === board[i + (width - 1)].color && board[i].color === board[i + (width * 2 - 1)].color) return true

    if (i + (width - 1) < 64 && i + (width * 2) < 64 && atVerticalRange_column - 1 >= 0 &&
      board[i].color === board[i + (width - 1)].color && board[i].color === board[i + (width * 2)].color) return true

    if (i + (width + 1) < 64 && i + (width * 2 + 1) < 64 && atVerticalRange_column + 1 < 8 &&
      board[i].color === board[i + (width + 1)].color && board[i].color === board[i + (width * 2 + 1)].color) return true

    if (i + (width + 1) < 64 && i + (width * 2) < 64 && atVerticalRange_column + 1 < 8 &&
      board[i].color === board[i + (width + 1)].color && board[i].color === board[i + (width * 2)].color) return true

    if (i + width < 64 && i + width * 2 - 1 < 64 && atVerticalRange_column - 1 >= 0 &&
      board[i].color === board[i + width].color && board[i].color === board[i + width * 2 - 1].color) return true

    if (i + width < 64 && i + width * 2 + 1 < 64 && atVerticalRange_column + 1 < 8 &&
      board[i].color === board[i + width].color && board[i].color === board[i + width * 2 + 1].color) return true

    atVerticalRange_column++
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i].level === "lv3") return true
  }

  return false // no match found

}

export default monitorBoard