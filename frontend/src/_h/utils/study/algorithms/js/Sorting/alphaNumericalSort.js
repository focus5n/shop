const alphaNumericalSort = (a, b) => {
    console.log(a.localeCompare(b), undefined, { numeric: true })
}

alphaNumericalSort('a', 'b')


// Alphabetical sorting:
//   1.z11
//   2.z2
//   Natural sorting:
//   1. z2
//   2. z11