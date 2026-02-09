import { render } from "@testing-library/react";
import ProgressBar from "../components/ProgressBar.jsx";

test("progress bar shows correct width", () => {
  const { container } = render(<ProgressBar value={5} max={10} />);
  const span = container.querySelector(".progress-bar span");
  expect(span).toBeTruthy();
  expect(span.style.width).toBe("50%");
});
