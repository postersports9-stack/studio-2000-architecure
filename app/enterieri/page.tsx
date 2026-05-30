import { CategoryPage } from "@/components/category-page"
import { getCategory, getProjectsByCategory } from "@/lib/projects"

export default function EnterieriPage() {
  const category = getCategory("enterieri")!
  return (
    <CategoryPage
      title={category.title}
      heroImage={category.heroImage}
      projects={getProjectsByCategory("enterieri")}
    />
  )
}
