import { CategoryPage } from "@/components/category-page"
import { getCategory, getProjectsByCategory } from "@/lib/projects"

export default function HoteliPage() {
  const category = getCategory("hoteli")!
  return (
    <CategoryPage
      title={category.title}
      heroImage={category.heroImage}
      projects={getProjectsByCategory("hoteli")}
    />
  )
}
