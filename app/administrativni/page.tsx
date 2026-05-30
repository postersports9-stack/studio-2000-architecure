import { CategoryPage } from "@/components/category-page"
import { getCategory, getProjectsByCategory } from "@/lib/projects"

export default function AdministrativniPage() {
  const category = getCategory("administrativni")!
  return (
    <CategoryPage
      title={category.title}
      heroImage={category.heroImage}
      projects={getProjectsByCategory("administrativni")}
    />
  )
}
