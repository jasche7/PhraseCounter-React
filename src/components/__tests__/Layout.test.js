import React, { useState } from "react";
import Layout from "../Layout";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(`The Layout component`, () => {
  it(`modifies the Display component upon submitting text to the Textbox component`, () => {
    const testText = "Hello World!";
    const { getByLabelText, getByText } = render(<Layout />);
    const text = getByLabelText("Text");
    const submit = getByText("Submit");

    userEvent.type(text, testText);
    userEvent.click(submit);
    const display = getByLabelText("Display Text");
    expect(display.textContent).toBe(testText);
  });
});
