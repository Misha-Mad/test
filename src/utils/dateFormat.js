 export function todayDateCalculate() {
    const todayDate = new Date();
    return todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
}