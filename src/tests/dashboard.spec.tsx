import { fireEvent, render, waitFor } from "@testing-library/react"
import { Dashboard } from "../pages/Dashboard"
import { screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect';

describe('Dashboard' , () => {
    it('should be open modal', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.queryByText('Carregando...')).toBeNull();
        });
        
        fireEvent.click(screen.getByTitle('Criar chamado'));
      
        expect(screen.getByText('Cadastrar um novo chamado')).toBeInTheDocument();
    })
})