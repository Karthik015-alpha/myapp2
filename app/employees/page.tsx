"use client";

import { useEffect, useState } from "react";

type Employee = {
  id: number;
  name: string;
  course: string;
};

export default function EmployeePage() {
  const [Employees, setEmployees] = useState<Employee[]>([]);
  const [EmployeeId, setEmployeeId] = useState("");
  const [singleEmployee, setSingleEmployee] = useState<Employee | null>(null);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 GET – All Employees
  async function fetchAllEmployees() {
    try {
      setLoading(true);
      const res = await fetch("/api/Employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      alert("Failed to fetch Employees");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 GET – Employee by ID
  async function fetchEmployeeById() {
    if (!EmployeeId) return alert("Enter ID");

    try {
      const res = await fetch(`/api/Employees?id=${EmployeeId}`);

      if (!res.ok) {
        alert("Employee not found");
        setSingleEmployee(null);
        return;
      }

      const data = await res.json();
      setSingleEmployee(data);
    } catch {
      alert("Error fetching Employee");
    }
  }

  // 🔹 POST – Add Employee
  async function addEmployee() {
    if (!name || !course) {
      alert("Enter all fields");
      return;
    }

    try {
      const res = await fetch("/api/Employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course })
      });

      if (!res.ok) throw new Error();

      resetForm();
      fetchAllEmployees();
    } catch {
      alert("Failed to add Employee");
    }
  }

  // 🔹 PUT – Update Employee
  async function updateEmployee() {
    if (!editId) return;

    try {
      const res = await fetch("/api/Employees", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editId,
          name,
          course
        })
      });

      if (!res.ok) throw new Error();

      resetForm();
      fetchAllEmployees();
    } catch {
      alert("Update failed");
    }
  }

  // 🔹 DELETE – Delete Employee
  async function deleteEmployee(id: number) {
    const confirmDelete = confirm("Delete this Employee?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/Employees?id=${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error();

      fetchAllEmployees();
    } catch {
      alert("Delete failed");
    }
  }

  // 🔹 Reset form
  function resetForm() {
    setName("");
    setCourse("");
    setEditId(null);
  }

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">

      {/* 🔹 Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
         Employee Management
      </h1>

      {/* 🔹 Add / Edit Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">
          {editId ? "Edit Employee" : "Add Employee"}
        </h3>

        <div className="flex flex-wrap gap-3">
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            placeholder="Course"
            value={course}
            onChange={e => setCourse(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {editId ? (
            <>
              <button
                onClick={updateEmployee}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>

              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addEmployee}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* 🔹 Search */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">
          Search Employee By ID
        </h3>

        <div className="flex gap-3">
          <input
            placeholder="Enter ID"
            value={EmployeeId}
            onChange={e => setEmployeeId(e.target.value)}
            className="border p-2 rounded w-40 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            onClick={fetchEmployeeById}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Search
          </button>
        </div>

        {singleEmployee && (
          <div className="mt-3 p-3 bg-gray-50 rounded border">
            <p className="font-medium">
              ID: {singleEmployee.id}
            </p>
            <p>Name: {singleEmployee.name}</p>
            <p>Course: {singleEmployee.course}</p>
          </div>
        )}
      </div>

      {/* 🔹 Table */}
      <div>
        <h3 className="text-xl font-semibold mb-3">All Employees</h3>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : Employees.length === 0 ? (
          <p className="text-gray-500">No Employees found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow">

              {/* Header */}
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {Employees.map(Employee => (
                  <tr
                    key={Employee.id}
                    className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="p-3 font-medium">
                      {Employee.id}
                    </td>

                    <td className="p-3">
                      {Employee.name}
                    </td>

                    <td className="p-3">
                      {Employee.course}
                    </td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => {
                          setEditId(Employee.id);
                          setName(Employee.name);
                          setCourse(Employee.course);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        📝
                      </button>

                      <button
                        onClick={() => deleteEmployee(Employee.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        🚮
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  </div>
);
}
