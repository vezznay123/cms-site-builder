import {
  DocumentPdfIcon,
  DocumentTextIcon,
  HomeIcon,
  ImageIcon,
  LinkIcon,
} from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'index',
  title: 'Home Page',
  icon: HomeIcon,
  type: 'document',
  preview: { select: { title: 'title', subtitle: 'description' } },
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      description: 'Appears in the browser tab and search results.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      description: 'Appears in search results.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'header',
      title: 'Content Header',
      description: 'Appears at the top of the page.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content Body',
      description:
        'Rich text content, including sub headings, links, images, and PDFs.',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'urlLink',
                type: 'object',
                title: 'URL Link',
                description: 'Link to an external URL.',
                icon: LinkIcon,
                fields: [
                  {
                    name: 'url',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) => rule.required(),
                  },
                  {
                    name: 'hoverText',
                    type: 'string',
                    title: 'Description Text',
                  },
                  {
                    name: 'shouldUseNewTab',
                    type: 'boolean',
                    title: 'Open link in new tab.',
                    initialValue: true
                  },
                ],
              },
              {
                name: 'fileLink',
                type: 'object',
                title: 'File Link',
                description: 'Link pieces of text to a file.',
                icon: DocumentTextIcon,
                fields: [
                  {
                    name: 'file',
                    type: 'file',
                    title: 'File Attachment',
                    validation: (rule) => rule.required(),
                  },
                  {
                    name: 'fileName',
                    type: 'string',
                    title: 'File Name',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'object',
          name: 'embeddedImage',
          title: 'Image',
          icon: ImageIcon,
          fields: [
            {
              name: 'imageFile',
              type: 'image',
              title: 'Image File',
              validation: (rule) => rule.required(),
            },
            {
              name: 'imageDescription',
              type: 'string',
              title: 'Description',
              description: 'If the image fails to load, this text will appear.',
              validation: (rule) => rule.required(),
            },
            {
              name: 'imageWidth',
              type: 'number',
              title: 'Image Size',
              description:
                'Pixel width of the image, leave empty for auto scaling.',
            },
            // TODO no overflow
          ],
        },
        {
          type: 'object',
          name: 'embeddedFile',
          title: 'File',
          icon: DocumentPdfIcon,
          fields: [
            {
              name: 'file',
              type: 'file',
              title: 'File Attachment',
              validation: (rule) => rule.required(),
            },
            {
              name: 'fileName',
              type: 'string',
              title: 'File Name',
            },
            {
              name: 'shouldRenderPdf',
              type: 'boolean',
              title: 'Render PDF',
              description: 'If the file is a PDF, display it on the page.',
              initialValue: true
            },
            {
              name: 'pdfHeight',
              type: 'number',
              title: 'PDF Display Height',
              description:
                'Height for the PDF display, leave empty for auto scaling.',
              hidden: ({ parent }) => !parent?.shouldRenderPdf,
            },
          ],
        },
      ],
    }),
  ],
})