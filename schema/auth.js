const { z } = require("zod");

const authSchema = z.object({
    body: z.object({
        email: z.string()
            .email("Email is required"),
        password: z.string()
            .min(6, "Password must be at least 6 characters long")
            .max(64, "Password must be less than or equal 64 characters long"),
    }),
});

module.exports = authSchema