import Display from "../Display";
import { render } from "@testing-library/react";

describe(`The Display component`, () => {
  it(`starts out as blank`, () => {
    const { getByLabelText } = render(<Display />);

    const display = getByLabelText("Display Text");
    expect(display.textContent).toBe("");
  });

  it(`displays text from in props.text`, () => {
    const testText = "Hello World!";
    const { getByLabelText } = render(<Display text={testText} />);

    const display = getByLabelText("Display Text");
    expect(display.textContent).toBe(testText);
  });
});
