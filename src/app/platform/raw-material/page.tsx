// import DynamicForm, { Columns } from "@/components/DynamicForm";
// import prisma from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import { z } from "zod";

// const RawMaterialValidator = z.object({
//     sustainable_material_usage: z.string().transform((value) => parseFloat(value)),
//     raw_material_traceability: z.string().transform((value) => value === 'true'),
//     conflict_materials_policy: z.string().transform((value) => value === 'true'),
//     raw_material_reduction_initiatives: z.string().transform((value) => value === 'true'),
//     ds: z.string().default(() => {
//       const date = new Date();
//       return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]; // Adds time to the date
//     }),
//     tenantId: z.string().default('temporary_tenant_id')
//   });
  
// export default function Page() {

//   const columns: Columns = {
//     'sustainable_material_usage': {
//         type: 'number',
//         label: 'Sustainable Material Usage',
//         description: 'Percentage of raw materials used that are sourced from sustainable or certified sources (%)',
//     },
//     'raw_material_traceability': {
//         type: 'boolean',
//         label: 'Raw Material Traceability',
//         description: 'Indicates whether the organization has systems in place to trace the origin of its raw materials (true/false)',
//     },
//     'conflict_materials_policy': {
//         type: 'boolean',
//         label: 'Conflict Materials Policy',
//         description: 'Indicates whether the organization has a policy to avoid the use of conflict materials (true/false)',
//     },
//     'raw_material_reduction_initiatives': {
//         type: 'boolean',
//         label: 'Raw Material Reduction Initiatives',
//         description: 'Indicates whether the organization has initiatives to reduce raw material use through recycling or other means (true/false)',
//     },
//   }

//   const aCallbackFunction =  async (formData: Object) => {
//     "use server"
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Access the environment variable
//     const result = RawMaterialValidator.safeParse(formData);

//         if (!result.success) {
//             console.error("Validation failed", result.error);
//             return;
//         }

//         try {
//             const newEntry = await prisma.rawMaterialSustainabilityData.create({
//                 data: result.data,
//             });

//             revalidatePath("/")
//         } catch (e) {
//             console.error("Database submission error", e);
//         }

//     console.log(formData);
//   }

//   return(
//     <>
//       <DynamicForm columns={columns} callback={aCallbackFunction}/>
//     </>
//   )
// };

// pages/yourPageComponent.tsx

"use client";

import DynamicForm, { Columns } from "@/components/DynamicForm";
import SubmitRawMaterialData from "@/components/SubmitRawMaterialData";
import { useRouter } from "next/navigation";


const columns: Columns = {
    'sustainable_material_usage': {
        type: 'number',
        label: 'Sustainable Material Usage',
        description: 'Percentage of raw materials used that are sourced from sustainable or certified sources (%)',
    },
    'raw_material_traceability': {
        type: 'boolean',
        label: 'Raw Material Traceability',
        description: 'Indicates whether the organization has systems in place to trace the origin of its raw materials (true/false)',
    },
    'conflict_materials_policy': {
        type: 'boolean',
        label: 'Conflict Materials Policy',
        description: 'Indicates whether the organization has a policy to avoid the use of conflict materials (true/false)',
    },
    'raw_material_reduction_initiatives': {
        type: 'boolean',
        label: 'Raw Material Reduction Initiatives',
        description: 'Indicates whether the organization has initiatives to reduce raw material use through recycling or other means (true/false)',
    },
};

export default function Page() {
    const router = useRouter();

    const aCallbackFunction = async (formData: Object) => {
        try {
            await SubmitRawMaterialData(formData);
            router.push("/"); // Navigate to home page upon successful submission
        } catch (e) {
            console.error(e); // Handle errors (e.g., validation or database errors)
        }
    };

    return (
        <>
            <DynamicForm columns={columns} callback={aCallbackFunction} />
        </>
    );
}
