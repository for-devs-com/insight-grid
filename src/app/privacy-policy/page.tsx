'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PrivacyPolicy = () => {
    const router = useRouter()

    const sections = [
        {
            title: 'Información Recopilada',
            icon: 'ℹ️',
            content:
                'En DataAnalytic, recopilamos información personal como su nombre, correo electrónico, información de contacto y detalles demográficos cuando se registra o utiliza nuestros servicios. También podemos recopilar información sobre el uso de nuestro sitio web a través de cookies y tecnologías similares.',
        },
        {
            title: 'Uso de la Información',
            icon: '🔒',
            content:
                'Utilizamos su información para proporcionar y mejorar nuestros servicios, procesar transacciones, enviar comunicaciones relevantes y mejorar la experiencia del usuario. No compartimos su información personal con terceros sin su consentimiento, excepto cuando sea necesario para cumplir con la ley o proporcionar nuestros servicios.',
        },
        {
            title: 'Cookies y Tecnologías Similares',
            icon: '🍪',
            content:
                'Utilizamos cookies y tecnologías similares para personalizar su experiencia, analizar el tráfico del sitio y comprender cómo interactúa con nuestro contenido. Puede controlar el uso de cookies a través de la configuración de su navegador.',
        },
        {
            title: 'Enlaces a Terceros',
            icon: '🔗',
            content:
                'Nuestro sitio web puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de estos sitios y le recomendamos que revise sus políticas de privacidad de manera independiente.',
        },
        {
            title: 'Seguridad de los Datos',
            icon: '🛡️',
            content:
                'Implementamos medidas de seguridad razonables para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ninguna transmisión por Internet es completamente segura y no podemos garantizar la seguridad absoluta de su información.',
        },
        {
            title: 'Cambios en la Política de Privacidad',
            icon: '🔄',
            content:
                'Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Le notificaremos sobre cambios significativos a través de nuestro sitio web o por otros medios apropiados.',
        },
        {
            title: 'Contacto',
            icon: '✉️',
            content:
                'Si tiene preguntas o inquietudes sobre esta Política de Privacidad, por favor póngase en contacto con nosotros en privacy@dataanalytic.ai.',
        },
    ]

    const handleNavigation = (section: string) => {
        router.push(`/?section=${section}`)
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <button
                    onClick={() => handleNavigation('home')}
                    className="flex items-center mb-6 text-primary hover:underline"
                >
                    {/* Puedes usar un icono de flecha si lo deseas */}
                    &larr; Volver al Inicio
                </button>
                <div className="bg-card p-8 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-primary">
                        Política de Privacidad
                    </h1>
                    <p className="mb-6">
                        En <span className="font-semibold">DataAnalytic</span>, estamos comprometidos a proteger su privacidad y garantizar la seguridad de su información personal. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos sus datos cuando utiliza nuestro sitio web y servicios.
                    </p>
                    {sections.map((section, index) => (
                        <div key={index} className="mb-8">
                            <div className="flex items-center mb-4">
                                <span className="text-2xl mr-2">{section.icon}</span>
                                <h2 className="text-2xl font-semibold text-primary">{section.title}</h2>
                            </div>
                            <p className="text-base leading-7">{section.content}</p>
                            {index < sections.length - 1 && (
                                <hr className="my-6 border-border" />
                            )}
                        </div>
                    ))}
                    <p className="mt-8 italic">
                        Le recomendamos que revise esta Política de Privacidad periódicamente para estar informado sobre cómo protegemos la información que recopilamos.
                    </p>
                    <div className="mt-6">
                        <p>
                            Si tiene alguna pregunta sobre esta Política de Privacidad, por favor{' '}
                            <Link href="/contact" className="text-primary hover:underline">
                                contáctenos
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
            <footer className="bg-primary text-primary-foreground py-4 mt-auto">
                <div className="container mx-auto text-center">
                    <p>
                        &copy; {new Date().getFullYear()} DataAnalytic. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default PrivacyPolicy
