import { useEffect, useState } from "react";
import axios from "axios";
import type { Workplace, WorkplaceFormData } from "./types";
import { WorkplaceForm } from "./components/WorkplaceForm";

const API_URL = "http://localhost:8000/api/workplaces/";

function App() {
  const [workplaces, setWorkplaces] = useState<Workplace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkplaces = async () => {
    try {
      const response = await axios.get<Workplace[]>(API_URL);
      setWorkplaces(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorkplaces();
  }, []);

  const handleCreate = async (data: WorkplaceFormData) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: data.name,
        description: data.description,
        ip_address: data.has_pc ? data.ip_address : null,
      };

      await axios.post(API_URL, payload);
      await fetchWorkplaces();
    } catch (err: any) {
      if (err.response?.data?.name) {
        setError("Рабочее место с таким именем уже существует.");
      } else {
        setError("Произошла ошибка при сохранении.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <WorkplaceForm onSubmit={handleCreate} isLoading={loading} />
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Список рабочих мест</h2>
          <div className="space-y-4">
            {workplaces.length === 0 && (
              <p className="text-gray-500">Список пуст</p>
            )}

            {workplaces.map((wp) => (
              <div
                key={wp.id}
                className="p-4 bg-white rounded shadow border-l-4 border-blue-500"
              >
                <div className="font-bold text-lg">{wp.name}</div>
                {wp.description && (
                  <div className="text-gray-600">{wp.description}</div>
                )}

                {wp.ip_address ? (
                  <div className="mt-2 text-sm font-mono bg-gray-100 inline-block px-2 py-1 rounded">
                    IP: {wp.ip_address}
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-gray-400 uppercase tracking-wide">
                    Без компьютера
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
