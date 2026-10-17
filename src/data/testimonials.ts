export interface Testimonial {
  quote: string
  /** Client name, role, and company. Leave empty until the client agrees to be named. */
  name?: string
  role?: string
  /** Slug of the related case study in projects.ts, when known */
  projectSlug?: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Working with Abiola was a great experience. He understood our vision and translated it into a clean, functional design. He was receptive to feedback, paid attention to the details, and made the entire process smooth. I’d happily recommend him to anyone looking for a skilled designer.',
  },
  {
    quote:
      'Abiola did a great job bringing our vision to life. He understood what we wanted and turned it into a clean, modern design that represents our brand well. Communication was smooth throughout, and we appreciated his attention to detail.',
  },
  {
    quote:
      'Abiola has a good eye for design and understands how to turn ideas into practical digital experiences. He approaches projects thoughtfully and pays attention to the little details that make a difference. It was great working with him.',
  },
  {
    quote:
      'Working with Abiola was a positive experience. He thinks beyond just making things look good and considers how people will actually use the product. His ability to combine design with technical understanding makes him a valuable person to work with.',
  },
  {
    quote:
      'Abiola brought creativity and a clear sense of direction to our project. He understood the brief, communicated his ideas well, and delivered a design that felt thoughtful and professional. I’d recommend him to anyone looking for a reliable designer.',
  },
]
