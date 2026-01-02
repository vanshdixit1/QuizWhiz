
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { columns } from "@/components/dashboard/columns";
import { DataTable } from "@/components/dashboard/data-table";
import { quizSchema } from "@/components/dashboard/data/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simulate a database read for quizzes.
async function getQuizzes() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/dashboard/data/quizzes.json")
  );

  const quizzes = JSON.parse(data.toString());

  return z.array(quizSchema).parse(quizzes);
}

export default async function TaskPage() {
  const quizzes = await getQuizzes();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your previously attempted quizzes!
            </p>
          </div>
        </div>
        <Tabs defaultValue="all-quizzes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all-quizzes">All Quizzes</TabsTrigger>
            <TabsTrigger value="generated-quizzes">Generated Quizzes</TabsTrigger>
          </TabsList>
          <TabsContent value="all-quizzes">
            <DataTable data={quizzes} columns={columns} />
          </TabsContent>
          <TabsContent value="generated-quizzes">
            <DataTable data={quizzes.filter(q => q.isGenerated)} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
