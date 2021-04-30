import Textbox from "../Textbox";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(`The Textbox component`, () => {
  it(`includes all of its form inputs`, () => {
    const { queryByLabelText } = render(<Textbox />);

    const text = queryByLabelText(/Text/);
    expect(text).toBeTruthy();
    expect(text.textContent).toBe("");

    const min = queryByLabelText(/Min Occurrences:/);
    expect(min).toBeTruthy();

    const max = queryByLabelText(/Max Phrase Length:/);
    expect(max).toBeTruthy();

    const caseSensitive = queryByLabelText(/Case Sensitive/);
    expect(caseSensitive).toBeTruthy();
    expect(caseSensitive.checked).toEqual(false);

    const ignoresPunctuation = queryByLabelText(/Ignore Punctuation/);
    expect(ignoresPunctuation).toBeTruthy();
    expect(ignoresPunctuation.checked).toEqual(false);
  });

  it(`can submit by clicking the Submit button`, async () => {
    const handleClick = jest.fn();
    const setRequestBody = jest.fn();

    render(
      <Textbox clickFunction={handleClick} setRequestBody={setRequestBody} />
    );
    userEvent.click(screen.getByText(/Submit/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(setRequestBody).toHaveBeenCalledTimes(1);
  });
});
