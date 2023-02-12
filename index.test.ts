import emotionToVanillaExtract from ".";

describe("emotion-to-vanilla-extract", () => {
  it("Parses a single style rule", async () => {
    expect(
      emotionToVanillaExtract({
        border: "1px solid red",
      })
    ).toMatchInlineSnapshot(`
      {
        "border": "1px solid red",
      }
    `);
  });
  it("Parses shorthands in the same order", async () => {
    expect(
      emotionToVanillaExtract({
        borderRight: "none",
        borderTop: "none",
        border: "1px solid red",
        borderLeft: "none",
        borderBottom: "none",
      })
    ).toMatchInlineSnapshot(`
      {
        "borderRight": "none",
        "borderTop": "none",
        "border": "1px solid red",
        "borderLeft": "none",
        "borderBottom": "none",
      }
    `);
  });
  it("Parses simple pseudo selectors", async () => {
    expect(
      emotionToVanillaExtract({
        ":hover": {
          color: "pink",
        },
        ":first-of-type": {
          color: "blue",
        },
        "::before": {
          content: "",
        },
      })
    ).toMatchInlineSnapshot(`
      {
        ":hover": {
          "color": "pink",
        },
        ":first-of-type": {
          "color": "blue",
        },
        "::before": {
          "content": "",
        },
      }
    `);
  });
  it("Parses complex selectors", async () => {
    expect(
      emotionToVanillaExtract({
        "&:hover:not(:active)": {
          border: "2px solid aquamarine",
        },
        "nav li > &": {
          textDecoration: "underline",
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "selectors": {
          "&:hover:not(:active)": {
            "border": "2px solid aquamarine",
          },
          "nav li > &": {
            "textDecoration": "underline",
          },
        },
      }
    `);
  });
  it("Parses nested complex selectors", async () => {
    expect(
      emotionToVanillaExtract({
        "&:hover": {
          border: "2px solid red",
          "&:not(:active)": {
            border: "2px solid aquamarine",
            "[data-mode='dark'] &": {
              border: "2px solid white",
            },
          },
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "selectors": {
          "&:hover": {
            "border": "2px solid red",
          },
          "&:not(:active):hover": {
            "border": "2px solid aquamarine",
          },
          "[data-mode='dark'] &:not(:active):hover": {
            "border": "2px solid white",
          },
        },
      }
    `);
  });
});
