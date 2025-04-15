# Tech Stack Component

This component displays a grid of programming language logos in a glass card with a flow pattern background.

## Usage

```jsx
import TechStack from '../components/tech-stack/tech-stack';

// In your page or component
<TechStack />
```

## Customization

### Adding More Programming Languages

To add more programming languages to the tech stack, edit the `techStack` array in `tech-stack.jsx`:

```jsx
const techStack = [
  {
    name: 'JavaScript',
    logo: '/images/tech/javascript.png',
  },
  // Add more languages here
];
```

### Adding Logo Images

1. Add your logo images to the `/public/images/tech/` directory
2. Make sure the images are square and preferably in PNG format with transparency
3. Recommended size: 120x120 pixels

## Styling

The component uses CSS modules for styling. You can customize the appearance by modifying the `tech-stack.module.scss` file.

Key style variables:
- Logo size
- Grid layout
- Background opacity
- Card padding and dimensions 