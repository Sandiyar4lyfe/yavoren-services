import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

const YAVOREN_SYSTEM_PROMPT = `You are a helpful assistant for YAVOREN Services Sdn. Bhd., a professional workforce solutions company based in Malaysia.

About YAVOREN Services:
- Founded in 2022 as Skill Birds Services, now operating as YAVOREN Services Sdn. Bhd.
- Specializes in end-to-end workforce solutions: recruitment, training, and placement
- Serves both short-term and long-term workforce assignments
- Has successfully deployed 500+ workers across 8+ active projects

Services offered:
1. Temporary Staffing - Short-term workers for seasonal or project-based needs
2. Permanent Recruitment - Finding full-time employees for client companies
3. Skilled Labour Supply - Specialized professionals (electricians, plumbers, IT experts)
4. Unskilled Labour Supply - General workers for basic tasks
5. Workforce Management - Payroll, compliance, and employee benefits management
6. On-Site Supervision - Managing workforce directly at client locations
7. Training Services - Preparing workers with certifications and skills
8. Labor Accommodation - Accommodation management for client workers

Industries served: Manufacturing, Warehousing & Distribution, Logistics & Supply Chain, Telecommunications Infrastructure, Electronics Manufacturing, Commercial Buildings

Standards & Certifications:
- RBA Approved (Manpower Supply in Reputable Clients)
- Qualified ELAVETE ERSA (Irqa) audit clients
- Qualified ISO9001 Audit client
- Comply JTK audits

Key differentiators:
- Timely Deployment (on-time delivery, emergency support)
- Quality of Workforce (skilled, verified workers with background checks and replacement guarantee)
- High Work Performance (productivity and work ethics)
- Continuous Support (ongoing assistance and regular monitoring)

Contact: info@yavoren.com

Be helpful, professional, and concise. If asked about pricing or specific availability, suggest the user contact YAVOREN directly via the contact form or email. Always respond in the same language the user writes in.`;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(({ ctx }) => ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  chat: router({
    send: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: YAVOREN_SYSTEM_PROMPT },
            ...input.messages,
          ],
        });

        const assistantMessage =
          (response.choices as Array<{ message: { content: string } }>)?.[0]?.message?.content ??
          "I'm sorry, I couldn't process your request. Please try again.";

        return { content: assistantMessage };
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required").max(100),
          email: z.string().email("Invalid email address").max(320),
          phone: z.string().max(20).optional(),
          company: z.string().max(100).optional(),
          service: z.string().max(100).optional(),
          message: z.string().min(10, "Message must be at least 10 characters").max(2000),
        })
      )
      .mutation(async ({ input }) => {
        const lines: string[] = [
          `Name: ${input.name}`,
          `Email: ${input.email}`,
        ];
        if (input.phone) lines.push(`Phone: ${input.phone}`);
        if (input.company) lines.push(`Company: ${input.company}`);
        if (input.service) lines.push(`Service Interest: ${input.service}`);
        lines.push("", "Message:", input.message);

        await notifyOwner({
          title: `New Contact Form Submission from ${input.name}`,
          content: lines.join("\n"),
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
