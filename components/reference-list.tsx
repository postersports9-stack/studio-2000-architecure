import React from 'react';
import { Building2, Hotel, Stethoscope, GraduationCap, Factory, MapPin, Calendar, Maximize, Award, ChevronDown } from "lucide-react";

type Project = {
  name: string;
  location?: string;
  area?: string;
  investor?: string;
  year?: string;
  awards?: string;
};

type Category = {
  id: string;
  title: string;
  icon: React.ReactNode;
  projects: Project[];
};

const referenceCategories: Category[] = [
  {
    id: "commercial",
    title: "КОМЕРЦИЈАЛНИ / АДМИНИСТРАТИВНИ ОБЈЕКТИ",
    icon: <Building2 className="w-6 h-6" />,
    projects: [
      { name: "MBC – Мулти Бизнис Центар", location: "Скопје", area: "900m2", investor: "Скопски саем", year: "2004" },
      { name: "Канцеларии „MakSteel”", investor: "MakSteel", year: "2004" },
      { name: "Канцеларии „Roche” - Македонија", investor: "Roche", year: "2004" },
      { name: "Канцеларии „Quantum communications”", investor: "Quantum communications", year: "2004" },
      { name: "Канцеларии „New Moment”", location: "Скопје", investor: "New Moment", year: "2006" },
      { name: "Бизнис центар", location: "Скопје", area: "48000m2", investor: "Скопски саем", year: "2007" },
      { name: "Бизнис центар", location: "Скопје", area: "11000m2", investor: "Скопски саем", awards: "1 награда BIMAS 2006" },
      { name: "Канцеларии „Beta medico trade”", location: "Скопје", investor: "Beta medico trade", year: "2007" },
      { name: "Административен објект „Сектрон”", location: "Скопје", area: "1500m2", investor: "Сектрон Скопје", year: "2009" },
      { name: "Административен објект „ProCredit Bank”", location: "Скопје", area: "8000m2", investor: "ProCredit Bank – Скопје", year: "2010" },
      { name: "Административен објект „Neotel”", location: "Скопје", area: "2900m2", investor: "Неоком Скопје", year: "2010" },
      { name: "Трговски центар и катна гаража", location: "Прилеп", area: "12000m2", investor: "Дравас", year: "2010", awards: "1 награда BIMAS 2012" },
      { name: "Катна гаража и трговски центар", location: "Прилеп", area: "14000m2", investor: "DMOil", year: "2007", awards: "1 награда BIMAS 2008" },
    ]
  },
  {
    id: "residential",
    title: "ХОТЕЛИ / СТАНБЕНИ ОБЈЕКТИ",
    icon: <Hotel className="w-6 h-6" />,
    projects: [
      { name: "\"Hotel Milenium 2”", location: "Подградец / Албанија", area: "1900m2", investor: "странски инвеститор", year: "2004" },
      { name: "Pro Credit academy - Регионален тренинг центар", location: "Велес", area: "3500m2", investor: "Pro Credit Bank - Скопје", year: "2007" },
      { name: "Хотел \"Кожуф\"", area: "10000m2", investor: "Ski Resort Kozuf", year: "2007" },
      { name: "Спа центар „Хотел Макпетроло\"", location: "Маврово", area: "1000m2", investor: "Макпетрол ЈСЦ", year: "2009" },
      { name: "Реконструкција на хотел – City Plaza “Гоце Делчев\"", location: "Струмица", area: "2000m2", investor: "Old Department Store", year: "2010" },
      { name: "Станбен и комерцијален објект “Огњен Прица”", location: "Скопје", area: "8000m2", investor: "Impeksel 2", year: "2001" },
      { name: "Станбен објект “Дане Крапчев\"", location: "Скопје", area: "750m2", investor: "Proing", year: "2003" },
      { name: "Станбен објект “ул. 29 Ноември.\"", location: "Скопје", area: "600m2", investor: "Студио 2000", year: "2005" },
      { name: "Станбен објект \"Расадник 1\"", location: "Скопје", area: "3500m2", investor: "Bortas", year: "2006" },
      { name: "Станбен објект “Мара Поцкова\"", location: "Струмица", area: "8600m2", investor: "Elenica", year: "2007" },
      { name: "Станбен објект “Budimex\"", location: "Лавов, Украина", area: "9000m2", investor: "Budimex", year: "2007" },
      { name: "Станбен и комерцијален комплекс \"ул. Цветан Димов\"", location: "Струмица", area: "16600m2", investor: "Adora Engineering", year: "2010" },
      { name: "Станбен комплекс „Точила\"", location: "Прилеп", area: "5100m2", investor: "Влада на РСМ", year: "2010" },
      { name: "Станбен комплекс „Бутел\"", location: "Скопје", area: "5100m2", investor: "Влада на РСМ", year: "2010" },
      { name: "Станбен објект “ул. Зејнел Ајдини\"", location: "Скопје", area: "1600m2", investor: "Кодекс Градба", year: "2020" },
    ]
  },
  {
    id: "healthcare",
    title: "ЗДРАВСТВО / ОБЈЕКТИ ОД МЕШАНА НАМЕНА",
    icon: <Stethoscope className="w-6 h-6" />,
    projects: [
      { name: "Изложбен салон и сервис „Hyundai”", location: "Скопје", area: "1200m2", investor: "Korea Autotrade Скопје", year: "2014" },
      { name: "Изложбен салон и сервис „SAAB-Subaru-Daihatsu - KIA\"", location: "Скопје", area: "4000m2", investor: "КММ", year: "2009" },
      { name: "Реконструкција на IT центар Алкалоид", location: "Скопје", area: "300m2", investor: "Алкалоид ЈСЦ", year: "2009" },
      { name: "Административен објект „Mond\"", location: "Штип", area: "3200m2", investor: "Fashion apparel Mond", year: "2009" },
      { name: "Катна гаража бул. Крсте Мисирков", location: "Скопје", area: "8000m2", investor: "Мак Оил", year: "2010" },
      { name: "Подземна гаража ул. Даме Груев - Собрание", location: "Скопје", area: "7000m2", investor: "Мак Оил", year: "2010" },
      { name: "Општа болница „RE-Medika\"", location: "Скопје", area: "3200m2", investor: "RE-Medika", year: "2003" },
      { name: "Реконструкција на 50 куќи на семејства со деца со пречки во развојот", investor: "CRIC - ЕСНО", year: "2003" },
      { name: "Дневен центар за деца со пречки во развојот", location: "Скопје", area: "800m2", investor: "CRIC - ECHO", year: "2003" },
      { name: "Центар за рехабилитација од зависности", area: "900m2", investor: "Општина Кисела Вода", year: "2007" },
      { name: "\"Katlanovo Spa\"", area: "1200m2", investor: "Katlanovo Spa", year: "2009" },
      { name: "„European eye hospital\"", location: "Скопје", area: "3500m2", investor: "European eye hospital", year: "2010" },
      { name: "Хируршка болница „Филип 2ри”", location: "Скопје", area: "19000m2", investor: "Хируршка болница Филип 2pu", year: "2011" },
    ]
  },
  {
    id: "education",
    title: "ОБРАЗОВАНИЕ / СПОРТ",
    icon: <GraduationCap className="w-6 h-6" />,
    projects: [
      { name: "Училиште за странски јазици „EuroKids”", location: "Скопје", investor: "„EuroKids” – Скопје", year: "2004" },
      { name: "Средно училиште „Мирко Милевски”", location: "Кичево", area: "900m2", investor: "Министерство за образование", year: "2009" },
      { name: "Спортско игралиште при училиште", location: "Село Жировница", investor: "Донација од Студио 2000", year: "2003" },
      { name: "100 Тениски терени", location: "СР Македонија", investor: "Влада на СРМ „Агенција за млади и спорт” – Скопје", year: "2009" },
      { name: ",,ИБУ’’ универзитетски кампус", location: "Скопје", area: "13000m2", investor: "Meѓународен балкански универзитет", year: "2016" },
      { name: "Реконструкција на градинка ,,Мајски цвет’’", location: "Скопје", area: "1300m2", investor: "општина Карпош и Влада на РСМ", year: "2020" },
    ]
  },
  {
    id: "industrial",
    title: "ИНДУСТРИСКИ ОБЈЕКТИ",
    icon: <Factory className="w-6 h-6" />,
    projects: [
      { name: "Фабрика за облека „Нонча Камишкова”", location: "Велес" },
      { name: "Реконструкција на фабрика „Охис”", location: "Скопје" },
      { name: "Реконструкција на фабрика „Алкалоид” ЈСЦ", location: "Скопје" },
      { name: "Комплекс P-946", location: "Тармија, Ирак" },
      { name: "Фабрика за обработка и складирање на месо „Foodbazar”", location: "Скопје", area: "6000m2", investor: "International Food Bazar", year: "2008" },
      { name: "Фабрика за обработка на пластика „Кодакопласт”", location: "Скопје", area: "600m2", investor: "Кодакопласт", year: "2008" },
      { name: "Фабрика за производство на сокови „Вива”", location: "Скопје", area: "3800m2", investor: "Вива", year: "2009" },
      { name: "Енергетски објект „Скопски саем”", location: "Скопје", area: "1800m2", investor: "Скопски саем ЈСЦ", year: "2009" },
      { name: "Фабрика за млеко и млечни продукти „Бучен Козјак”", location: "Куманово", area: "3100m2", investor: "Бучен Козјак", year: "2010" },
    ]
  }
];

