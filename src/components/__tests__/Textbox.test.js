import Textbox from "../Textbox";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(`The Textbox component`, () => {
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

  it(`sees what is being typed into the textbox`, () => {
    render(<Textbox />);
    userEvent.type(screen.getByLabelText(/Text/i), "Hello,{enter}World!");
    expect(screen.getByLabelText(/Text/i)).toHaveValue("Hello,\nWorld!");
  });
});
