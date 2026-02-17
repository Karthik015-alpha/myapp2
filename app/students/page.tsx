"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  course: string;
};

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [singleStudent, setSingleStudent] = useState<Student | null>(null);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 GET – All students
  async function fetchAllStudents() {
    try {
      setLoading(true);
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      alert("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 GET – Student by ID
  async function fetchStudentById() {
    if (!studentId) return alert("Enter ID");

    try {
      const res = await fetch(`/api/students?id=${studentId}`);

      if (!res.ok) {
        alert("Student not found");
        setSingleStudent(null);
        return;
      }

      const data = await res.json();
      setSingleStudent(data);
    } catch {
      alert("Error fetching student");
    }
  }

  // 🔹 POST – Add student
  async function addStudent() {
    if (!name || !course) {
      alert("Enter all fields");
      return;
    }

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course })
      });

      if (!res.ok) throw new Error();

      resetForm();
      fetchAllStudents();
    } catch {
      alert("Failed to add student");
    }
  }

  // 🔹 PUT – Update student
  async function updateStudent() {
    if (!editId) return;

    try {
      const res = await fetch("/api/students", {
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
      fetchAllStudents();
    } catch {
      alert("Update failed");
    }
  }

  // 🔹 DELETE – Delete student
  async function deleteStudent(id: number) {
    const confirmDelete = confirm("Delete this student?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/students?id=${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error();

      fetchAllStudents();
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
    fetchAllStudents();
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">

      {/* 🔹 Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🎓 Student Management
      </h1>

      {/* 🔹 Add / Edit Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">
          {editId ? "Edit Student" : "Add Student"}
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
                onClick={updateStudent}
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
              onClick={addStudent}
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
          Search Student By ID
        </h3>

        <div className="flex gap-3">
          <input
            placeholder="Enter ID"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            className="border p-2 rounded w-40 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            onClick={fetchStudentById}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Search
          </button>
        </div>

        {singleStudent && (
          <div className="mt-3 p-3 bg-gray-50 rounded border">
            <p className="font-medium">
              ID: {singleStudent.id}
            </p>
            <p>Name: {singleStudent.name}</p>
            <p>Course: {singleStudent.course}</p>
          </div>
        )}
      </div>

      {/* 🔹 Table */}
      <div>
        <h3 className="text-xl font-semibold mb-3">All Students</h3>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-500">No students found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow">

              {/* Header */}
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {students.map(student => (
                  <tr
                    key={student.id}
                    className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="p-3 font-medium">
                      {student.id}
                    </td>

                    <td className="p-3">
                      {student.name}
                    </td>

                    <td className="p-3">
                      {student.course}
                    </td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => {
                          setEditId(student.id);
                          setName(student.name);
                          setCourse(student.course);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
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
