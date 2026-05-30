import { CategoryPage } from "@/components/category-page"
import { getCategory, getProjectsByCategory } from "@/lib/projects"

export default function StanbeniPage() {
  const category = getCategory("stanbeni")!
  return (
    <CategoryPage
      title={category.title}
      heroImage={category.heroImage}
      projects={getProjectsByCategory("stanbeni")}
    />
  )
}
