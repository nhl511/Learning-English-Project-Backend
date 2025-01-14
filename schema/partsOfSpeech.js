const { z } = require("zod");

const partsOfSpeechSchema = z.object({
    body: z.object({
        name: z.string()
            .min(1, "Name must be at least 1 characters long")
            .max(20, "Name must be less than or equal 20 characters long"),

    }),
});

module.exports = partsOfSpeechSchema