export function ReferenceList() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl tracking-tighter sm:text-5xl font-serif">Референтна Листа</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Преглед на дел од нашите позначајни проекти низ годините
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {referenceCategories.map((category) => (
            <div key={category.id} className="relative flex flex-col border border-border/50 bg-card text-card-foreground shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary/20">
              <div className="p-6 flex flex-row items-center gap-4 bg-muted/40 border-b border-border/50">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  {category.icon}
                </div>
                <h3 className="font-medium leading-tight tracking-tight text-lg font-serif">{category.title}</h3>
              </div>
              <div className="p-0 flex-1 flex flex-col bg-card relative">
                <div className="flex-1 overflow-y-auto max-h-[450px] custom-scrollbar pb-8">
                  <ul className="divide-y divide-border/50">
                    {category.projects.map((project, idx) => (
                      <li key={idx} className="p-5 hover:bg-muted/30 transition-colors group">
                        <div className="flex flex-col space-y-2">
                          <span className="font-semibold text-base text-foreground/90 group-hover:text-primary transition-colors leading-tight">
                            {project.name}
                          </span>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
                            {project.location && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 opacity-70" />
                                <span>{project.location}</span>
                              </div>
                            )}
                            {project.area && (
                              <div className="flex items-center gap-1.5">
                                <Maximize className="w-3.5 h-3.5 opacity-70" />
                                <span>{project.area}</span>
                              </div>
                            )}
                            {project.year && (
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 opacity-70" />
                                <span>{project.year}</span>
                              </div>
                            )}
                          </div>
                          
                          {(project.investor || project.awards) && (
                            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/40">
                              {project.investor && (
                                <div className="text-xs text-muted-foreground bg-muted/60 px-2.5 py-1.5 rounded-md border border-border/50">
                                  Инвеститор: <span className="font-medium text-foreground/80">{project.investor}</span>
                                </div>
                              )}
                              {project.awards && (
                                <div className="text-xs flex items-center gap-1.5 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1.5 rounded-md border border-amber-200/50 dark:border-amber-900/50">
                                  <Award className="w-3.5 h-3.5" />
                                  <span className="font-medium">{project.awards}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {category.projects.length > 3 && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none flex items-end justify-center pb-2">
                    <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce opacity-70" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: hsl(var(--muted-foreground) / 0.3);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: hsl(var(--muted-foreground) / 0.5);
        }
      `}} />
    </section>
  );
}
