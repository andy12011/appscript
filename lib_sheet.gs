var libSpreadSheetID = ``

function setSpreadSheetID(id) {
  libSpreadSheetID = id
}

function getSpreadSheetID() {
  return libSpreadSheetID 
}

function copyTemplate(copySheetName, newSheetName) {
  var sheet = getSheetByName(copySheetName)

  var destination = SpreadsheetApp.openById(libSpreadSheetID);
  newSheet = sheet.copyTo(destination);
  if (newSheetName != "") {
    newSheet.setName(newSheetName)
  }
}

function getSheetByName(sheetName) {
  let sheets = SpreadsheetApp.getActiveSpreadsheet();
  return sheets.getSheetByName(sheetName)
}

function getSheetNameList() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let nameList = []
  ss.getSheets().forEach(s => {
    nameList.push(s.getName())
  })
  return nameList
}

function sheetExist(sheetName) {
  var sheet = getSheetByName(sheetName)
  return sheet ? true : false
}

function deleteSheetByName(sheetName) {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(sheetName);
  ss.deleteSheet(sheet);
}
//SpreadsheetApp.getActiveSpreadsheet().getId()
function deleteSheetsHasExceptNameList(exceptSheetNameList) {
  var sheetNameList = getSheetNameList()
  sheetNameList.forEach( n => {
    if (exceptSheetNameList.includes(n)) {
      return
    }
    deleteSheetByName(n)
  })
}

function deleteSheetsInclude(includeWord) {
  var sheetNameList = getSheetNameList()
  sheetNameList.forEach( n => {

    if (n.includes(includeWord)) {
      console.log(n,includeWord)
      deleteSheetByName(n)
    }
  })
}

function updateSheetName(currentSheetName, newSheetName) {
  var sheet = getSheetByName(currentSheetName)
  sheet.setName(newSheetName)
}

function createSheet(sheetName, templateName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (templateName != "") {
    var templateSheet = ss.getSheetByName(templateName);
    ss.insertSheet(sheetName, ss.getSheets().length+1, {template: templateSheet});
  } else {
    ss.insertSheet(sheetName, ss.getSheets().length+1);
  }
}

function clearSheet(sheetName, contentsOnly, formatOnly){
  var sheet = getSheetByName(sheetName)
  sheet.clear({ formatOnly: formatOnly, contentsOnly: contentsOnly })
}

function setValuesToSheet(sheetName, rows, startRow, startColumn) {
  var maxRowLength = 0
  rows.forEach( r => {
    if (r.length >= maxRowLength) {
      maxRowLength = r.length
    }
  })
  if (maxRowLength == 0) {
    return
  }
  rows.forEach((r, idx) => {
    if (r.length < maxRowLength) {
      for (i=maxRowLength-r.length; i>0 ; i--) {
          rows[idx].push('')
      }
    }
  })
  var writeRange = getSheetByName(sheetName).getRange(startRow, startColumn, rows.length, maxRowLength);
  writeRange.setValues(rows);
}

function getOtherSpreadsheetData(spreadsheetID, sheetName) {
  var sheet = SpreadsheetApp.openById(spreadsheetID).getSheetByName(sheetName)
  return sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues()
}

function getOtherSpreadsheetDisplayData(spreadsheetID, sheetName) {
  var sheet = SpreadsheetApp.openById(spreadsheetID).getSheetByName(sheetName)
  return sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues()
}

function getSheetTotalData(sheetName, isDisplay) {
  var sheet = getSheetByName(sheetName)
  if (sheet.getLastRow()==0 || sheet.getLastColumn()==0) {
    return []
  } 
  var totalRange = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
  if (isDisplay == true) {
    return totalRange.getDisplayValues()
  } else {
    return totalRange.getValues()
  }
}

// appendData
// sheetName string
// data array
function appendData(sheetName, data) {
  var sheet = getSheetByName(sheetName)
  sheet.appendRow(data);
}


// [{
//   rowStart: 1,
//   rowLength: 1,
//   columnStart: 2,
//   columnLength: 8,
//   shouldMerge: true,
//   horizontal: "center",
//   values:[["aaa"]],
// }]

function writeData(sheetName, settings) {
  var sheet = getSheetByName(sheetName)
  settings.forEach(r => {
    console.log(r)
    var range = sheet.getRange(r.rowStart, r.columnStart, r.rowLength, r.columnLength)

    if (r.shouldMerge) {
      console.log("merge")
      range.merge()
    }
    if (r.horizontal) {
      range.setHorizontalAlignment(r.horizontal)
    }
    sheet.insertColumns(sheet.getMaxColumns(), r.columnLength);
    if (r.value) {
      range.setValue(r.value)
    } else {
      range.setValues(r.values)
    }
  })
}

function setFrozen(sheetName, column, row) {
    var sheet = getSheetByName(sheetName)
    if (column) {
      sheet.setFrozenColumns(column)
    }

    if (row) {
      sheet.setFrozenRows(row)
    }
}

function updateStatus(sheetName, range, str) {
  let sheet = getSheetByName(sheetName)
  sheet.getRange(range).setValue(str)
}

function deleteSheetColumns(sheetName, start, end) {
    if (end == 0) {
    return 
  }
  var sheet = getSheetByName(sheetName)
  sheet.deleteColumns(start, end);
}

function deleteSheetRows(sheetName, start, end) {
  if (end == 0) {
    return 
  }
  var sheet = getSheetByName(sheetName)
  sheet.deleteRows(start, end);
}


