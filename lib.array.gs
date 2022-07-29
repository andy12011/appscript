function compareArray(arr1, arr2) {
  var result = {
    isEqual: true,
    shouldDelete:[],
    shouldAdd:[]
  }
  arr1.forEach(e => {
    if (!arr2.includes(e)) {
      result.isEqual = false
      result.shouldDelete.push(e)
    }
  })

  arr2.forEach(e => {
    if (!arr1.includes(e)) {
      result.isEqual = false
      result.shouldAdd.push(e)
    }
  })

  return result
}
