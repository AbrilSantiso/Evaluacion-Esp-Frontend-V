import { screen, waitFor } from "@testing-library/react";
import { generateHandlers } from "../../test/mocks/quote";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event"
import { render } from "../../test/test-utils";
import Cita from "./Cita";

const { handlers, margeQuote, randomQuote } = generateHandlers();
export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cita", () => {
  it("should render properly a random quote", async () => {
    render(<Cita/>)
    const button = screen.getByText("Obtener cita aleatoria");
    userEvent.click(button)
    await waitFor(() => {
     const cita = screen.getByText("Ahh! Sweet liquor eases the pain.");   
      expect(cita).toBeInTheDocument();
    });
  });
})
/*
  it("should set the status to true when there's an error", async () => {
    const hook = renderHook(() =>
      useApi("https://rickandmortyapi.com/api/character?error=true")
    );

    await waitFor(() => {
      expect(hook.result.current.error).toBe(true);
    });
  });

  it("should store the loading state properly", async () => {
    const hook = renderHook(() =>
      useApi("https://rickandmortyapi.com/api/character")
    );

    expect(hook.result.current.loading).toBe(true);
    await waitFor(() => {
      expect(hook.result.current.loading).toBe(false);
    });
  });
});
*/