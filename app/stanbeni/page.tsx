import { CategoryPage } from "@/components/category-page"

export default function StanbeniPage() {
  return (
    <CategoryPage
      title="Станбени"
      heroImage="/category-residential.jpg"
      projects={[
        { name: "Резиденција Водно", location: "Скопје", year: "2023", image: "/project-1.jpg" },
        { name: "Вила Маврово", location: "Маврово", year: "2022", image: "/project-5.jpg" },
        { name: "Станбен Комплекс Аеродром", location: "Скопје", year: "2021", image: "/project-2.jpg" },
        { name: "Куќа на Езерото", location: "Охрид", year: "2020", image: "/project-3.jpg" },
        { name: "Градски Апартмани", location: "Скопје", year: "2019", image: "/project-6.jpg" },
        { name: "Семејна Куќа", location: "Тетово", year: "2018", image: "/project-4.jpg" },
      ]}
    />
  )
}
