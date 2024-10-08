# Проект "Кошачий пинтерест"

## Описание проекта

Проект "Кошачий пинтерест" — это сервис для просмотра и добавления котиков в избранное, используя API [The Cat API](https://thecatapi.com). Проект построен на микросервисной архитектуре с использованием технологий TypeScript, React, NestJS, Spring Boot, PostgreSQL и Docker Compose.

## Технологии

### Frontend:
- **React** + **TypeScript**
- **CSS**: стилизация компонентов, включая адаптивную верстку
- Авторизация/регистрация пользователей
- Отображение котиков и возможность добавления их в избранное
- Адаптивный дизайн (частично)
- Интеграция с бэкендом для авторизации и работы с котиками

### Backend:
- **NestJS** + **TypeScript**: микросервисы `auth` и `cats`
- **Spring Boot** + **Kotlin**: микросервисы `gateway`, `discovery`, `config`
- **JWT авторизация**: защита API с ролями пользователей
- **PostgreSQL**: база данных для хранения информации о пользователях и избранных котиках
- **Docker Compose**: весь проект запускается с использованием Docker, включая базы данных, фронтенд и бэкенд

## Реализовано

### Frontend:
- **Авторизация и регистрация**: пользователи могут создать аккаунт и войти в систему.
- **Отображение котиков**: главная страница показывает всех котиков, загруженных через API.
- **Добавление котиков в избранное**: реализован механизм лайков для добавления котиков в избранное. Лайки сохраняются на бэкенде.
- **JWT токены**: после авторизации пользователь получает токен, который используется для запросов на бэкенд.

### Backend:
- **Микросервисная архитектура**:
  - **Auth**: сервис для регистрации и авторизации пользователей, использующий JWT.
  - **Cats**: сервис для работы с котиками (получение списка, добавление в избранное).
  - **Gateway**: маршрутизация запросов через API Gateway.
  - **Discovery и Config**: управление конфигурацией и сервисами через Spring Cloud.
- **PostgreSQL**: две базы данных для сервисов `auth` и `cats`, соединенные с микросервисами.
- **JWT авторизация**: для всех запросов, требующих аутентификации, используется проверка JWT токена.
- **Роли пользователей**: пользователи могут иметь роли (например, администратор может добавлять котиков в базу данных).

### Docker Compose:
- Весь проект настроен для запуска через Docker Compose:
  - Два микросервиса на NestJS (auth и cats)
  - Три микросервиса на Spring Boot (gateway, discovery, config)
  - Базы данных PostgreSQL для каждого микросервиса
  - Фронтенд на React
  - Все сервисы связаны в единую сеть и настроены для запуска в правильной последовательности.

## Осталось сделать

### Frontend:
- **Личный кабинет**: у каждого пользователя есть доступ к списку избранных котиков.
- **Адаптивность**: завершить адаптивную верстку для лучшего отображения на мобильных устройствах.
- **Бесконечная прокрутка**: реализовать механизм подгрузки котиков по мере прокрутки страницы (опционально).
- **Избранные котики**: реализовать отображение избранных котиков на отдельной вкладке.
- **Улучшение UX**: добавить визуальные уведомления о добавлении/удалении котиков из избранного.

### Backend:
- **Бизнес-логика для работы с избранными котиками**: доработать бэкенд-сервис `cats`, чтобы корректно сохранять и удалять котиков из избранного.
- **Завершение API**: проверить и доработать API для соответствия требованиям OpenAPI спецификации.
- **Тестирование и отладка**: провести интеграционное и функциональное тестирование для всех сервисов.

## Запуск проекта

Для запуска проекта используйте команду:

```bash
docker compose up
