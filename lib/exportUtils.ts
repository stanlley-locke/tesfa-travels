import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Export data to an Excel (.xlsx) file
 * @param data Array of objects to export
 * @param filename Name of the file without extension (e.g., 'bookings_report')
 * @param sheetName Name of the sheet inside the Excel file
 */
export const exportToExcel = (data: any[], filename: string, sheetName: string = 'Report') => {
  if (!data || data.length === 0) {
    console.warn('No data to export to Excel.');
    return;
  }

  // Create a new workbook and add the worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Generate the file and trigger download
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

/**
 * Export data to a PDF file
 * @param headers Array of column titles
 * @param data Array of arrays (each representing a row of data)
 * @param filename Name of the file without extension
 * @param title Title printed at the top of the PDF document
 */
export const exportToPDF = (headers: string[], data: any[][], filename: string, title: string = 'Data Report') => {
  if (!data || data.length === 0) {
    console.warn('No data to export to PDF.');
    return;
  }

  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  
  // Add generated date
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  // Add the table
  autoTable(doc, {
    head: [headers],
    body: data,
    startY: 35,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [107, 123, 101] }, // Use #6b7b65 brand color
  });

  // Save the file
  doc.save(`${filename}.pdf`);
};
