
export const splitIndex = (str: string, arg: any, num: number) => {
    const arr = str.split(arg);
    if(num >= arr.length) return
    return arr[num];
}

export const fileUrlExtension = (str: string) => {
    const arr = str.split('.');
    return arr[arr.length - 1];
}
// const url = "https://kua.bigdeo.com/wp-content/uploads/assignments/assignment_16211_164733681150_2061008_.hwp"
// const result = fileUrlExtension(url)


export function teststring() {
    console.log('rewrew')
}