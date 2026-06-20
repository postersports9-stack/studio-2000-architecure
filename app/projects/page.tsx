import { Suspense } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProjectsClient } from '@/components/projects-client'
import { getAllProjects, getCategories } from '@/lib/projects'

export const metadata = {
  title: 'Проекти — STUDIO 2000',
  description: 'Сите архитектонски проекти на STUDIO 2000.',
}

export const revalidate = 60

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getAllProjects(),
    getCategories(),
  ])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Suspense>
        <ProjectsClient projects={projects} categories={categories} />
      </Suspense>
      <SiteFooter />
    </main>
  )
}
