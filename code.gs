/**
 * Google Apps Script for Digital MAPSI SD
 * 
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code into the editor.
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone).
 * 5. Copy the Web App URL and use it in your frontend.
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Optional if script is bound to sheet

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify(getAllData()))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const params = JSON.parse(e.postData.contents);
  const action = params.action;
  const data = params.data;

  let result;
  switch (action) {
    case 'register':
      result = registerParticipant(data);
      break;
    case 'saveScore':
      result = saveScore(data);
      break;
    case 'addBranch':
      result = addBranch(data);
      break;
    case 'deleteBranch':
      result = deleteBranch(data);
      break;
    default:
      result = { status: 'error', message: 'Invalid action' };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAllData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID) || SpreadsheetApp.getActiveSpreadsheet();
  
  const participants = getSheetData(ss, 'Participants');
  const branches = getSheetData(ss, 'Branches');
  const scores = getSheetData(ss, 'Scores');

  return { participants, branches, scores };
}

function getSheetData(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  return rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}

function registerParticipant(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID) || SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Participants') || ss.insertSheet('Participants');
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['id', 'name', 'institution', 'branch', 'genderCategory', 'photo', 'createdAt']);
  }

  const id = 'MAPSI-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const createdAt = new Date().toISOString();
  
  sheet.appendRow([id, data.name, data.institution, data.branch, data.genderCategory, data.photo, createdAt]);
  
  return { status: 'success', id };
}

function saveScore(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID) || SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Scores') || ss.insertSheet('Scores');
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['participantId', 'branchId', 'score']);
  }

  const values = sheet.getDataRange().getValues();
  let found = false;
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === data.participantId && values[i][1] === data.branchId) {
      sheet.getRange(i + 1, 3).setValue(data.score);
      found = true;
      break;
    }
  }

  if (!found) {
    sheet.appendRow([data.participantId, data.branchId, data.score]);
  }

  return { status: 'success' };
}

function addBranch(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID) || SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Branches') || ss.insertSheet('Branches');
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['id', 'name']);
  }

  const id = 'BR-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  sheet.appendRow([id, data.name]);
  
  return { status: 'success', id };
}

function deleteBranch(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID) || SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Branches');
  if (!sheet) return { status: 'error' };

  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === data.id) {
      sheet.deleteRow(i + 1);
      break;
    }
  }
  return { status: 'success' };
}
