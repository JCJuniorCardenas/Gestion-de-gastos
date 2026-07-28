'use client';
import { useEffect, useState } from 'react';
import { expensesApi, incomesApi } from '@/lib/api';

interface Expense {
  id: string;
  amount: string;
  description: string;
  date: string;
}

interface Income {
  id: string;
  amount: string;
  description: string;
  date: string;
}

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'expenses' | 'incomes'>('expenses');
  const [showForm, setShowForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ amount: '', description: '', date: '', categoryId: '' });
  const [incomeForm, setIncomeForm] = useState({ amount: '', description: '', date: '' });
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [expRes, incRes] = await Promise.all([expensesApi.getAll().catch(() => ({ data: [] })), incomesApi.getAll().catch(() => ({ data: [] }))]);
      setExpenses(expRes.data || []);
      setIncomes(incRes.data || []);
    } catch {
      // Error silencioso para no romper la UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const totalIncomes = incomes.reduce((sum, i) => sum + parseFloat(i.amount), 0);
  const balance = totalIncomes - totalExpenses;

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await expensesApi.create({
        amount: parseFloat(expenseForm.amount),
        description: expenseForm.description,
        date: expenseForm.date,
      });
      setExpenseForm({ amount: '', description: '', date: '', categoryId: '' });
      setShowForm(false);
      fetchData();
    } catch {
      setError('No se pudo crear el gasto');
    }
  };

  const handleCreateIncome = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await incomesApi.create({
        amount: parseFloat(incomeForm.amount),
        description: incomeForm.description,
        date: incomeForm.date,
      });
      setIncomeForm({ amount: '', description: '', date: '' });
      setShowForm(false);
      fetchData();
    } catch {
      setError('No se pudo crear el ingreso');
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('¿Eliminar este gasto?')) return;
    await expensesApi.delete(id);
    fetchData();
  };

  const handleDeleteIncome = async (id: string) => {
    if (!confirm('¿Eliminar este ingreso?')) return;
    await incomesApi.delete(id);
    fetchData();
  };

  if (loading) return <div className="text-gray-500">Cargando...</div>;

  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition">
          <p className="text-sm opacity-90 font-medium">Ingresos</p>
          <p className="text-3xl font-bold mt-2">${totalIncomes.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition">
          <p className="text-sm opacity-90 font-medium">Gastos</p>
          <p className="text-3xl font-bold mt-2">${totalExpenses.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-400 to-blue-600' : 'from-orange-400 to-orange-600'} text-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition`}>
          <p className="text-sm opacity-90 font-medium">Balance</p>
          <p className="text-3xl font-bold mt-2">${balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Tabs & Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex-1 min-w-[0] px-4 py-2 rounded-lg font-medium text-center transition ${
              activeTab === 'expenses' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Gastos
          </button>
          <button
            onClick={() => setActiveTab('incomes')}
            className={`flex-1 min-w-[0] px-4 py-2 rounded-lg font-medium text-center transition ${
              activeTab === 'incomes' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Ingresos
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex-1 min-w-[0] bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition text-center"
          >
            + {activeTab === 'expenses' ? 'Nuevo gasto' : 'Nuevo ingreso'}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3 animate-slideIn">
            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>}
            <form onSubmit={activeTab === 'expenses' ? handleCreateExpense : handleCreateIncome} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                  <input
                    type="number"
                    step="0.01"
                    max="99999999.99"
                    value={activeTab === 'expenses' ? expenseForm.amount : incomeForm.amount}
                    onChange={(e) => (activeTab === 'expenses' ? setExpenseForm({ ...expenseForm, amount: e.target.value }) : setIncomeForm({ ...incomeForm, amount: e.target.value }))}
                    required
                    placeholder="0.00"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={activeTab === 'expenses' ? expenseForm.date : incomeForm.date}
                    onChange={(e) => (activeTab === 'expenses' ? setExpenseForm({ ...expenseForm, date: e.target.value }) : setIncomeForm({ ...incomeForm, date: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <input
                  type="text"
                  value={activeTab === 'expenses' ? expenseForm.description : incomeForm.description}
                  onChange={(e) => (activeTab === 'expenses' ? setExpenseForm({ ...expenseForm, description: e.target.value }) : setIncomeForm({ ...incomeForm, description: e.target.value }))}
                  required
                  placeholder={activeTab === 'expenses' ? 'Ej: Almuerzo' : 'Ej: Salario'}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  Guardar
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Transactions List */}
        <div className="space-y-2">
          {activeTab === 'expenses' ? (
            expenses.length === 0 ? (
              <div className="text-center py-8 text-gray-400">Sin gastos</div>
            ) : (
              expenses.map((expense, i) => (
                <div key={expense.id} className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{new Date(expense.date).toLocaleDateString('es-AR')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">${parseFloat(expense.amount).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                    <button onClick={() => handleDeleteExpense(expense.id)} className="text-red-400 hover:text-red-600 text-sm">
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )
          ) : incomes.length === 0 ? (
            <div className="text-center py-8 text-gray-400">Sin ingresos</div>
          ) : (
            incomes.map((income, i) => (
              <div key={income.id} className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{income.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{new Date(income.date).toLocaleDateString('es-AR')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-green-600">+${parseFloat(income.amount).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                  <button onClick={() => handleDeleteIncome(income.id)} className="text-red-400 hover:text-red-600 text-sm">
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes fillBar {
          from { width: 0 !important; }
          to { width: var(--final-width, 100%) !important; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
