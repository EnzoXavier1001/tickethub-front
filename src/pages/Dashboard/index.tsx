import { useEffect, useState } from 'react';
import { api } from '../../services/endpoint';
import * as D from './styles';
import { ChatCenteredText } from '@phosphor-icons/react';
import { ServicesType } from '../../types/services';
import { Loading } from '../../components/Loading';
import { Modal } from '../../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const STATUS = [
  'Aberto',
  'Cancelado',
  'Em andamento',
  'Concluído'
];

const handleColorType = (color: string) => {
  switch (color) {
    case "Baixa":
      return "#28a745";
    case "Média":
      return "#ffc107";
    case "Alta":
      return "#dc3545";
    default:
      return '#CCCCCC'
  }
};

export const Dashboard = () => {
  const [services, setServices] = useState<ServicesType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  async function getServices() {
    try {
      const { data } = await api.get('/services');

      setIsLoading(false);
      setServices(data);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const handleSubmitServices = async (data: ServicesType) => {
    try {
      const services = await api.post('/services', {
        customer: 1,
        description: data.description,
        subject: data.subject,
        category: data.category_name,
        customer_name: data.customer_name,
        priorityLevel: 1,
        status: 0
      })

      setServices(services.data);

      toast.success('Chamado registrado com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowModal = (isShow: boolean) => {
    setShowModal(isShow)
  }

  useEffect(() => {
    getServices();
  }, []);

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
        {isLoading ? (
          <div className='flex flex-col justify-center items-center'>
            <Loading type='spin' color='#ff0000' />
            <span className='text-4xl font-thin text-gray-900'>Carregando...</span>
          </div>
        ) : (
          <>
          <div className='mb-4 flex justify-end w-100 cta-wrapper'>
            <D.Button onClick={() => setShowModal(true)}>Criar chamado</D.Button>
          </div>
          <div className="relative overflow-x-auto d-table">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Cliente
                  </th>
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
                {services.map((service, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                    <td className="px-6 py-4">
                      {service.customer_name}
                    </td>
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
                      <D.Levels color={handleColorType(service.levels_name)}>{service.levels_name}</D.Levels>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showModal && (
            <Modal handleSubmitServices={handleSubmitServices} showModal={handleShowModal}/>
          )}
          </>
        )}  
      </D.Content>
      <ToastContainer />
    </D.Container>
  );
};
