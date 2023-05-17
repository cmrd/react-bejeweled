export const COLOR_ARRAY = ["yellow", "green", "blue", "red", "orange", "purple", "pink"]

/*Returns one of the 7 colors defined in the COLOR_ARRAY*/

const colorGenerator = () => {

    return {
        color: COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)],
        level: "lv1",
        flag: ""
    }

}

export default colorGenerator

