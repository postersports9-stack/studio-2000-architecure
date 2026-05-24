import { CategoryPage } from "@/components/category-page"

export default function HoteliPage() {
  return (
    <CategoryPage
      title="Хотели"
      heroImage="/category-hotels.jpg"
      projects={[
        { name: "Хотел Лагуна", location: "Охрид", year: "2023", image: "/project-5.jpg" },
        { name: "Бутик Хотел Стара Чаршија", location: "Скопје", year: "2022", image: "/project-1.jpg" },
        { name: "Планински Ресорт", location: "Маврово", year: "2021", image: "/project-4.jpg" },
        { name: "Спа Хотел", location: "Дојран", year: "2020", image: "/project-6.jpg" },
        { name: "Градски Хотел Централ", location: "Скопје", year: "2019", image: "/project-2.jpg" },
        { name: "Резорт Преспа", location: "Преспа", year: "2018", image: "/project-3.jpg" },
      ]}
    />
  )
}
