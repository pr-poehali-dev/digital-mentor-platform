import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const HERO_IMG = "https://cdn.poehali.dev/projects/3e44b9c2-fa1c-4999-a344-46973ae38b7d/files/13825dec-9fe4-4632-8312-476f3ead13f8.jpg";

const MENTORS = [
  {
    id: 1,
    name: "Алексей Фомин",
    age: 22,
    speciality: "Смартфоны и приложения",
    rating: 4.9,
    reviews: 87,
    lessons: 214,
    badge: "Топ наставник",
    avatar: "https://cdn.poehali.dev/projects/3e44b9c2-fa1c-4999-a344-46973ae38b7d/files/074f8272-e9d2-4880-a35d-63854393e4b0.jpg",
    tags: ["Android", "iOS", "Госуслуги"],
  },
  {
    id: 2,
    name: "Мария Белова",
    age: 24,
    speciality: "Интернет-банкинг и безопасность",
    rating: 4.8,
    reviews: 64,
    lessons: 157,
    badge: "Новый",
    avatar: "https://cdn.poehali.dev/projects/3e44b9c2-fa1c-4999-a344-46973ae38b7d/files/5aeb9532-d337-446a-affb-95c5633ea3ca.jpg",
    tags: ["Сбербанк онлайн", "Безопасность", "Переводы"],
  },
  {
    id: 3,
    name: "Дарья Ким",
    age: 19,
    speciality: "Социальные сети и мессенджеры",
    rating: 4.7,
    reviews: 41,
    lessons: 93,
    badge: "",
    avatar: "https://cdn.poehali.dev/projects/3e44b9c2-fa1c-4999-a344-46973ae38b7d/files/43abb2c9-b536-4a08-8d96-d3c265fa0a6b.jpg",
    tags: ["ВКонтакте", "Telegram", "Одноклассники"],
  },
];

const LESSONS = [
  { id: 1, icon: "Smartphone", title: "Первые шаги со смартфоном", level: "Начальный", duration: "45 мин", students: 1240, color: "bg-blue-50 text-blue-600" },
  { id: 2, icon: "Shield", title: "Безопасность в интернете", level: "Начальный", duration: "60 мин", students: 980, color: "bg-green-50 text-green-600" },
  { id: 3, icon: "CreditCard", title: "Онлайн-платежи без страха", level: "Средний", duration: "50 мин", students: 754, color: "bg-orange-50 text-orange-600" },
  { id: 4, icon: "Video", title: "Видеозвонки с близкими", level: "Начальный", duration: "30 мин", students: 1560, color: "bg-purple-50 text-purple-600" },
  { id: 5, icon: "FileText", title: "Госуслуги: шаг за шагом", level: "Средний", duration: "75 мин", students: 632, color: "bg-red-50 text-red-600" },
  { id: 6, icon: "ShoppingCart", title: "Покупки в интернет-магазинах", level: "Средний", duration: "55 мин", students: 890, color: "bg-yellow-50 text-yellow-600" },
];

const REVIEWS = [
  {
    id: 1,
    author: "Светлана Орлова",
    age: 68,
    text: "Алексей объяснил всё так просто и понятно! Теперь сама записываюсь к врачу через Госуслуги. Спасибо огромное!",
    rating: 5,
    mentor: "Алексей Фомин",
  },
  {
    id: 2,
    author: "Василий Петров",
    age: 72,
    text: "Боялся заходить в интернет-банк, теперь перевожу деньги детям сам. Мария — молодец, терпеливый педагог!",
    rating: 5,
    mentor: "Мария Белова",
  },
  {
    id: 3,
    author: "Тамара Соколова",
    age: 65,
    text: "Дарья научила меня пользоваться ВКонтакте. Теперь вижу фотографии внуков каждый день. Это счастье!",
    rating: 5,
    mentor: "Дарья Ким",
  },
];

const RATING = [
  { rank: 1, name: "Алексей Фомин", lessons: 214, rating: 4.9, badge: "🏆" },
  { rank: 2, name: "Мария Белова", lessons: 157, rating: 4.8, badge: "🥈" },
  { rank: 3, name: "Дарья Ким", lessons: 93, rating: 4.7, badge: "🥉" },
  { rank: 4, name: "Иван Соколов", lessons: 78, rating: 4.6, badge: "" },
  { rank: 5, name: "Анна Смирнова", lessons: 65, rating: 4.5, badge: "" },
];

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "mentors", label: "Наставники" },
  { id: "lessons", label: "Уроки" },
  { id: "reviews", label: "Отзывы" },
  { id: "rating", label: "Рейтинг" },
  { id: "chat", label: "Чат" },
  { id: "contacts", label: "Контакты" },
];

