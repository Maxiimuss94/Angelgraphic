import { defineField, defineType } from "sanity";

const CATEGORIES = [
  "Art",
  "Flyers",
  "Carrousels",
  "Social media",
  "Logo",
  "Cartes",
  "Challenge",
] as const;

export const projectType = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
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
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "realizedAt",
      title: "Date de réalisation",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "featured",
      title: "À la une (Portfolio)",
      type: "boolean",
      initialValue: false,
      description: "Afficher ce projet dans la section Portfolio.",
    }),
  ],
});
