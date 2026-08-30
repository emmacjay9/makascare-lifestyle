import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Vitamins & Everyday Health",
          "Collagen & Beauty",
          "Women’s Wellness",
          "Men’s Wellness",
          "Weight Management",
          "Herbal Wellness",
          "Kids’ Vitamins",
        ],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "image",
      title: "Product image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),

    defineField({
      name: "showPrice",
      title: "Show price on website",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "inStock",
      title: "In stock",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "featured",
      title: "Featured product",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "category",
    },
  },
});
