import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function DutyBoard() {
  const [employees, setEmployees] = useState([]);
  const roles = ['Admin', 'Deposit/Withdraw', 'Marketing'];

  useEffect(() => {
    fetchAvailableEmployees();
  }, []);

  const fetchAvailableEmployees = async () => {
    const { data } = await supabase.from('employees').select('*').eq('active', true);
    setEmployees(data || []);
  };

  const assignRandomly = () => {
    alert("Triggering randomization logic!");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Duty Assignments</h1>
        <div>
          <button onClick={assignRandomly} className="bg-green-600 text-white px-4 py-2 rounded mr-2">Random Assign</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded">Clear</button>
        </div>
      </div>
      <div className="flex gap-4">
        {roles.map(role => (
          <div key={role} className="flex-1 bg-gray-50 p-4 border rounded min-h-[300px]">
            <h3 className="font-bold border-b pb-2 mb-2">{role}</h3>
            <div className="text-sm text-gray-500 italic">Drop employees here...</div>
          </div>
        ))}
      </div>
    </div>
  );
}
