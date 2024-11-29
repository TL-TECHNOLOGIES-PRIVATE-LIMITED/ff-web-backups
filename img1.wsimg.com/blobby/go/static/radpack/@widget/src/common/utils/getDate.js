const FIXED_TIME = 1495548900000; // Tue May 23 2017 07:15:00 GMT-0700

// Mock Date for VTX
export default function getDate() {
  return typeof SDK !== 'undefined' && 'VTX' in SDK ? new Date(FIXED_TIME) : new Date();
}
