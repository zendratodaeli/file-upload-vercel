"use client"

import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Define the structure of a single data item
interface DataItem {
  ds: string; // Assuming 'ds' is a date as a string
  sustainable_material_usage: number;
  raw_material_traceability: boolean;
  conflict_materials_policy: boolean;
  raw_material_reduction_initiatives: boolean;
}

// Props for the GeneratePdf component
interface GeneratePdfProps {
  jsonData: DataItem[];
}

const GeneratePdf: React.FC<GeneratePdfProps> = ({ jsonData }) => {
  const generate = () => {
    const doc = new jsPDF();

    // Transform jsonData to the format expected by autoTable
    const body: (string | number)[][] = jsonData.map((data) => [
      data.ds,
      data.sustainable_material_usage.toString(),
      data.raw_material_traceability ? 'Yes' : 'No',
      data.conflict_materials_policy ? 'Yes' : 'No',
      data.raw_material_reduction_initiatives ? 'Yes' : 'No',
    ]);

    doc.autoTable({
      head: [['Date', 'Sustainable Material Usage', 'Raw Material Traceability', 'Conflict Materials Policy', 'Raw Material Reduction Initiatives']],
      body: body,
    });

    // Save the PDF or open it in a new window
    doc.save('report.pdf');
  };

  return (
    <div>
      <button onClick={generate} className='btn bg-teal-800 text-white rounded-md'>Generate PDF</button>
    </div>
  );
};

export default GeneratePdf;
