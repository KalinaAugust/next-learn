import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "../Header";

// Mock next/navigation
const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders all navigation links", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Take Survey")).toBeInTheDocument();
    expect(screen.getByText("My Results")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<Header />);

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Take Survey").closest("a")).toHaveAttribute("href", "/survey");
    expect(screen.getByText("My Results").closest("a")).toHaveAttribute("href", "/recommendations");
    expect(screen.getByText("About").closest("a")).toHaveAttribute("href", "/about");
  });

  it("applies active styles to the current route link", () => {
    mockUsePathname.mockReturnValue("/survey");
    render(<Header />);

    const surveyLink = screen.getByText("Take Survey").closest("a");
    const homeLink = screen.getByText("Home").closest("a");

    expect(surveyLink?.className).toContain("underline");
    expect(homeLink?.className).not.toContain("underline");
  });

  it("applies inactive styles to non-current route links", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Header />);

    const surveyLink = screen.getByText("Take Survey").closest("a");
    const aboutLink = screen.getByText("About").closest("a");

    expect(surveyLink?.className).toContain("text-black/50");
    expect(aboutLink?.className).toContain("text-black/50");
  });

  it("renders a header element", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders a nav element", () => {
    render(<Header />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
