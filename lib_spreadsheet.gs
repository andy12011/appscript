function sortTab() {
  var sortList =  getSheetNameList().sort()
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  sortList.forEach((tabName, idx) => {
    console.log(tabName, idx+1)
    spreadsheet.setActiveSheet(spreadsheet.getSheetByName(tabName), true);
    spreadsheet.moveActiveSheet(idx+1);
  })
}

function sortTabWithLockList(lockList) {
  var sortList =  getSheetNameList().sort()
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var lockCount = lockList.length
  lockList.forEach((tabName, idx) => {
    console.log(tabName, idx+1)
    spreadsheet.setActiveSheet(spreadsheet.getSheetByName(tabName), true);
    spreadsheet.moveActiveSheet(idx+1);
  })

  var newSortList = []
  sortList.forEach((tabName) => {
    if (lockList.includes(tabName)) {
      return
    }
    newSortList.push(tabName)
  })
  newSortList.forEach((tabName, idx) => {
    console.log(tabName, lockCount+idx+1)
    spreadsheet.setActiveSheet(spreadsheet.getSheetByName(tabName), true);
    spreadsheet.moveActiveSheet(lockCount+idx+1);
  })
}