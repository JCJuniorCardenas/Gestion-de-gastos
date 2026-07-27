'use client';
import { useEffect, useState } from 'react';
import { categoriesApi } from '@/lib/api';

interface Category {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.getAll();
      setCategories(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return;
    try {
      await categoriesApi.create({ name: name.trim() });
      setName('');
      fetchCategories();
    } catch {
      setError('No se pudo crear la categoría');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await categoriesApi.update(id, { name: editName.trim() });
      setEditId(null);
      setEditName('');
      fetchCategories();
    } catch {
      setError('No se pudo actualizar');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta categoría? También se eliminarán sus gastos.')) return;
    await categoriesApi.delete(id);
    fetchCategories();
  };

  if (loading) return <div className="text-gray-500">Cargando...</div>;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Categorías</h1>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Nueva categoría</h2>
        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-3">{error}</div>}
        <form onSubmit={handleCreate} className="flex gap-3">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Comida" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Agregar
          </button>
        </form>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>No hay categorías todavía.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-xl shadow-sm px-5 py-3 flex items-center justify-between">
              {editId === cat.id ? (
                <div className="flex gap-2 flex-1">
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button onClick={() => handleUpdate(cat.id)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
                    Guardar
                  </button>
                  <button onClick={() => setEditId(null)} className="text-gray-500 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition">
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-medium text-gray-800">{cat.name}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditId(cat.id);
                        setEditName(cat.name);
                      }}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Editar
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-400 hover:text-red-600 text-sm">
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
