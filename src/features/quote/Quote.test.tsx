/** @jest-environment jsdom */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { generateHandlers } from "../../test/mocks/quote";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { render } from "../../test/test-utils";
import Cita from "./Cita";
import { MENSAJE_CARGANDO, NOMBRE_INVALIDO, NO_ENCONTRADO } from "./constants";

const { handlers, margeQuote, randomQuote } = generateHandlers();
export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cita", () => {
  describe("Cuando la query se esta ejecutando", () => {
    it("debería renderizar correctamente el mensaje de cargando", async () => {
      render(<Cita />);
      const button = screen.getByText("Obtener cita aleatoria");
      userEvent.click(button);
      await waitFor(() => {
        const loading = screen.getByText(MENSAJE_CARGANDO);
        expect(loading).toBeInTheDocument();
      });
    });
  });

  describe("Cuando clickeamos el botón de Obtener cita aleatoria", ()=>{
    it("Debería renderizar correctamente una cita random", async () => {
      render(<Cita/>)
      const button = screen.getByText("Obtener cita aleatoria");
      userEvent.click(button)
      const citaRandom = randomQuote[0].quote;
      await waitFor(() => {
       const cita = screen.getByText(citaRandom);   
        expect(cita).toBeInTheDocument();
      });
    });
  })

  describe("Cuando escribimos el nombre de un Simpson en el input", () => {
    it("debería renderizar el botón de 'Obtener cita' en lugar de el botón de 'Obtener cita aleatoria'", async () => {
      render(<Cita />);
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      userEvent.type(input, "Marge");
      await waitFor(() => {
        const buttonCita = screen.getByText("Obtener Cita");
        expect(buttonCita).toBeInTheDocument();
      });
      await waitFor(() => {
        const buttonCitaAleatoria = screen.queryByText(
          "Obtener cita aleatoria"
        );
        expect(buttonCitaAleatoria).not.toBeInTheDocument();
      });
    });

    it("debería renderizar una cita del Simpson ingresado", async () => {
      render(<Cita />);
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      fireEvent.change(input, { target: { value: "Marge" } });
      const buttonCita = await screen.findByText("Obtener Cita");
      userEvent.click(buttonCita);
      await waitFor(()=>{
        const autor = screen.getByTestId("author");
        expect(autor).toHaveTextContent("Marge Simpson");
      })
    });
  });

  describe("Cuando escribimos números en el input", () => {
    it("debería renderizar un mensaje de error", async () => {
      render(<Cita />);
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      fireEvent.change(input, { target: { value: "123456" } });
      const buttonCita = await screen.findByText("Obtener Cita");
      userEvent.click(buttonCita);
      await waitFor(() => {
        const mensajeError = screen.getByText(NOMBRE_INVALIDO);
        expect(mensajeError).toBeInTheDocument();
      });
    });
  });

  describe("Cuando intentamos buscar citas de un personaje que no existe", () => {
    it("debería renderizar un mensaje de 'No se encontró ninguna cita'", async () => {
      render(<Cita />);
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      fireEvent.change(input, { target: { value: "Carolina" } });
      const buttonCita = await screen.findByText("Obtener Cita");
      userEvent.click(buttonCita);
      await waitFor(() => {
        const mensajeError = screen.getByText(NO_ENCONTRADO);
        expect(mensajeError).toBeInTheDocument();
      });
    });
  });

  describe("Cuando presionamos el botón de borrar", () => {
    it("debería limpiar el input de personaje", async () => {
      render(<Cita />);
      const buttonBorrar = screen.getByText("Borrar");
      const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
      fireEvent.change(input, { target: { value: "Carolina" } });
      expect(input).toHaveAttribute("value", "Carolina")
      userEvent.click(buttonBorrar);
      await waitFor(() => {
        expect(input).toHaveAttribute("value", "")
      });
    });
  });

});
