const { z } = require("zod");

const topicSchema = z.object({
    body: z.object({
        title: z.string()
            .min(1, "Title must be at least 1 characters long")
            .max(100, "Title must be less than or equal 100 characters long"),

    }),
});

module.exports = topicSchema