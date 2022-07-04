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

  describe("Cuando la query se esta ejecutando", () => {
  it("debería renderizar correctamente el mensaje de cargando", async () => {
    render(<Cita/>)
    const button = screen.getByText("Obtener cita aleatoria");
    userEvent.click(button)
    await waitFor(() => {
     const loading = screen.getByText("CARGANDO...");   
      expect(loading).toBeInTheDocument();
    });
  });
})

describe("Cuando escribimos el nombre de un Simpson en el input", () => {
  it("debería renderizar el botón de 'Obtener cita' en lugar de el botón de 'Obtener cita aleatoria'", async () => {
    render(<Cita/>)
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor")
    userEvent.type(input, "Marge");
    await waitFor(() => {
      const buttonCita = screen.getByText("Obtener Cita");;
      expect(buttonCita).toBeInTheDocument();
    });
    await waitFor(() => {
      const buttonCitaAleatoria = screen.queryByText("Obtener cita aleatoria");
      expect(buttonCitaAleatoria).not.toBeInTheDocument();
    });
  });

  it("debería renderizar una cita del Simpson ingresado (Marge)", async () => {
    render(<Cita/>)
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor")
    userEvent.type(input, "Marge");
    const buttonCita = await screen.findByText("Obtener Cita");
    userEvent.click(buttonCita)
    await waitFor(() => {
      const autor = screen.getByTestId("author")   
       expect(autor).toEqual("Marge Simpson");
     });
  });
})

describe("Cuando escribimos números en el input", () => {
  it("debería renderizar un mensaje de error", async () => {
    render(<Cita/>)
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor")
    userEvent.type(input, "5678");
    const buttonCita = await screen.findByText("Obtener Cita");
    userEvent.click(buttonCita)
    await waitFor(() => {
      const mensajeError = screen.getByText("Por favor ingrese un nombre válido")   
       expect(mensajeError).toBeInTheDocument();
     });
  });
})

/*
  it("Debería renderizar correctamente una cita random", async () => {
    render(<Cita/>)
    const button = screen.getByText("Obtener cita aleatoria");
    userEvent.click(button)
    await waitFor(() => {
     const cita = screen.getByText("Ahh! Sweet liquor eases the pain.");   
      expect(cita).toBeInTheDocument();
    });
  });*/
})

