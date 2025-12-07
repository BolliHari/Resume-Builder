export const resumeSchema = {
    type: "object",
    properties: {
        professional_summary: { type: "string" },
        skills: {
            type: "array",
            items: { type: "string" }
        },
        personal_info: {
            type: "object",
            properties: {
                full_name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                location: { type: "string" },
                linkedin: { type: "string" },
                website: { type: "string" },
                profession: { type: "string" },
                image: { type: "string" }
            },
            required: ["full_name", "email"] // Optional: add required fields
        },
        experience: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    company: { type: "string" },
                    position: { type: "string" },
                    start_date: { type: "string" },
                    end_date: { type: "string" },
                    description: { type: "string" },
                    is_current: { type: "boolean" }
                }
            }
        },
        education: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    institution: { type: "string" },
                    degree: { type: "string" },
                    field: { type: "string" },
                    graduation_date: { type: "string" },
                    gpa: { type: "string" }
                }
            }
        },
        project: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    type: { type: "string" },
                    description: { type: "string" }
                }
            }
        }
    },
    // Specify the top-level fields that must be present
    required: ["personal_info", "experience", "education"] 
};