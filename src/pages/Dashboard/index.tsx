import { useEffect, useState } from "react";
import * as D from "./styles";
import { ChatCenteredText } from "@phosphor-icons/react";
import { ServicesType } from "../../types/services";
import { Loading } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRequest, postRequest } from "../../services";
import { CustomersType } from "../../types/customers";

const STATUS = ["Aberto", "Cancelado", "Em andamento", "Concluído"];

export const Dashboard = () => {
  const [services, setServices] = useState<ServicesType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [customers, setCustomers] = useState<CustomersType[]>([]);

  const servicesOpened = services.filter((service) => {
    return service.status == 3 ? service : "";
  });

  const handleShowModal = (isShow: boolean) => {
    setShowModal(isShow);
  };

  async function loadData() {
    const customers = await getRequest.getCustomers();
    const services = await getRequest.getServices();

    setServices(services);
    setCustomers(customers);
    setIsLoading(false);
  }

  const handleSubmitServices = async (data: ServicesType) => {
    const services = await postRequest.setServices(data);
    setServices(services);
    toast.success("Chamado registrado com sucesso!");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <D.Container>
      <D.Menu>aside</D.Menu>
      <D.Content>
        <D.Header className="bg-gray-400 my-4 p-2">
          <ChatCenteredText size={32} />
          <h1 className="text-4xl font-thin text-gray-900 dark:text-black">
            Chamados
          </h1>
        </D.Header>
        <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-3 sm:px-8">
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Chamados em aberto</h3>
              <p className="text-3xl">{servicesOpened.length}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                ></path>
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total de chamados</h3>
              <p className="text-3xl">{services.length}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                ></path>
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total de Clientes</h3>
              <p className="text-3xl">{customers.length}</p>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <Loading type="spin" color="#ff0000" />
            <span className="text-4xl font-thin text-gray-900">
              Carregando...
            </span>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-end w-100 cta-wrapper">
              <D.Button
                title="Criar chamado"
                onClick={() => setShowModal(true)}
              >
                Criar chamado
              </D.Button>
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
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <td className="px-6 py-4">{service.customer_name}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {service.subject}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {service.description}
                      </th>
                      <td className="px-6 py-4">{STATUS[service.status]}</td>
                      <td className="px-6 py-4">{service.category_name}</td>
                      <td className="px-6 py-4">
                        <D.Levels color={service.levels_color}>
                          {service.levels_name}
                        </D.Levels>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {showModal && (
              <Modal
                handleSubmitServices={handleSubmitServices}
                showModal={handleShowModal}
              />
            )}
          </>
        )}
      </D.Content>
      <ToastContainer />
    </D.Container>
  );
};
