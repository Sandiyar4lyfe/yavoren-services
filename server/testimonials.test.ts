import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock notification so we don't hit the real service
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock the DB module so tests run without a real MySQL connection
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockResolvedValue([
            {
              id: 1,
              name: "Ahmad bin Ali",
              role: "Operations Manager",
              company: "Longterm Distribution Sdn. Bhd.",
              industry: "Warehousing & Distribution",
              quote: "YAVOREN delivered exactly what we needed, on time and professionally.",
              rating: 5,
              status: "approved",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]),
        }),
      }),
    }),
  }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("testimonials.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits a valid testimonial and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.testimonials.submit({
      name: "Ahmad bin Ali",
      role: "Operations Manager",
      company: "Longterm Distribution Sdn. Bhd.",
      industry: "Warehousing & Distribution",
      quote: "YAVOREN delivered exactly what we needed, on time and professionally managed.",
      rating: 5,
    });

    expect(result).toEqual({ success: true });
  });

  it("notifies the owner on a new testimonial submission", async () => {
    const { notifyOwner } = await import("./_core/notification");
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.testimonials.submit({
      name: "Siti Rahimah",
      role: "Plant Manager",
      company: "Nulatex Sdn. Bhd.",
      industry: "Electronics Manufacturing",
      quote: "Excellent workforce quality and professional management throughout the engagement.",
      rating: 5,
    });

    expect(notifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("Siti Rahimah"),
        content: expect.stringContaining("Nulatex Sdn. Bhd."),
      })
    );
  });

  it("rejects a testimonial with a quote that is too short", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.testimonials.submit({
        name: "Test User",
        role: "Manager",
        company: "Test Co",
        industry: "Manufacturing",
        quote: "Too short.",
        rating: 5,
      })
    ).rejects.toThrow();
  });

  it("rejects a testimonial with an empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.testimonials.submit({
        name: "",
        role: "Manager",
        company: "Test Co",
        industry: "Manufacturing",
        quote: "This is a valid testimonial text that is long enough to pass validation.",
        rating: 5,
      })
    ).rejects.toThrow();
  });

  it("rejects a rating outside the 1–5 range", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.testimonials.submit({
        name: "Test User",
        role: "Manager",
        company: "Test Co",
        industry: "Manufacturing",
        quote: "This is a valid testimonial text that is long enough to pass validation.",
        rating: 6,
      })
    ).rejects.toThrow();
  });
});

describe("testimonials.getApproved", () => {
  it("returns an array of approved testimonials", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.testimonials.getApproved();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("quote");
    expect(result[0]).toHaveProperty("rating");
    expect(result[0].status).toBe("approved");
  });

  it("returns an empty array when database is unavailable", async () => {
    // Override getDb to return null for this test
    const { getDb } = await import("./db");
    vi.mocked(getDb).mockResolvedValueOnce(null);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.testimonials.getApproved();
    expect(result).toEqual([]);
  });
});
