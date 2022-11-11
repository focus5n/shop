export default function combineWithoutRepetitions(comboOptions, comboLength) {

    if (comboLength === 1) {
        return comboOptions.map((comboOption) => [comboOption]);
    }


    const combos = [];

    comboOptions.forEach((currentOption, optionIndex) => {
        const smallerCombos = combineWithoutRepetitions(
            comboOptions.slice(optionIndex + 1),
            comboLength - 1,
        );

        console.log('currentOption:' + currentOption)
        console.log('smallerCombos:' + smallerCombos)

        smallerCombos.forEach((smallerCombo) => {
            combos.push([currentOption].concat(smallerCombo));
        });
        console.log('combos:' + combos)
        console.log('')
    });

    return combos;
}

const arr = [1, 2, 3, 4]
const num = 3

console.log(combineWithoutRepetitions(arr, num))


