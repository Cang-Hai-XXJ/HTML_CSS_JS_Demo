class ArrayStack {
    constructor(n) {
        this.items = []
        this.n = n
        this.count = 0
    }
    push(val) {
        if (this.count == n) return false
        this.items[count] = n
        this.count++
        return true
    }
    pop() {
        if (this.count == 0) return null
        this.count--
        return this.items[count]
    }
}
bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let flag = false
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
                falg = true
                // b = [a,a=b][0]
            }
        }
        if (!flag) break
    }
}
insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let value = arr[i]
        let j = i - 1
        for (; j >= 0; j--) {
            if (arr[j] > value) {
                //交换数据
                arr[j + 1] = arr[j]
            } else {
                break
            }
        }
        //插入数据
        arr[j + 1] = value
    }
}
insertSort() {

}
getRandomArray(x, n, m) {
    let arr = []
    if (n >= m) {
        return null
    }
    for (let i = 0; i < x; i++) {
        arr.push(Math.random() * (m - n) + n)
    }
    return arr
}
test(sort, arr) {
    const start = Date.now()
    sort(arr)
    const end = Date.now()
    console.log(`${sort}的执行时间为${(start - end) / 1000}秒`)
}