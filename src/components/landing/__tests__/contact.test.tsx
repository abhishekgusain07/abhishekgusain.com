import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

// react-hot-toast renders side-effects we don't need to assert on here.
vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

describe("ContactSection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all fields, the honeypot, and the submit button", () => {
    render(<ContactSection />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/what's this about/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/tell me a bit more/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send it/i })
    ).toBeInTheDocument();

    // Honeypot exists but is hidden from users.
    const honeypot = document.querySelector('input[name="company"]');
    expect(honeypot).toBeTruthy();
    expect(honeypot).toHaveClass("hidden");
  });

  it("posts the form to /api/contact on submit", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactSection />);
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/tell me a bit more/i), {
      target: { value: "We miss calls after hours." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send it/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(opts.method).toBe("POST");
    const body = JSON.parse(opts.body);
    expect(body.name).toBe("Jane Doe");
    expect(body.email).toBe("jane@example.com");
  });
});
