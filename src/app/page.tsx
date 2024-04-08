import { getCurrentUser } from '@/lib/session'
import { list } from '@vercel/blob';
import Link from 'next/link'
import prisma from '@/lib/db'
import GeneratePdf from '@/components/GeneratePdf';

async function Page() {
  const user = await getCurrentUser();
  const response = await list();
  const responseInputManual = await prisma.rawMaterialSustainabilityData.findMany()  
  
  return (
    <div className="space-x-2">
      Hello
      <Link href="/components/client-action">Upload</Link>
      <Link href="/platform/raw-material">Entry Data</Link>
      <Link href="/api/auth/signin" className="text-black hover:underline">
          Login
      </Link>
      
      <div className="m-5">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Tenant ID</th>
              <th>Sustainable Material Usage (%)</th>
              <th>Raw Material Traceability</th>
              <th>Conflict Materials Policy</th>
              <th>Raw Material Reduction Initiatives</th>
            </tr>
          </thead>
          <tbody>
            {responseInputManual.map((data, index) => (
              <tr key={index}> {/* Use index as a key for simplicity, but prefer unique ids if available */}
                <td>{index + 1}</td>
                <td>{data.ds}</td>
                <td>{data.tenantId}</td>
                <td>{data.sustainable_material_usage}</td>
                <td>{data.raw_material_traceability ? 'Yes' : 'No'}</td>
                <td>{data.conflict_materials_policy ? 'Yes' : 'No'}</td>
                <td>{data.raw_material_reduction_initiatives ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <GeneratePdf jsonData={responseInputManual} />

      {response.blobs.map((blob) => (
        // eslint-disable-next-line react/jsx-key
        <div className='flex flex-col' key={blob.pathname}>
          <a href={blob.downloadUrl}>
            {blob.pathname}
          </a>
        </div>
      ))}
    </div>
  )
}

export default Page
