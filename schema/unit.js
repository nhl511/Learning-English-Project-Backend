const {z} = require("zod");

const unitSchema = z.object({
    body: z.object({
        unitNumber: z.number()
            .min(1, "Unit number must be at least 1")
            .max(99, "Unit number must be less than or equal 99"),
        unitName: z.string()
            .min(1, "Unit name must be at least 1 characters long")
            .max(64, "Unit name must be less than or equal 64 characters long"),
        gradeId: z.string()
            .min(1, "Grade id is required")

    }),
});

module.exports = unitSchema