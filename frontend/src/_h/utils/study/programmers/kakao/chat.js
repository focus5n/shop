const chat = (datas) => {
    const map = new Map()
    const res = []
    for (let i = 0; i < datas.length; i += 1) {
        const [act, id, name] = datas[i].split(' ')
        if (act === 'Leave') continue
        map.set(id, name)
    }

    for (let i = 0; i < datas.length; i += 1) {
        const [act, id] = datas[i].split(' ')
        if (act === 'Change') continue
        const name = map.get(id)
        if(act === 'Enter') {
            res.push(`${name}님이 들어왔습니다.`)
        } else if(act === 'Leave') {
            res.push(`${name}님이 나갔습니다.`)
        }
    }
    return res
}

class User {
    constructor(id, act, name) {
        this.id = id
        this.act = act
        this.name = name
    }

    doAct(act) {
        this.act = act
    }

    changeName(name) {
        this.name = name
    }
}

chat(["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan", "Change uid4567 Lion"])


