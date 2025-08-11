// src/components/ProjectDescription.tsx
"use client";

import Image from "next/image"; // Импортируем компонент Image из Next.js
import fabric from "@/assets/fabric.gif";
import restpic from "@/assets/rest-api.png";
import ExpandableSection from "./ExpandableSection";

const ProjectDescription: React.FC = () => {

    return (
        <div
            className="rounded-4xl p-10 mx-auto w-full max-w-6xl my-20 shadow-2xl bg-white space-y-20"
            id="ProjectDescription"
        >
            {/* Что такое Tasker? */}
            <section className="p-4 mx-auto w-full max-w-screen-xl">
                <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
                    Что такое <span className="text-indigo-600">Tasker</span>?
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <p className="text-gray-800 text-lg leading-relaxed max-w-5xl">
                        <strong>Tasker</strong> — это простое, но эффективное приложение
                        для управления задачами. Оно позволяет создавать списки дел,
                        редактировать, удалять задачи и отмечать их выполнение. Интерфейс
                        интуитивен, минималистичен и адаптирован под любые устройства — от
                        мобильных до десктопов.
                    </p>
                </div>
            </section>

            {/* Техническая реализация клиентской части */}
            <section className="bg-gradient-to-br from-slate-100 to-white p-8 rounded-2xl shadow-inner">
                <ExpandableSection
                    title="Клиентская часть"
                    brief={
                        <>
                            Интерфейс создан на <strong>Next.js</strong> с использованием{" "}
                            <strong>TypeScript</strong> и <strong>Tailwind CSS</strong>, с фокусом на
                            отзывчивость, скорость и модульность.
                        </>
                    }
                >
                    <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
                        <li>
                            <strong>Next.js App Router</strong> — обеспечивает быструю навигацию без перезагрузки и оптимизированный рендеринг.
                        </li>
                        <li>
                            <strong>TypeScript</strong> — статическая типизация для повышения надежности, безопасности и удобства разработки.
                        </li>
                        <li>
                            <strong>React Query</strong> — управление состоянием сервера, кэширование и автоматическая синхронизация данных.
                        </li>
                        <li>
                            <strong>Tailwind CSS</strong> — утилитарный фреймворк для быстрой и гибкой стилизации компонентов.
                        </li>
                        <li>
                            Полная адаптивность для любых устройств: от мобильных до десктопов.
                        </li>
                    </ul>
                </ExpandableSection>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-8 space-y-10 border-l-4 border-indigo-500">
                <ExpandableSection
                    title="Серверная часть"
                    brief={
                        <>
                            <strong className="text-xl">Бэкенд</strong> построен на{" "}
                            <strong>Go</strong> и реализует <strong>REST API</strong> —
                            архитектурный стиль на основе HTTP и CRUD-операций.
                        </>
                    }
                >
                    <div className="md:flex gap-8">
                        <Image
                            src={restpic}
                            className="hidden md:block h-[300px] pt-6"
                            alt="REST API"
                            width={500} // Укажите ширину и высоту для оптимизации
                            height={300}
                        />
                        <div className="text-gray-800 leading-relaxed space-y-4">
                            <p>
                                REST API обеспечивает простую и предсказуемую структуру для
                                интеграций и фронтенда. Вся логика охватывает{" "}
                                <strong>CRUD-операции</strong> (создание, чтение, обновление, удаление),
                                а также регистрацию, авторизацию и валидацию сессий.
                            </p>

                            <p>
                                Хранение данных реализовано на <strong>PostgreSQL</strong> — надёжной
                                реляционной СУБД, которая гарантирует безопасность и согласованность
                                данных.
                            </p>

                            <p>
                                Вся архитектура придерживается принципов <em>чистого кода</em> и
                                разделения ответственности:
                            </p>

                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>
                                    <strong>Контроллеры</strong> — обрабатывают HTTP-запросы и вызывают бизнес-логику;
                                </li>
                                <li>
                                    <strong>Сервисы</strong> — реализуют основную бизнес-логику приложения;
                                </li>
                                <li>
                                    <strong>Репозитории</strong> — обеспечивают взаимодействие с базой данных и SQL.
                                </li>
                            </ul>

                            <p>
                                Такой подход делает сервер стабильным, читаемым и масштабируемым. REST-архитектура упрощает отладку и интеграцию с внешними сервисами.
                            </p>
                        </div>
                    </div>
                </ExpandableSection>
            </section>

            {/* Инфраструктура */}
            <section className="bg-gradient-to-br from-slate-100 to-white p-8 rounded-2xl shadow-inner">
                <ExpandableSection
                    title="Инфраструктура"
                    brief={
                        <>
                            Проект развернут в <strong>Kubernetes</strong>-кластере с
                            использованием Docker-контейнеров. Масштабирование и
                            отказоустойчивость достигаются через автоматизацию и манифесты.
                        </>
                    }
                >
                    <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
                        <li>Автоматическое масштабирование под нагрузкой;</li>
                        <li>Балансировка трафика и маршрутизация через Ingress;</li>
                        <li>Хранение конфигураций и секретов (ConfigMap и Secrets);</li>
                        <li>Мониторинг и автоперезапуск при сбоях;</li>
                        <li>Высокая доступность и отказоустойчивость.</li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                        Благодаря такой инфраструктуре все изменения доставляются в
                        продакшен быстро и надежно, без участия человека.
                    </p>
                </ExpandableSection>
            </section>

            {/* Автоматизация */}
            <section className="bg-white rounded-2xl shadow-lg p-8 space-y-10 border-l-4 border-indigo-500">
                <ExpandableSection
                    title="Автоматизация"
                    brief={
                        <>
                            Процесс <strong>CI/CD</strong> автоматизирован с помощью{" "}
                            <strong>Jenkins</strong>. Пайплайн собирает Docker-образы,
                            прогоняет тесты, публикует образы и разворачивает приложения в{" "}
                            <strong>Kubernetes</strong>.
                        </>
                    }
                >
                    <div className="md:flex gap-8">
                        <Image
                            src={fabric}
                            className="hidden md:block h-[300px] pt-6 rounded-3xl border shadow-lg"
                            alt="CI/CD pipeline"
                            width={500} // Укажите ширину и высоту для оптимизации
                            height={300}
                        />
                        <div className="text-gray-800 leading-relaxed space-y-4 max-w-xl">
                            <p>
                                <strong>CI (Continuous Integration)</strong> — непрерывная
                                интеграция, при которой код автоматически собирается и
                                тестируется при каждом коммите. Это позволяет быстро выявлять
                                ошибки и сохранять качество проекта.
                            </p>

                            <p>
                                <strong>CD (Continuous Delivery/Deployment)</strong>{" "}
                                обеспечивает автоматическую публикацию протестированных версий
                                приложения в staging и production окружения, минимизируя ручные
                                операции и человеческий фактор.
                            </p>

                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Автоматическая сборка и тестирование Docker-образов;</li>
                                <li>Публикация образов в Docker Registry;</li>
                                <li>Развёртывание обновлений на серверы или в Kubernetes;</li>
                                <li>Мониторинг состояния пайплайна и уведомления о сбоях;</li>
                                <li>Быстрая обратная связь для разработчиков.</li>
                            </ul>

                            <p>
                                Такой подход повышает стабильность, скорость выпуска новых
                                версий и позволяет команде сосредоточиться на разработке, а не
                                на рутинных операциях.
                            </p>
                        </div>
                    </div>
                </ExpandableSection>
            </section>
        </div>
    );
};

export default ProjectDescription;