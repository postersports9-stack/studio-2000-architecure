import { CategoryPage } from "@/components/category-page"

export default function KomercijalniPage() {
  return (
    <CategoryPage
      title="Комерцијални"
      heroImage="/category-commercial.jpg"
      projects={[
        { name: "Деловен Центар Партизанска", location: "Скопје", year: "2023", image: "/project-2.jpg" },
        { name: "Шопинг Молови Восток", location: "Скопје", year: "2022", image: "/project-3.jpg" },
        { name: "Канцеларии Vero Center", location: "Скопје", year: "2021", image: "/project-1.jpg" },
        { name: "Бизнис Парк", location: "Куманово", year: "2020", image: "/project-4.jpg" },
        { name: "Изложбен Простор", location: "Скопје", year: "2019", image: "/project-6.jpg" },
        { name: "Корпоративен Хедквотерс", location: "Скопје", year: "2018", image: "/project-5.jpg" },
      ]}
    />
  )
}
