import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import useConditionalHook from "../index";

describe("useConditionalHook", () => {
  const consoleWarnSpy = vi.spyOn(console, "warn");

  beforeEach(() => {
    consoleWarnSpy.mockClear();
  });

  it("should return the result of the matching hook for string conditions", () => {
    const hookMap = {
      admin: () => "admin-permissions",
      user: () => "user-permissions",
      guest: () => "guest-permissions",
    } as const;

    const { result } = renderHook(() => useConditionalHook("admin", hookMap));
    expect(result.current).toBe("admin-permissions");
  });

  it("should return the result of the matching hook for boolean conditions", () => {
    const hookMap = {
      true: () => "new-ui",
      false: () => "legacy-ui",
    } as const;

    const { result } = renderHook(() => useConditionalHook(true, hookMap));
    expect(result.current).toBe("new-ui");
  });

  it("should return the result of the matching hook for numeric conditions", () => {
    const hookMap = {
      200: () => "success-data",
      404: () => "not-found-data",
      500: () => "error-data",
    } as const;

    const { result } = renderHook(() => useConditionalHook(404, hookMap));
    expect(result.current).toBe("not-found-data");
  });

  it("should call all hooks unconditionally", () => {
    const adminHook = vi.fn(() => "admin-permissions");
    const userHook = vi.fn(() => "user-permissions");
    const guestHook = vi.fn(() => "guest-permissions");

    const hookMap = {
      admin: adminHook,
      user: userHook,
      guest: guestHook,
    } as const;

    renderHook(() => useConditionalHook("admin", hookMap));

    expect(adminHook).toHaveBeenCalled();
    expect(userHook).toHaveBeenCalled();
    expect(guestHook).toHaveBeenCalled();
  });

  it("should use fallback hook when condition has no match", () => {
    const hookMap = {
      admin: () => "admin-permissions",
      user: () => "user-permissions",
    } as const;

    const fallbackHook = (): string => "default-permissions";

    const { result } = renderHook(() =>
      useConditionalHook("guest" as "admin" | "user", hookMap, fallbackHook)
    );

    expect(result.current).toBe("default-permissions");
  });

  it("should warn in development when no match and no fallback", () => {
    const hookMap = {
      admin: () => "admin-permissions",
      user: () => "user-permissions",
    } as const;

    renderHook(() => useConditionalHook("guest" as "admin" | "user", hookMap));

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("No matching hook found for condition \"guest\"")
    );
  });

  it("should return first hook result as fallback when no match and no fallback", () => {
    const hookMap = {
      admin: () => "admin-permissions",
      user: () => "user-permissions",
    } as const;

    const { result } = renderHook(() => useConditionalHook("guest" as "admin" | "user", hookMap));
    expect(result.current).toBe("admin-permissions");
  });

  it("should maintain type safety across different hook results", () => {
    type UserData = { id: number; name: string };

    const hookMap = {
      admin: () => ({ id: 1, name: "Admin" } as UserData),
      user: () => ({ id: 2, name: "User" } as UserData),
    } as const;

    const { result } = renderHook(() => useConditionalHook("admin", hookMap));
    expect(result.current).toEqual({ id: 1, name: "Admin" });
  });
}); 