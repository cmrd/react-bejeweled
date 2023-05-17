
export const ELEMENT_VALUE = {
    // level: score value
    lv1: 1,
    lv2: 3,
    lt: 5,
    lv3: 10,
}

const addScore = level => {

    let score = 0

    switch (level) {
        case "lv1": score += ELEMENT_VALUE.lv1
            break
        case "lv2_h": score += ELEMENT_VALUE.lv2
            break
        case "lv2_v": score += ELEMENT_VALUE.lv2
            break
        case "LT2": score += ELEMENT_VALUE.lt
            break
        case "LT1": score += ELEMENT_VALUE.lt
            break
        case "lv3": score += ELEMENT_VALUE.lv3
            break
        default: score++
    }

    return score
}

export default addScore