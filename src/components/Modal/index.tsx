import * as M from './styles'
import { X } from "@phosphor-icons/react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useEffect, useState } from "react";

import { api } from "../../services/endpoint";
import { CategoriesType } from "../../types/categories";
import { useForm } from "react-hook-form"
import { LevelsType } from "../../types/levels";
import { CustomersType } from "../../types/customers";

const servicesSchema = z.object({
  subject: z.string().min(1, "O assunto é obrigatório."),
  customer_name: z.string().min(1, "O cliente é obrigatório."),
  description: z.string(),
  category_name: z.string().min(1, "A categoria é obrigatória."),
  levels_name: z.string().min(1, "O nivel de prioridade é obrigatório."),
  status: z.number().min(1, "O campo 'status' é obrigatório e deve ser um número não negativo.")
});

type servicesFormData = z.infer<typeof servicesSchema>

type ModalType = {
    showModal: (isShow: boolean) => void;
    handleSubmitServices: (data: servicesFormData) => void;
}

export const Modal = ({ showModal, handleSubmitServices }: ModalType) => {
    const [categories, setCategories] = useState<CategoriesType[]>([])
    const [levels, setLevels] = useState<LevelsType[]>([])
    const [customers, setCustomers] = useState<CustomersType[]>([])

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<servicesFormData>({
      resolver: zodResolver(servicesSchema)
    })

    async function fetchPrioritiesAndCategories() {
      const [allCategories, allLevels, allCustomers] = await Promise.all([
        api.get('/categories'),
        api.get('/levels'),
        api.get('/customers')
      ])
      
      setCategories(allCategories.data)
      setLevels(allLevels.data)
      setCustomers(allCustomers.data)
    }

    useEffect(() => {
        fetchPrioritiesAndCategories()
    }, [])
    
    return (
        <M.Container className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto max-w-3xl">
          <div className="modal-wrapper border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold">Cadastrar um novo chamado</h3>
              <button
                className="btn-cancel flex items-center bg-transparent border-0 text-black float-right"
                onClick={() => showModal(false)}
                title="Fechar o modal"
              >
                <X size={32} />
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form onSubmit={handleSubmit(handleSubmitServices)} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <label className="block text-black text-sm font-bold mb-1">
                  Cliente
                </label>
                <select {...register("customer_name", { required: true})} className="shadow border rounded w-full py-2 px-1 text-black">
                    {customers.map((customer, index) =>(
                        <option value={customer.id} key={index}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                <M.Error>{errors?.customer_name?.message}</M.Error>
                <label className="mt-4 block text-black text-sm font-bold mb-1">
                  Assunto
                </label>
                <input {...register("subject", { required: true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-black" placeholder="Meu monitor não funciona..." />
                <M.Error>{errors?.subject?.message}</M.Error>
                <label className="mt-4 block text-black text-sm font-bold mb-1">
                  Descrição
                </label>
                <textarea style={{ resize: "none"}} {...register("description")} className="shadow appearance-none border rounded w-full py-4 px-1 text-black h-36"></textarea>
                <M.Error>{errors?.description?.message}</M.Error>
                <label className="mt-4 block text-black text-sm font-bold mb-1">
                  Categoria
                </label>
                <select {...register("category_name", { required: true})} className="shadow border rounded w-full py-2 px-1 text-black">
                    {categories.map((category, index) =>(
                        <option value={category.id} key={index}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <M.Error>{errors?.category_name?.message}</M.Error>
                <label className="mt-4 block text-black text-sm font-bold mb-1">
                  Prioridade
                </label>
                <select {...register("levels_name", { required: true})} className="shadow border rounded w-full py-2 px-1 text-black">
                    {levels.map((level, index) =>(
                        <option value={level.id} key={index}>
                            {level.name}
                        </option>
                    ))}
                </select>
                <M.Error>{errors?.levels_name?.message}</M.Error>
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => showModal(false)}
                title="Fechar o modal"
              >
                Cancelar
              </button>
              <button
                className="text-white bg-green-500 active:bg-green-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="submit"
                title="Cadastrar um novo chamado"
              >
                Cadastrar
              </button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </M.Container>
    )
}