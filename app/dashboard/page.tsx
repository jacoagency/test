import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

async function getUserData(userId: string) {
  // This is where you'd fetch user data from MongoDB
  // For now, we'll return mock data
  return {
    name: "John Doe",
    email: "john@example.com",
    projectCount: 5,
    totalTasks: 37,
    completedTasks: 22
  }
}

export default async function Dashboard() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const userData = await getUserData(userId)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {userData.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Projects" value={userData.projectCount} />
        <DashboardCard title="Total Tasks" value={userData.totalTasks} />
        <DashboardCard title="Completed Tasks" value={userData.completedTasks} />
        <DashboardCard 
          title="Task Completion Rate" 
          value={`${Math.round((userData.completedTasks / userData.totalTasks) * 100)}%`} 
        />
      </div>
      <div className="mt-8">
        <Button>Create New Project</Button>
      </div>
    </div>
  )
}

function DashboardCard({ title, value }: { title: string, value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}