const INITIAL_MESSAGES = [
  { id: 1, from: "mentor", name: "Алексей", text: "Добрый день! Готов помочь вам с настройкой телефона. Что именно вас интересует?", time: "10:32" },
  { id: 2, from: "user", name: "Вы", text: "Здравствуйте! Не могу понять как установить приложение", time: "10:34" },
  { id: 3, from: "mentor", name: "Алексей", text: "Конечно! Покажу вам пошагово. Для начала зайдите в App Store или Google Play — это иконка с цветными квадратиками 🙂", time: "10:35" },
];

type RegStep = "form" | "interests" | "done";

const INTEREST_OPTIONS = [
  { id: "smartphone", label: "Смартфон", icon: "Smartphone" },
  { id: "bank", label: "Банкинг", icon: "CreditCard" },
  { id: "gosuslugi", label: "Госуслуги", icon: "FileText" },
  { id: "video", label: "Видеозвонки", icon: "Video" },
  { id: "social", label: "Соцсети", icon: "Share2" },
  { id: "shopping", label: "Покупки онлайн", icon: "ShoppingCart" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [regOpen, setRegOpen] = useState(false);
  const [regStep, setRegStep] = useState<RegStep>("form");
  const [regData, setRegData] = useState({ name: "", age: "", phone: "", email: "" });
  const [regInterests, setRegInterests] = useState<string[]>([]);
  const [isUser, setIsUser] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callMentor, setCallMentor] = useState("");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const now = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "user", name: "Вы", text: chatInput, time: now },
    ]);
    setChatInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, from: "mentor", name: "Алексей", text: "Отличный вопрос! Давайте разберёмся вместе. Я сейчас объясню шаг за шагом.", time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Icon name="Sparkles" size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">Цифровой наставник</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isUser ? (
              <div className="hidden md:flex items-center gap-2 bg-primary/10 rounded-xl px-3 py-1.5">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {regData.name ? regData.name[0] : "У"}
                </div>
                <span className="text-sm font-medium text-foreground">{regData.name || "Мой профиль"}</span>
              </div>
            ) : (
              <Button size="sm" variant="outline" className="hidden md:flex gap-1.5" onClick={() => { setRegOpen(true); setRegStep("form"); }}>
                <Icon name="UserPlus" size={15} />
                Войти / Регистрация
              </Button>
            )}
            <Button size="sm" className="hidden md:flex">Стать наставником</Button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-1 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </button>
            ))}
            <Button className="mt-2 w-full">Стать наставником</Button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-primary/10 text-primary border-0 text-sm font-medium px-3 py-1">
              🤝 Молодёжь помогает взрослым
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black text-foreground leading-tight mb-6">
              Цифровой
              <span className="block text-primary">наставник</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Молодые ребята помогают старшему поколению освоить смартфон, интернет и современные сервисы. Просто, безопасно, по-человечески.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Button size="lg" onClick={() => scrollTo("mentors")} className="gap-2">
                <Icon name="Search" size={18} />
                Найти наставника
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("lessons")} className="gap-2">
                <Icon name="BookOpen" size={18} />
                Все уроки
              </Button>
            </div>
            <div className="flex items-center gap-8">
              {[
                { value: "1 200+", label: "Взрослых обучили" },
                { value: "87", label: "Наставников" },
                { value: "4.9", label: "Средняя оценка" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Наставник помогает"
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-square"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Урок завершён!</p>
                <p className="text-xs text-muted-foreground">Госуслуги — запись к врачу</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-foreground mb-4">Как это работает</h2>
            <p className="text-lg text-muted-foreground">Три простых шага до первого урока</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "UserPlus", title: "Зарегистрируйтесь", desc: "Создайте профиль — это займёт не более 2 минут. Никаких сложных форм." },
              { step: "02", icon: "Users", title: "Выберите наставника", desc: "Просматривайте анкеты, читайте отзывы и выбирайте того, кто нравится." },
              { step: "03", icon: "Video", title: "Начните обучение", desc: "Занимайтесь онлайн или лично — в удобное время и в удобном темпе." },
            ].map((step) => (
              <div key={step.step} className="bg-white rounded-2xl p-8 shadow-sm hover-scale">
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-5xl font-black text-primary/15 leading-none">{step.step}</span>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name={step.icon} size={22} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTORS */}
      <section id="mentors" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-14">
            <div>
              <h2 className="text-4xl font-black text-foreground mb-3">Наставники</h2>
              <p className="text-lg text-muted-foreground">Проверенные ребята с реальными отзывами</p>
            </div>
            <Button variant="outline" className="hidden md:flex gap-2">
              Все наставники
              <Icon name="ArrowRight" size={16} />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {MENTORS.map((mentor) => (
              <Card key={mentor.id} className="border border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-foreground">{mentor.name}</p>
                        <p className="text-sm text-muted-foreground">{mentor.age} лет</p>
                      </div>
                    </div>
                    {mentor.badge && (
                      <Badge className="text-xs bg-amber-50 text-amber-700 border-0">{mentor.badge}</Badge>
                    )}
                  </div>

                  <p className="font-semibold text-foreground text-sm mb-3">{mentor.speciality}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {mentor.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={15} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold text-foreground text-sm">{mentor.rating}</span>
                      <span className="text-muted-foreground text-sm">({mentor.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="BookOpen" size={14} />
                      <span>{mentor.lessons} уроков</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 gap-2" onClick={() => scrollTo("chat")}>
                      <Icon name="MessageCircle" size={16} />
                      Написать
                    </Button>
                    <Button variant="outline" className="gap-2 px-3" onClick={() => { setCallMentor(mentor.name); setCallModalOpen(true); }}>
                      <Icon name="Phone" size={16} className="text-green-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LESSONS */}
      <section id="lessons" className="bg-secondary py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-foreground mb-4">Уроки</h2>
            <p className="text-lg text-muted-foreground">Понятные темы для уверенной жизни в цифровом мире</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LESSONS.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer hover-scale"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${lesson.color}`}>
                  <Icon name={lesson.icon} size={22} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{lesson.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={13} />
                    {lesson.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Users" size={13} />
                    {lesson.students.toLocaleString("ru")} студентов
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">{lesson.level}</Badge>
                  <Button size="sm" variant="ghost" className="text-primary gap-1 px-2">
                    Начать
                    <Icon name="ChevronRight" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-foreground mb-4">Отзывы</h2>
            <p className="text-lg text-muted-foreground">Молодые наставники оставляют оценки о качестве обучения</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <Card key={review.id} className="border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-5 text-sm">«{review.text}»</p>
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.age} лет</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Наставник</p>
                      <p className="text-xs font-medium text-primary">{review.mentor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 bg-primary/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-foreground text-lg mb-1">Оставьте свой отзыв</p>
              <p className="text-muted-foreground text-sm">Ваш опыт поможет другим сделать правильный выбор</p>
            </div>
            <Button className="gap-2 flex-shrink-0">
              <Icon name="PenLine" size={16} />
              Написать отзыв
            </Button>
          </div>
        </div>
      </section>

      {/* RATING */}
      <section id="rating" className="bg-secondary py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-foreground mb-4">Рейтинг наставников</h2>
            <p className="text-lg text-muted-foreground">Лучшие по количеству уроков и оценкам учеников</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {RATING.map((item, i) => (
                <div
                  key={item.rank}
                  className={`flex items-center gap-4 p-5 ${i !== RATING.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="w-8 text-center">
                    {item.badge ? (
                      <span className="text-2xl">{item.badge}</span>
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">{item.rank}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.lessons} уроков</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Icon name="Star" size={14} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold text-foreground">{item.rating}</span>
                    </div>
                    <Progress value={item.rating * 20} className="w-24 h-1.5 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHAT */}
      <section id="chat" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-foreground mb-4">Чат с наставником</h2>
            <p className="text-lg text-muted-foreground">Задайте вопрос прямо сейчас — ответим быстро</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 p-4 border-b border-border bg-secondary">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={MENTORS[0].avatar} />
                  <AvatarFallback>А</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">Алексей Фомин</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-xs text-muted-foreground">Онлайн</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setCallMentor("Алексей Фомин"); setCallModalOpen(true); }}
                    className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors"
                    title="Позвонить"
                  >
                    <Icon name="Phone" size={16} className="text-green-600" />
                  </button>
                  <button
                    onClick={() => { setCallMentor("Алексей Фомин"); setCallModalOpen(true); }}
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    title="Видеозвонок"
                  >
                    <Icon name="Video" size={16} className="text-primary" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4 h-72 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        msg.from === "mentor" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {msg.from === "mentor" ? "А" : "Я"}
                    </div>
                    <div className={`max-w-xs ${msg.from === "user" ? "items-end" : ""} flex flex-col gap-1`}>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.from === "mentor"
                            ? "bg-secondary text-foreground rounded-tl-sm"
                            : "bg-primary text-white rounded-tr-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-xs text-muted-foreground px-1">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border flex gap-3">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Напишите вопрос..."
                  className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                />
                <Button onClick={sendMessage} size="sm" className="rounded-xl px-4">
                  <Icon name="Send" size={15} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE */}
      <section id="profile" className="bg-secondary py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-foreground mb-4">Личный профиль</h2>
            <p className="text-lg text-muted-foreground">Отслеживайте прогресс и историю занятий</p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-border">
            <div className="bg-gradient-to-r from-primary to-blue-400 p-8 text-white">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-black">
                  С
                </div>
                <div>
                  <h3 className="text-2xl font-black">Светлана Орлова</h3>
                  <p className="text-white/80">Ученик · 68 лет</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-white/20 text-white border-0 text-xs">Начинающий</Badge>
                    <Badge className="bg-white/20 text-white border-0 text-xs">5 уроков пройдено</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-6">
              {[
                { icon: "BookOpen", label: "Уроков пройдено", value: "5", color: "text-blue-600 bg-blue-50" },
                { icon: "Clock", label: "Часов обучения", value: "4.5", color: "text-green-600 bg-green-50" },
                { icon: "Star", label: "Достижений", value: "3", color: "text-amber-600 bg-amber-50" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon name={stat.icon} size={18} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-8 pb-8">
              <p className="font-semibold text-foreground mb-3 text-sm">Прогресс обучения</p>
              <div className="space-y-3">
                {[
                  { name: "Смартфоны", progress: 80 },
                  { name: "Интернет-банкинг", progress: 45 },
                  { name: "Госуслуги", progress: 20 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{item.name}</span>
                      <span className="text-muted-foreground">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-foreground mb-4">Контакты</h2>
            <p className="text-lg text-muted-foreground">Есть вопросы? Мы всегда на связи</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 555-0123", hint: "Бесплатно по России" },
                { icon: "Mail", label: "Email", value: "hello@наставник.рф", hint: "Ответим в течение часа" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Пушкина, 10", hint: "Пн–Пт, 9:00–18:00" },
                { icon: "MessageCircle", label: "Telegram", value: "@cifrov_nastavnik", hint: "Самый быстрый канал" },
              ].map((contact) => (
                <div key={contact.label} className="flex items-center gap-4 p-4 bg-secondary rounded-xl hover-scale cursor-pointer">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={contact.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{contact.label}</p>
                    <p className="font-semibold text-foreground">{contact.value}</p>
                    <p className="text-xs text-muted-foreground">{contact.hint}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary rounded-2xl p-6">
              <h3 className="font-bold text-foreground text-lg mb-5">Написать нам</h3>
              <div className="space-y-4">
                <input
                  placeholder="Ваше имя"
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                />
                <input
                  placeholder="Телефон или email"
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                />
                <textarea
                  placeholder="Ваш вопрос или пожелание..."
                  rows={4}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground resize-none"
                />
                <Button className="w-full gap-2">
                  <Icon name="Send" size={16} />
                  Отправить сообщение
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="Sparkles" size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg">Цифровой наставник</span>
            </div>
            <p className="text-white/50 text-sm text-center">
              © 2025 Цифровой наставник. Молодёжь помогает взрослым.
            </p>
            <div className="flex gap-4">
              {NAV_ITEMS.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-white/60 hover:text-white text-sm transition-colors story-link"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* REGISTRATION MODAL */}
      <Dialog open={regOpen} onOpenChange={setRegOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl">
          {regStep === "form" && (
            <div>
              <div className="bg-gradient-to-br from-primary to-blue-400 p-8 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name="UserPlus" size={22} className="text-white" />
                </div>
                <DialogTitle className="text-2xl font-black text-white mb-1">Регистрация</DialogTitle>
                <p className="text-white/80 text-sm">Шаг 1 из 2 — Ваши данные</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Имя и фамилия</label>
                  <input
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                    placeholder="Например: Светлана Орлова"
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Ваш возраст</label>
                  <input
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                    placeholder="Например: 65"
                    type="number"
                    value={regData.age}
                    onChange={(e) => setRegData({ ...regData, age: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Номер телефона</label>
                  <input
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                    placeholder="+7 (999) 123-45-67"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Электронная почта <span className="text-muted-foreground font-normal">(необязательно)</span></label>
                  <input
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                    placeholder="example@mail.ru"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  />
                </div>
                <Button
                  className="w-full gap-2 mt-2"
                  disabled={!regData.name || !regData.phone}
                  onClick={() => setRegStep("interests")}
                >
                  Далее
                  <Icon name="ArrowRight" size={16} />
                </Button>
              </div>
            </div>
          )}

          {regStep === "interests" && (
            <div>
              <div className="bg-gradient-to-br from-primary to-blue-400 p-8 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name="Sparkles" size={22} className="text-white" />
                </div>
                <DialogTitle className="text-2xl font-black text-white mb-1">Ваши интересы</DialogTitle>
                <p className="text-white/80 text-sm">Шаг 2 из 2 — Что хотите изучить?</p>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">Выберите темы, которые вас интересуют (можно несколько)</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {INTEREST_OPTIONS.map((opt) => {
                    const selected = regInterests.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setRegInterests((prev) => selected ? prev.filter((x) => x !== opt.id) : [...prev, opt.id])}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${selected ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:border-primary/40"}`}
                      >
                        <Icon name={opt.icon} size={18} className={selected ? "text-primary" : "text-muted-foreground"} />
                        <span className="text-sm font-medium">{opt.label}</span>
                        {selected && <Icon name="Check" size={14} className="text-primary ml-auto" />}
                      </button>
                    );
                  })}
                </div>
                <Button
                  className="w-full gap-2"
                  onClick={() => { setRegStep("done"); setIsUser(true); setTimeout(() => setRegOpen(false), 2200); }}
                >
                  <Icon name="CheckCircle" size={16} />
                  Завершить регистрацию
                </Button>
                <button className="w-full text-center text-sm text-muted-foreground mt-3 hover:text-foreground transition-colors" onClick={() => setRegStep("form")}>
                  ← Назад
                </button>
              </div>
            </div>
          )}

          {regStep === "done" && (
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <Icon name="CheckCircle" size={36} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-2">Добро пожаловать!</h3>
              <p className="text-muted-foreground text-sm">Аккаунт создан, {regData.name}! Теперь вы можете найти своего наставника.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CALL MODAL */}
      <Dialog open={callModalOpen} onOpenChange={setCallModalOpen}>
        <DialogContent className="max-w-sm p-0 overflow-hidden rounded-2xl">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Phone" size={32} className="text-white" />
            </div>
            <DialogTitle className="text-xl font-black text-white mb-1">Позвонить наставнику</DialogTitle>
            <p className="text-white/70 text-sm">{callMentor}</p>
          </div>
          <div className="p-6 space-y-3">
            <p className="text-center text-sm text-muted-foreground mb-4">Выберите удобный способ связи</p>
            <a
              href="tel:+79991234567"
              className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Phone" size={18} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Обычный звонок</p>
                <p className="text-xs text-muted-foreground">+7 (999) 123-45-67</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
            </a>
            <a
              href="https://t.me/cifrov_nastavnik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="MessageCircle" size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Telegram</p>
                <p className="text-xs text-muted-foreground">@cifrov_nastavnik</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
            </a>
            <a
              href="https://zoom.us/j/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Video" size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Видеозвонок (Zoom)</p>
                <p className="text-xs text-muted-foreground">Нажмите — откроется встреча</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
            </a>
            <Button variant="outline" className="w-full mt-2" onClick={() => setCallModalOpen(false)}>
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}