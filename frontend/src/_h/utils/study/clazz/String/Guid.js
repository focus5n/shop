export const Guid = () => {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    let currentDateMilliseconds = new Date().getTime()
    return pattern.replace(/[xy]/g, currentChar => {
        const randomChar = (currentDateMilliseconds + Math.random() * 16) % 16 | 0
        currentDateMilliseconds = Math.floor(currentDateMilliseconds / 16)
        return (currentChar === 'x' ? randomChar : (randomChar & 0x7 | 0x8)).toString(16)
    })
}