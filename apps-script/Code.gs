/**
 * Lloyd White campaign site — volunteer / yard-sign intake backend.
 *
 * Lives in a Google Apps Script project bound to a Google Sheet. Receives
 * POSTs from volunteer.html, appends a row to the matching tab, and emails
 * a notification for every submission.
 *
 * Setup instructions: see SETUP.md in this folder.
 */

// Where new-submission notification emails are sent. Change if needed.
var NOTIFY_EMAIL = 'alwhite524@gmail.com';

var VOLUNTEER_SHEET = 'Volunteers';
var VOLUNTEER_HEADERS = ['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'ZIP', 'Interests'];

var YARD_SIGN_SHEET = 'Yard Signs';
var YARD_SIGN_HEADERS = ['Timestamp', 'First Name', 'Last Name', 'Address', 'Phone/Email', 'Quantity', 'Notes'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.formType === 'yard-sign') {
      handleYardSign(data);
    } else if (data.formType === 'volunteer') {
      handleVolunteer(data);
    } else {
      throw new Error('Unknown formType: ' + data.formType);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the deployed URL in a browser to sanity-check it's live.
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Apps Script endpoint is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleVolunteer(data) {
  var sheet = getOrCreateSheet(VOLUNTEER_SHEET, VOLUNTEER_HEADERS);
  var timestamp = new Date();
  var interests = Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || '');

  sheet.appendRow([
    timestamp,
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    data.phone || '',
    data.zip || '',
    interests
  ]);

  var name = ((data.firstName || '') + ' ' + (data.lastName || '')).trim();
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New volunteer sign-up: ' + (name || 'unknown name'),
    body: [
      'New volunteer sign-up from the campaign site:',
      '',
      'Name: ' + name,
      'Email: ' + (data.email || ''),
      'Phone: ' + (data.phone || ''),
      'ZIP: ' + (data.zip || ''),
      'Interested in: ' + (interests || 'none selected'),
      '',
      'Submitted: ' + timestamp
    ].join('\n')
  });
}

function handleYardSign(data) {
  var sheet = getOrCreateSheet(YARD_SIGN_SHEET, YARD_SIGN_HEADERS);
  var timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.firstName || '',
    data.lastName || '',
    data.address || '',
    data.contact || '',
    data.quantity || '',
    data.notes || ''
  ]);

  var name = ((data.firstName || '') + ' ' + (data.lastName || '')).trim();
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New yard sign request: ' + (name || 'unknown name'),
    body: [
      'New yard sign request from the campaign site:',
      '',
      'Name: ' + name,
      'Delivery address: ' + (data.address || ''),
      'Contact: ' + (data.contact || ''),
      'Quantity: ' + (data.quantity || ''),
      'Notes: ' + (data.notes || 'none'),
      '',
      'Submitted: ' + timestamp
    ].join('\n')
  });
}

function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}
