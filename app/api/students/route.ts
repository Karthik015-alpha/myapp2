
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "students.json");


async function readData() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeData(data: any) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function GET(req: Request) {
  const students = await readData();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const student = students.find((s: any) => s.id === Number(id));

    if (!student) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(student);
  }

  return Response.json(students);
}

export async function POST(req: Request) {
  const students = await readData();
  const body = await req.json();

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name: body.name,
    course: body.course
  };

  students.push(newStudent);
  await writeData(students);

  return Response.json(newStudent, { status: 201 });
}

export async function DELETE(req: Request) {
  const students = await readData();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const filtered = students.filter((s: any) => s.id !== Number(id));

  await writeData(filtered);

  return Response.json({ message: "Deleted" });
}

export async function PUT(req: Request) {
  const students = await readData();
  const body = await req.json();

  const index = students.findIndex((s: any) => s.id === body.id);

  if (index === -1) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }

  students[index] = {
    ...students[index],
    name: body.name,
    course: body.course
  };

  await writeData(students);

  return Response.json(students[index]);
}
