import { useEffect, useState } from 'react'
import { api } from '../../services/endpoint'
import * as D from './styles'
import { ChatCenteredText } from '@phosphor-icons/react'
import { ServicesType } from '../../types/services'

const STATUS = [
  'Criado',
  'Cancelado',
  'Em andamento',
  'Concluído'
]

export const Dashboard = () => {
  const [services, setServices] = useState<ServicesType[]>([])

  async function getServices() {
    const { data } = await api.get('/services')

    setServices(data)
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <D.Container>
      <D.Menu>
        aside
      </D.Menu>
      <D.Content>
          <D.Header className='bg-gray-400 my-4 p-2'>
            <ChatCenteredText size={32} />
            <h1 className='text-4xl font-thin text-gray-900 dark:text-black'>Chamados</h1>
          </D.Header>

<div className="relative overflow-x-auto d-table">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Assunto
                </th>
                <th scope="col" className="px-6 py-3">
                    Descrição
                </th>
                <th scope="col" className="px-6 py-3">
                    Estado
                </th>
                <th scope="col" className="px-6 py-3">
                    Categoria
                </th>
                <th scope="col" className="px-6 py-3">
                    Prioridade
                </th>
            </tr>
        </thead>
        <tbody>
                {services.map((service) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {service.subject}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {service.description}
                    </th>
                    <td className="px-6 py-4">
                       {STATUS[service.status]}
                    </td>
                    <td className="px-6 py-4">
                       {service.category_name}
                    </td>
                    <td className="px-6 py-4">
                       {service.levels_name}
                    </td>
                  </tr>
                ))}
        </tbody>
    </table>
</div>

      </D.Content>
    </D.Container>
  )
}

