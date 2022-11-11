const mapConsecutive = (arr, n, fn) =>
    arr.slice(n - 1).map((v, i) => fn(arr.slice(i, i + n)))

mapConsecutive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, x => x.join('-'));
