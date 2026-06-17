import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));

describe("ContactSection (lead form)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders name, email, help fields, the honeypot, and the submit button", () => {
    render(<ContactSection />);
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/what do you need help with/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /book my free audit/i })
    ).toBeInTheDocument();

    const honeypot = document.querySelector('input[name="company"]');
    expect(honeypot).toBeTruthy();
    expect(honeypot).toHaveClass("hidden");
  });

  it("blocks submit and shows errors when fields are empty", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactSection />);
    fireEvent.click(
      screen.getByRole("button", { name: /book my free audit/i })
    );
    await waitFor(() =>
      expect(screen.getByText(/please enter your name/i)).toBeInTheDocument()
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts valid data to /api/contact and shows success", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactSection />);
    fireEvent.change(screen.getByPlaceholderText("Your name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/what do you need help with/i),
      {
        target: { value: "We miss calls after hours." },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: /book my free audit/i })
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(opts.method).toBe("POST");
    const body = JSON.parse(opts.body);
    expect(body.name).toBe("Jane Doe");
    expect(body.email).toBe("jane@example.com");
    expect(body.message).toBe("We miss calls after hours.");

    await waitFor(() =>
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    );
  });
});
