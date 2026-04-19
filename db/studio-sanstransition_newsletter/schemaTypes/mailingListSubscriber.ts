import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mailingListSubscriber',
  title: 'Abonnés Newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailHash',
      title: 'Hash email',
      type: 'string',
      description: 'HMAC-SHA256 de l\'email — utilisé pour les tokens de désinscription',
      readOnly: true,
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: "Page depuis laquelle la personne s'est inscrite (ex: /00)",
    }),
    defineField({
      name: 'subscribedAt',
      title: "Date d'inscription",
      type: 'datetime',
    }),
    defineField({
      name: 'unsubscribedAt',
      title: 'Date de désinscription',
      type: 'datetime',
    }),
    defineField({
      name: 'ip',
      title: 'Adresse IP',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt',
    },
  },
})
