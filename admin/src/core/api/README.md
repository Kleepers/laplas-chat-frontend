# API Layer

Централизованная структура для всех API запросов приложения.

## Структура

```
/core/api/
├── config.ts              # Конфигурация axios и interceptors
├── index.ts               # Главный экспорт всех API модулей
├── auth/                  # Авторизация и аутентификация
│   ├── index.ts          # API запросы для auth
│   ├── types.ts          # TypeScript типы для auth
│   └── constants.ts      # Константы для auth
└── user/                  # Пользователь и организации
    ├── index.ts          # API запросы для user
    ├── types.ts          # TypeScript типы для user
    └── constants.ts      # Константы для user
```

## Использование

### Импорт API методов
```typescript
import { authApi, userApi } from '@/core/api';

// Авторизация
const response = await authApi.login({ username: 'email', password: 'pass' });

// Данные пользователя
const userInfo = await userApi.getUserInfo();
```

### Импорт типов
```typescript
import type { LoginRequest, User, Organization } from '@/core/api';
```

## Принципы

1. **Модульность** - каждый домен (auth, user) в отдельной папке
2. **Типизация** - все запросы и ответы строго типизированы
3. **Константы** - эндпоинты и конфигурация выносятся в константы
4. **Единая конфигурация** - общий axios instance с interceptors
5. **Автоматическое обновление токенов** - через interceptors

## Добавление нового API модуля

1. Создайте папку `/core/api/{module-name}/`
2. Добавьте файлы:
   - `index.ts` - экспорт API методов
   - `types.ts` - TypeScript типы
   - `constants.ts` - константы эндпоинтов
3. Обновите `/core/api/index.ts` для экспорта нового модуля