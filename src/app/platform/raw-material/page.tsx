"use client";

import DynamicForm, { Columns } from "@/components/DynamicForm";
import SubmitRawMaterialData from "@/components/SubmitRawMaterialData";
import { revalidatePath } from "next/cache";
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
            revalidatePath("/")
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
