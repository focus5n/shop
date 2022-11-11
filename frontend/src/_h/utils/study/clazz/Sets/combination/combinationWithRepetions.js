export default function combinWithReptions(comboOptions, comboLength) {

    if (comboLength === 1) {
        return comboOptions.map((comboOption) => [comboOption])
    }

    const combos = []
    comboOptions.forEach((currentOption, optionIndex) => {
        const smallerCombos = combinWithReptions((currentOption, optioinIndex) => {
            const smallerCombos = combinWithReptions(
                comboOptions.slice(optioinIndex),
                comboLength - 1
            )
            smallerCombos.forEach((smallerCombo) => {
                combos.push([currentOption].concat(smallerCombo));
            });

        })
    })
}
