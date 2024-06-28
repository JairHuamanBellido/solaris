import { render, screen } from "@testing-library/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Paragraph,
  ParagraphLead,
  ParagraphMuted,
  ParagraphSmall,
} from "..";

describe("Typography Components", () => {
  it("should render heading 1 correctly", () => {
    // Act
    render(<Heading1>Heading 1</Heading1>);

    // Assert
    expect(screen.getByText("Heading 1")).toBeInTheDocument();
  });

  it("should render heading 2 correctly", () => {
    // Act
    render(<Heading2>Heading 2</Heading2>);

    // Assert
    expect(screen.getByText("Heading 2")).toBeInTheDocument();
  });

  it("should render heading 3 correctly", () => {
    // Act
    render(<Heading3>Heading 3</Heading3>);

    // Assert
    expect(screen.getByText("Heading 3")).toBeInTheDocument();
  });

  it("should render heading 4 correctly", () => {
    // Act
    render(<Heading4>Heading 4</Heading4>);

    // Assert
    expect(screen.getByText("Heading 4")).toBeInTheDocument();
  });

  it("should render heading 5 correctly", () => {
    // Act
    render(<Heading5>Heading 5</Heading5>);

    // Assert
    expect(screen.getByText("Heading 5")).toBeInTheDocument();
  });

  it("should render Paragraph correctly", () => {
    // Act
    render(<Paragraph>Paragraph</Paragraph>);

    // Assert
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
  });

  it("should render Paragraph Lead correctly", () => {
    // Act
    render(<ParagraphLead>Paragraph Lead</ParagraphLead>);

    // Assert
    expect(screen.getByText("Paragraph Lead")).toBeInTheDocument();
  });
  it("should render Paragraph Muted correctly", () => {
    // Act
    render(<ParagraphMuted>Paragraph Muted</ParagraphMuted>);

    // Assert
    expect(screen.getByText("Paragraph Muted")).toBeInTheDocument();
  });

  it("should render Paragraph Small correctly", () => {
    // Act
    render(<ParagraphSmall>Paragraph Small</ParagraphSmall>);

    // Assert
    expect(screen.getByText("Paragraph Small")).toBeInTheDocument();
  });
});
