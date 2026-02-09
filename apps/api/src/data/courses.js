const courses = [
  {
    id: "smartphone",
    title: "Основы смартфона",
    description: "Базовые и расширенные действия со смартфоном: питание, громкость, Wi‑Fi и установка приложений.",
    cover: "/screens/smartphone.svg",
    steps: [
      {
        id: "power",
        title: "Включение и выключение",
        instruction: "Найдите кнопку питания на боковой грани. Нажмите и удерживайте 2–3 секунды, затем выберите Выключить.",
        help: "Если экран темный, нажмите и удерживайте кнопку питания. Для выключения выберите пункт в появившемся меню.",
        level: "BASIC",
        hotspot: { x: 86, y: 18, w: 10, h: 18 },
        screenshot: "/screens/smartphone.svg",
        expectedAction: "Нажмите кнопку питания"
      },
      {
        id: "volume",
        title: "Регулировка громкости",
        instruction: "Нажмите кнопку громкости вверх или вниз, чтобы изменить звук.",
        help: "Кнопки громкости находятся над или под кнопкой питания.",
        level: "BASIC",
        hotspot: { x: 86, y: 40, w: 10, h: 18 },
        screenshot: "/screens/smartphone.svg",
        expectedAction: "Нажмите кнопку громкости"
      },
      {
        id: "wifi",
        title: "Подключение к Wi‑Fi",
        instruction: "Откройте Настройки → Wi‑Fi. Найдите сеть, введите пароль и подключитесь.",
        help: "Если сети нет в списке — обновите список и убедитесь, что Wi‑Fi включен.",
        level: "ADVANCED",
        hotspot: { x: 50, y: 26, w: 28, h: 12 },
        screenshot: "/screens/smartphone.svg",
        expectedAction: "Откройте настройки Wi‑Fi"
      },
      {
        id: "rustore",
        title: "Установка приложения из RuStore",
        instruction: "Откройте RuStore, найдите приложение, выберите его и нажмите Установить.",
        help: "Если RuStore не установлен, сначала откройте его ярлык на рабочем столе.",
        level: "ADVANCED",
        hotspot: { x: 22, y: 70, w: 18, h: 16 },
        screenshot: "/screens/smartphone.svg",
        expectedAction: "Откройте RuStore"
      }
    ],
    practice: {
      id: "practice-smartphone",
      title: "Практика: базовые действия",
      tasks: [
        {
          id: "practice-power",
          title: "Включите смартфон",
          stepId: "power"
        },
        {
          id: "practice-volume",
          title: "Сделайте громкость тише",
          stepId: "volume"
        }
      ]
    },
    quiz: {
      id: "quiz-smartphone",
      title: "Мини‑тест",
      questions: [
        {
          id: "q1",
          text: "Сколько секунд нужно удерживать кнопку питания?",
          options: ["1 секунду", "2–3 секунды", "10 секунд"],
          correctIndex: 1
        },
        {
          id: "q2",
          text: "Где находится переключатель Wi‑Fi?",
          options: ["В Настройках", "В Галерее", "В Телефонной книге"],
          correctIndex: 0
        },
        {
          id: "q3",
          text: "Что нужно нажать в RuStore, чтобы начать установку?",
          options: ["Открыть", "Удалить", "Установить"],
          correctIndex: 2
        }
      ]
    }
  },
  {
    id: "max",
    title: "Работа с мессенджером MAX",
    description: "Сообщения, фото и создание чатов в интерфейсе, похожем на MAX.",
    cover: "/screens/max.svg",
    steps: [
      {
        id: "max-text",
        title: "Отправка текстового сообщения",
        instruction: "Откройте чат и введите текст в поле ввода, затем нажмите Отправить.",
        help: "Поле ввода находится внизу экрана, кнопка отправки — справа.",
        level: "BASIC",
        hotspot: { x: 60, y: 86, w: 16, h: 10 },
        screenshot: "/screens/max.svg",
        expectedAction: "Нажмите кнопку отправки"
      },
      {
        id: "max-photo",
        title: "Отправка фото",
        instruction: "Нажмите значок «+», выберите фото и отправьте.",
        help: "Значок «+» находится слева от поля ввода.",
        level: "BASIC",
        hotspot: { x: 18, y: 86, w: 10, h: 10 },
        screenshot: "/screens/max.svg",
        expectedAction: "Нажмите «+»"
      },
      {
        id: "max-new-chat",
        title: "Создание нового чата",
        instruction: "Нажмите Новый чат, найдите контакт, создайте чат и отправьте приветствие.",
        help: "Кнопка Новый чат — вверху справа.",
        level: "BASIC",
        hotspot: { x: 84, y: 10, w: 10, h: 10 },
        screenshot: "/screens/max.svg",
        expectedAction: "Нажмите Новый чат"
      },
      {
        id: "max-group",
        title: "Создание группового чата",
        instruction: "Выберите несколько контактов, создайте группу и отправьте приветствие.",
        help: "Для группы отметьте несколько контактов и нажмите Создать.",
        level: "ADVANCED",
        hotspot: { x: 70, y: 28, w: 20, h: 10 },
        screenshot: "/screens/max.svg",
        expectedAction: "Выберите контакты для группы"
      },
      {
        id: "max-emoji",
        title: "Эмодзи и стикеры",
        instruction: "Нажмите значок эмодзи и выберите смайл или стикер.",
        help: "Значок смайла рядом с полем ввода.",
        level: "ADVANCED",
        hotspot: { x: 42, y: 86, w: 10, h: 10 },
        screenshot: "/screens/max.svg",
        expectedAction: "Откройте эмодзи"
      }
    ],
    practice: {
      id: "practice-max",
      title: "Практика: чат с человеком",
      tasks: [
        {
          id: "practice-max-chat",
          title: "Создайте чат и отправьте приветствие",
          stepId: "max-new-chat"
        },
        {
          id: "practice-max-photo",
          title: "Отправьте фото",
          stepId: "max-photo"
        }
      ]
    },
    quiz: {
      id: "quiz-max",
      title: "Мини‑тест",
      questions: [
        {
          id: "q1",
          text: "Где находится кнопка «+»?",
          options: ["Слева от поля ввода", "В шапке чата", "В настройках"],
          correctIndex: 0
        },
        {
          id: "q2",
          text: "Как создать новый чат?",
          options: ["Нажать Новый чат", "Удалить историю", "Выйти из аккаунта"],
          correctIndex: 0
        },
        {
          id: "q3",
          text: "Что нужно, чтобы отправить стикер?",
          options: ["Открыть эмодзи", "Сделать скриншот", "Перезапустить приложение"],
          correctIndex: 0
        }
      ]
    }
  },
  {
    id: "shopping",
    title: "Онлайн‑покупки",
    description: "Поиск товара, корзина и оформление доставки.",
    cover: "/screens/shop.svg",
    steps: [
      {
        id: "shop-search",
        title: "Поиск товара по каталогу",
        instruction: "Откройте каталог и выберите категорию товара.",
        help: "Каталог находится на нижней панели приложения магазина.",
        level: "BASIC",
        hotspot: { x: 12, y: 90, w: 20, h: 8 },
        screenshot: "/screens/shop.svg",
        expectedAction: "Откройте каталог"
      },
      {
        id: "shop-cart",
        title: "Добавление в корзину",
        instruction: "Выберите товар и нажмите В корзину.",
        help: "Кнопка В корзину обычно яркая и находится рядом с ценой.",
        level: "BASIC",
        hotspot: { x: 62, y: 60, w: 26, h: 10 },
        screenshot: "/screens/shop.svg",
        expectedAction: "Нажмите В корзину"
      },
      {
        id: "shop-delivery",
        title: "Оформление доставки",
        instruction: "Выберите способ доставки (курьер/пункт выдачи), адрес, оплату и подтвердите заказ.",
        help: "Если сомневаетесь — выберите оплату при получении.",
        level: "ADVANCED",
        hotspot: { x: 58, y: 80, w: 30, h: 10 },
        screenshot: "/screens/shop.svg",
        expectedAction: "Оформите доставку"
      }
    ],
    practice: {
      id: "practice-shopping",
      title: "Практика: оформить заказ",
      tasks: [
        {
          id: "practice-shopping-search",
          title: "Найдите товар в каталоге",
          stepId: "shop-search"
        },
        {
          id: "practice-shopping-cart",
          title: "Добавьте товар в корзину",
          stepId: "shop-cart"
        }
      ]
    },
    quiz: {
      id: "quiz-shopping",
      title: "Мини‑тест",
      questions: [
        {
          id: "q1",
          text: "Что делать после выбора товара?",
          options: ["Нажать В корзину", "Выключить телефон", "Удалить приложение"],
          correctIndex: 0
        },
        {
          id: "q2",
          text: "Какие способы оплаты доступны?",
          options: ["Карта/СБП/при получении", "Только наличные", "Только карта"],
          correctIndex: 0
        },
        {
          id: "q3",
          text: "Что нужно выбрать перед подтверждением заказа?",
          options: ["Способ доставки", "Язык интерфейса", "Будильник"],
          correctIndex: 0
        }
      ]
    }
  },
  {
    id: "gosuslugi",
    title: "Госуслуги",
    description: "Вход по номеру телефона/почте/СНИЛС и запись к врачу.",
    cover: "/screens/gosuslugi.svg",
    steps: [
      {
        id: "gos-login",
        title: "Регистрация и вход",
        instruction: "Введите номер телефона, почту или СНИЛС, затем пароль.",
        help: "СНИЛС вводится без пробелов. Убедитесь, что данные совпадают с документами.",
        level: "BASIC",
        hotspot: { x: 40, y: 38, w: 40, h: 10 },
        screenshot: "/screens/gosuslugi.svg",
        expectedAction: "Введите СНИЛС/телефон"
      },
      {
        id: "gos-appointment",
        title: "Запись к врачу",
        instruction: "Введите полис, выберите специальность, врача, поликлинику, дату и время.",
        help: "Если нужной даты нет — попробуйте другую поликлинику.",
        level: "BASIC",
        hotspot: { x: 50, y: 60, w: 32, h: 10 },
        screenshot: "/screens/gosuslugi.svg",
        expectedAction: "Выберите дату и время"
      },
      {
        id: "gos-pension",
        title: "Электронное свидетельство пенсионера",
        instruction: "Откройте услугу, подтвердите данные и получите электронное свидетельство.",
        help: "Перед подтверждением проверьте ФИО и дату рождения.",
        level: "ADVANCED",
        hotspot: { x: 54, y: 80, w: 30, h: 10 },
        screenshot: "/screens/gosuslugi.svg",
        expectedAction: "Получите свидетельство"
      }
    ],
    practice: {
      id: "practice-gosuslugi",
      title: "Практика: запись к врачу",
      tasks: [
        {
          id: "practice-gos-login",
          title: "Войдите через СНИЛС",
          stepId: "gos-login"
        },
        {
          id: "practice-gos-appointment",
          title: "Запишитесь к врачу",
          stepId: "gos-appointment"
        }
      ]
    },
    quiz: {
      id: "quiz-gosuslugi",
      title: "Мини‑тест",
      questions: [
        {
          id: "q1",
          text: "Какие данные можно использовать для входа?",
          options: ["Телефон/почта/СНИЛС", "Только паспорт", "Только СНИЛС"],
          correctIndex: 0
        },
        {
          id: "q2",
          text: "Что нужно выбрать при записи к врачу?",
          options: ["Специальность и врача", "Цвет темы", "Пароль"],
          correctIndex: 0
        },
        {
          id: "q3",
          text: "Перед подтверждением свидетельства важно проверить…",
          options: ["ФИО и дату рождения", "Громкость", "Список контактов"],
          correctIndex: 0
        }
      ]
    }
  }
];

export default courses;
