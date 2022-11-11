const skill = (skill, skill_trees) => {
    let answer = 0
    const regex = new RegExp(`[${skill}]`, 'g')
    for (let i = 0; i < skill_trees.length; i += 1) {
        let temp = skill_trees[i].match(regex) 
        if(temp) {
            temp = temp.join('')
            const index = skill.indexOf(temp)
            if (index === 0) answer += 1
        } else {
            answer +=1
        }
    }
    return answer
}

skill("BD", ["BACDE", "CBADF", "AECB", "BDA", "CA"])

