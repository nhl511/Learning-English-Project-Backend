const {z} = require("zod");

const vocabularySchema = z.object({
    body: z.object({
        word: z.string()
            .min(1, "Word must be at least 1 characters long")
            .max(100, "Word must be less than or equal 100 characters long"),
        definition: z.string()
            .min(1, "Definition must be at least 1 characters long")
            .max(100, "Definition must be less than or equal 100 characters long"),
        transcription: z.string()
            .max(100, "Transcription must be less than or equal 100 characters long"),
        notes: z.string()
            .max(255, "Notes must be less than or equal 100 characters long")

    }),
});

module.exports = vocabularySchema