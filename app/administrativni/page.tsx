import { CategoryPage } from "@/components/category-page"

export default function AdministrativniPage() {
  return (
    <CategoryPage
      title="Административни"
      heroImage="/category-administrative.jpg"
      projects={[
        { name: "Општинска Зграда", location: "Скопје", year: "2022", image: "/project-1.jpg" },
        { name: "Судски Комплекс", location: "Битола", year: "2021", image: "/project-2.jpg" },
        { name: "Министерски Кабинет", location: "Скопје", year: "2020", image: "/project-3.jpg" },
        { name: "Регионална Управа", location: "Тетово", year: "2019", image: "/project-4.jpg" },
        { name: "Општинска Канцеларија", location: "Прилеп", year: "2018", image: "/project-5.jpg" },
        { name: "Градска Куќа", location: "Охрид", year: "2017", image: "/project-6.jpg" },
      ]}
    />
  )
}
