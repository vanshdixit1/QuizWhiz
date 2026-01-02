
"use client"

import * as React from "react"
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

import { columns } from "@/components/dashboard/columns"
import { DataTable } from "@/components/dashboard/data-table"
import { taskSchema } from "@/components/dashboard/data/schema"

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/dashboard/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function AttemptedQuizzes() {
  const tasks = await getTasks()

  return (
    <DataTable data={tasks} columns={columns} />
  )
}
