import { z } from "zod";

export const RawMaterialValidator = z.object({
    sustainable_material_usage: z.string().transform((value) => parseFloat(value)),
    raw_material_traceability: z.string().transform((value) => value === 'true'),
    conflict_materials_policy: z.string().transform((value) => value === 'true'),
    raw_material_reduction_initiatives: z.string().transform((value) => value === 'true'),
    ds: z.string().default(() => {
      const date = new Date();
      return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    }),
    tenantId: z.string().default('temporary_tenant_id')
});
