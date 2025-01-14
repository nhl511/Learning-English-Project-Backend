const { z } = require("zod");

const curriculumSchema = z.object({
    body: z.object({
        name: z.string()
            .min(1, "Name must be at least 1 characters long")
            .max(64, "Name must be less than or equal 64 characters long"),

    }),
});

module.exports = curriculumSchema