const { z } = require("zod");

const gradeSchema = z.object({
    body: z.object({
        gradeNumber: z.number()
            .min(1, "Grade number must be at least 1")
            .max(12, "Grade number must be less than or equal 12"),

        curriculumId: z.string()
            .min(1, "Curriculum id is required")

    }),
});

module.exports = gradeSchema