import { useForm } from "react-hook-form";
import type { WorkplaceFormData } from "../types.ts";

interface Props {
  onSubmit: (data: WorkplaceFormData) => void;
  isLoading: boolean;
}

export const WorkplaceForm = ({ onSubmit, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<WorkplaceFormData>({
    defaultValues: {
      has_pc: false,
      name: "",
      description: "",
      ip_address: "",
    },
  });

  const hasPc = watch("has_pc");

  const onFormSubmit = (data: WorkplaceFormData) => {
    if (!data.has_pc) {
      data.ip_address = "";
    }
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-4 p-4 border rounded shadow-md bg-white"
    >
      <h2 className="text-xl font-bold mb-4">Добавить рабочее место</h2>

      <div className="flex gap-4 mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="false"
            checked={!hasPc}
            onChange={() => reset({ ...watch(), has_pc: false })}
            className="form-radio"
          />
          <span>Место без компьютера</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="true"
            {...register("has_pc")}
            className="form-radio"
          />
          <span>Место с компьютером</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium">Наименование *</label>
        <input
          {...register("name", { required: "Это поле обязательно" })}
          className="mt-1 block w-full border rounded p-2"
          placeholder="Например, Офис 101"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Описание</label>
        <textarea
          {...register("description")}
          className="mt-1 block w-full border rounded p-2"
          placeholder="Дополнительная информация..."
        />
      </div>

      {hasPc && (
        <div>
          <label className="block text-sm font-medium">IP-адрес *</label>
          <input
            {...register("ip_address", {
              required: "Для места с ПК нужен IP",
              pattern: {
                value: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
                message: "Неверный формат IP",
              },
            })}
            className="mt-1 block w-full border rounded p-2"
            placeholder="192.168.1.1"
          />
          {errors.ip_address && (
            <span className="text-red-500 text-sm">
              {errors.ip_address.message}
            </span>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Сохранение..." : "Сохранить"}
      </button>
    </form>
  );
};
