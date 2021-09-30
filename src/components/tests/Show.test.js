import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

const testShow = {
  name: "Schmick and Schmorty",
  summary: "sci-fi stuff",
  seasons: [
    {
      id: 42242,
      name: "Season One, bro",
      episodes: [
        {
          id: 1010,
          image: null,
          name: "pilot",
          season: 1,
          number: 1,
          summary: "pilot, bro",
          runtime: 42,
        },
      ],
    },
  ],
};

test("renders testShow and no selected Season without errors", () => {
  // Arrange
  render(<Show show={testShow} selectedSeason="none" />);
  //   Act
  const showContainer = screen.queryByTestId(/show-container/i);
  //  Assert
  expect(showContainer).toBeInTheDocument();
});

test("renders Loading component when prop show is null", () => {
  // Arrange
  render(<Show show={null} />);
  //   Act
  const loadingComponent = screen.queryByTestId(/loading-container/i);
  //  Assert
  expect(loadingComponent).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  // Arrange
  render(<Show show={testShow} selectedSeason="none" />);
  //   Act
  const options = screen.queryAllByTestId(/season-option/i);
  //  Assert
  expect(options).toHaveLength(1);
});

test("handleSelect is called when a season is selected", () => {
  const mockHandleSelect = jest.fn();
  // Arrange
  render(
    <Show
      show={testShow}
      selectedSeason="none"
      handleSelect={mockHandleSelect}
    />
  );
  //   Act
  userEvent.selectOptions(screen.queryByLabelText(/Select A Season/i), "42242");
  //  Assert
  expect(mockHandleSelect).toHaveBeenCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const { rerender } = render(<Show show={testShow} selectedSeason={0} />);
  // test that episode component does not render when selectedSeason is none
  const episodesContainer = screen.queryByTestId(/episodes-container/i);
  expect(episodesContainer).toBeInTheDocument();
  // renders when selectedSeason has valid value
  rerender(<Show show={testShow} selectedSeason="none" />);
  expect(episodesContainer).not.toBeInTheDocument();
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
