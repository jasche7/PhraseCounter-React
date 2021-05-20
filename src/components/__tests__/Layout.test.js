import Layout from "../Layout";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as phraseService from "../Phrases/PhraseService.js";

jest.mock("../Phrases/PhraseService.js");

describe(`The Layout component`, () => {
  it(`modifies the Display component upon submitting text to the Textbox component`, async () => {
    phraseService.phraseRequest.mockResolvedValue(Promise.resolve());

    const testText = "Hello World!";
    const { getByLabelText, getByText } = render(<Layout />);
    const text = getByLabelText("Text");
    const submit = getByText("Submit");

    userEvent.type(text, testText);
    userEvent.click(submit);
    const display = getByLabelText("Display Text");

    await waitFor(() => {
      expect(display.textContent).toBe(testText);
    });
  });
});
