
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LoginForm } from '../pages/Login/Components/LoginForm';


const testingRender = (component) => render(
    <Provider store={store}>
        {component}
    </Provider>
)

describe('LoginForm', () => {

    test('Cargar el formulario y revisar que todo sea correcto', () => {
        //const wrapper = render(<Formulario />)
        // wrapper.debug() // VER LA ESTRUCTURA HTML DEL COMPONENTE

        testingRender(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )

        const loginFormLogo = screen.getByTestId('login-form-logo')
        const usernameInput = screen.getByTestId('username-input')
        const passwordInput = screen.getByTestId('password-input')
        const btnLogin = screen.getByTestId('btn-login')

        expect(loginFormLogo.tagName).toBe('IMG') // COMPORBAR QUE UN ELEMENTO ES UN "botón"
        expect(usernameInput.tagName).toBe('INPUT') // COMPORBAR QUE UN ELEMENTO ES UN "botón"
        expect(passwordInput.tagName).toBe('INPUT') // COMPORBAR QUE UN ELEMENTO ES UN "botón"
        expect(btnLogin.tagName).toBe('BUTTON') // COMPORBAR QUE UN ELEMENTO ES UN "botón"

        expect(loginFormLogo).toBeInTheDocument()
        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(btnLogin).toBeInTheDocument()

    })

    test('Validar que el formulario muestra un error cuando alguno de los campos está vacío', async () => {

        testingRender(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )

        const btnLogin = screen.getByTestId('btn-login')

        userEvent.click(btnLogin)

        const errorMessage = screen.getByText(/parece que ha habido un error, intenta de nuevo!/i);

    })

})

