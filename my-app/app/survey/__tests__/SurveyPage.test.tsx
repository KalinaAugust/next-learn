import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SurveyPage from "../page";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("SurveyPage", () => {
  beforeEach(() => {
    mockPush.mockClear();
    sessionStorage.clear();
  });

  it("renders all form fields", () => {
    render(<SurveyPage />);

    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Biological sex")).toBeInTheDocument();
    expect(screen.getByLabelText("Height (cm)")).toBeInTheDocument();
    expect(screen.getByLabelText("Weight (kg)")).toBeInTheDocument();
    expect(screen.getByLabelText("Activity level")).toBeInTheDocument();
    expect(screen.getByLabelText("Do you smoke?")).toBeInTheDocument();
    expect(screen.getByLabelText("Average sleep (hours/night)")).toBeInTheDocument();
    expect(screen.getByLabelText("Primary health concern")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<SurveyPage />);
    expect(screen.getByRole("button", { name: /get my recommendations/i })).toBeInTheDocument();
  });

  it("renders the page heading", () => {
    render(<SurveyPage />);
    expect(screen.getByRole("heading", { name: /health survey/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitted with empty fields", () => {
    render(<SurveyPage />);
    fireEvent.submit(screen.getByRole("button", { name: /get my recommendations/i }).closest("form")!);

    expect(screen.getByText(/please enter a valid age/i)).toBeInTheDocument();
    expect(screen.getByText(/please select your biological sex/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid height/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid weight/i)).toBeInTheDocument();
  });

  it("does not navigate when form is invalid", () => {
    render(<SurveyPage />);
    fireEvent.submit(screen.getByRole("button", { name: /get my recommendations/i }).closest("form")!);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("writes to sessionStorage and navigates on valid submit", () => {
    render(<SurveyPage />);

    fireEvent.change(screen.getByLabelText("Age"), { target: { value: "30" } });
    fireEvent.change(screen.getByLabelText("Biological sex"), { target: { value: "female" } });
    fireEvent.change(screen.getByLabelText("Height (cm)"), { target: { value: "165" } });
    fireEvent.change(screen.getByLabelText("Weight (kg)"), { target: { value: "65" } });
    fireEvent.change(screen.getByLabelText("Activity level"), { target: { value: "moderate" } });
    fireEvent.change(screen.getByLabelText("Average sleep (hours/night)"), { target: { value: "8" } });
    fireEvent.change(screen.getByLabelText("Primary health concern"), { target: { value: "general" } });

    fireEvent.submit(screen.getByRole("button", { name: /get my recommendations/i }).closest("form")!);

    const stored = sessionStorage.getItem("healthSurveyData");
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored!);
    expect(parsed.age).toBe(30);
    expect(parsed.sex).toBe("female");

    expect(mockPush).toHaveBeenCalledWith("/recommendations");
  });
});
