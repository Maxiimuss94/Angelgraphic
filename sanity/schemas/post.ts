import { defineField, defineType } from "sanity";

const CATEGORIES = [
  "Design",
  "Branding",
  "Conseil",
  "Inspiration",
  "Tendances",
] as const;

export const postType = defineType({
  name: "post",
  title: "Article du Journal",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      type: "text",
      rows: 3,
      description: "Court résumé de l'article (affiché dans la liste)",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: CATEGORIES.map((c) => ({ title: c, value: c })),
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Contenu",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citation", value: "blockquote" },
          ],
          lists: [{ title: "Liste à puces", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Gras", value: "strong" },
              { title: "Italique", value: "em" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
