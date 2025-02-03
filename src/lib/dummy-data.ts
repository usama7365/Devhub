import { User, Post, Comment, Article, BlogPost } from '../types';

export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'Feline_Predator',
    email: 'Feline@example.com',
    avatar_url:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Full-stack developer passionate about React and Node.js',
    github_username: 'usama7365',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    username: 'alina',
    email: 'jane@example.com',
    avatar_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'DevOps engineer and cloud architect',
    github_username: 'janedoe',
    created_at: '2024-01-02T00:00:00Z',
  },
];

export const dummyPosts: Post[] = [
  {
    id: '1',
    title: 'Best practices for React performance optimization',
    content:
      'Here are some key strategies for optimizing React applications...',
    user_id: '1',
    category: 'Frontend',
    tags: ['React', 'Performance', 'JavaScript'],
    upvotes: 42,
    is_resolved: false,
    created_at: '2024-02-28T10:00:00Z',
    updated_at: '2024-02-28T10:00:00Z',
  },
  {
    id: '2',
    title: 'Understanding Docker networking',
    content:
      'A deep dive into Docker networking concepts and best practices...',
    user_id: '2',
    category: 'DevOps',
    tags: ['Docker', 'Networking', 'DevOps'],
    upvotes: 35,
    is_resolved: true,
    created_at: '2024-02-27T15:30:00Z',
    updated_at: '2024-02-27T15:30:00Z',
  },
];

export const dummyComments: Comment[] = [
  {
    id: '1',
    content: 'Great explanation! This helped me understand the concept better.',
    user: dummyUsers[0],
    post_id: '1',
    is_accepted: true,
    upvotes: 15,
    created_at: '2024-02-28T11:00:00Z',
  },
  {
    id: '2',
    content: 'Could you elaborate more on the networking part?',
    user: dummyUsers[1],
    post_id: '2',
    is_accepted: false,
    upvotes: 8,
    created_at: '2024-02-27T16:30:00Z',
  },
];

export const dummyArticles: Article[] = [
  {
    id: '1',
    title: 'Complete Guide to Modern Web Development',
    content: `# Modern Web Development Guide

## Introduction
Modern web development has evolved significantly over the past few years. This guide covers essential concepts and best practices.

## Frontend Development
- React and its ecosystem
- State management with Redux and alternatives
- Modern CSS with Tailwind
- TypeScript integration

## Backend Development
- Node.js and Express
- API design principles
- Database integration
- Authentication and authorization

## DevOps
- CI/CD pipelines
- Docker containerization
- Kubernetes orchestration
- Cloud deployment`,
    description:
      'Learn about the latest tools and techniques in web development',
    user_id: '1',
    category: 'Web Development',
    tags: ['JavaScript', 'React', 'Node.js'],
    views: 1200,
    created_at: '2024-02-25T10:00:00Z',
    updated_at: '2024-02-25T10:00:00Z',
  },
  {
    id: '2',
    title: 'Microservices Architecture Patterns',
    content: `# Microservices Architecture Patterns

## Overview
Microservices architecture has become the standard for building scalable applications. This guide explores common patterns.

## Key Patterns
### API Gateway
- Request routing
- Authentication
- Rate limiting
- Response transformation

### Service Discovery
- Client-side discovery
- Server-side discovery
- Service registry
- Load balancing

### Circuit Breaker
- Failure detection
- Fallback mechanisms
- Recovery strategies

### Event-Driven Architecture
- Message queues
- Event sourcing
- CQRS pattern`,
    description: 'A deep dive into microservices design patterns',
    user_id: '2',
    category: 'Architecture',
    tags: ['Microservices', 'System Design', 'Architecture'],
    views: 850,
    created_at: '2024-02-24T15:30:00Z',
    updated_at: '2024-02-24T15:30:00Z',
  },
  {
    id: '3',
    title: 'Getting Started with TypeScript',
    content: `# TypeScript Fundamentals

## Introduction
TypeScript adds static typing to JavaScript, making it more robust and maintainable.

## Core Concepts
- Type annotations
- Interfaces
- Generics
- Utility types

## Best Practices
- Type inference
- Union types
- Type guards
- Declaration files`,
    description: 'Master TypeScript fundamentals and advanced features',
    user_id: '1',
    category: 'Programming Languages',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    views: 750,
    created_at: '2024-02-23T12:00:00Z',
    updated_at: '2024-02-23T12:00:00Z',
  },
];

export const dummyBugReports: Post[] = [
  {
    id: 'bug-1',
    title: 'Memory leak in React useEffect cleanup',
    content: `I'm experiencing a memory leak in my React application. The issue occurs when components unmount but async operations continue.

**Steps to reproduce:**
1. Create a component with useEffect
2. Make an async API call
3. Unmount component before API call completes

**Expected behavior:**
Memory should be freed when component unmounts

**Current behavior:**
Memory usage keeps increasing

**Environment:**
- React 18.2.0
- Node.js 18.15.0
- Chrome 91.0.4472.124`,
    user_id: '1',
    category: 'Bug',
    tags: ['React', 'Memory Leak', 'Hooks'],
    upvotes: 12,
    is_resolved: false,
    created_at: '2024-02-28T09:00:00Z',
    updated_at: '2024-02-28T09:00:00Z',
  },
  {
    id: 'bug-2',
    title: 'TypeScript compilation error with decorators',
    content: `Getting a strange compilation error when using decorators in TypeScript 5.0.

**Error message:**
\`\`\` typescript
TS1219: Experimental support for decorators is a feature that is subject to change in a future release.
\`\`\`

**Code sample:**
\`\`\`typescript
@Component({
  selector: 'app-root',
  template: '<div>Hello</div>'
})
export class AppComponent {}
\`\`\`

**Configuration:**
\`\`\`json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
\`\`\`

**Environment:**
- TypeScript 5.0.2
- Node.js 18.15.0`,
    user_id: '2',
    category: 'Bug',
    tags: ['TypeScript', 'Decorators', 'Compilation'],
    upvotes: 5,
    is_resolved: true,
    created_at: '2024-02-27T14:30:00Z',
    updated_at: '2024-02-27T14:30:00Z',
  },
  {
    id: 'bug-3',
    title: 'Docker container network isolation issue',
    content: `Containers in different networks are able to communicate when they shouldn't be able to.

**Steps to reproduce:**
1. Create two Docker networks
2. Launch containers in different networks
3. Attempt to ping between containers

**Expected behavior:**
Containers in different networks should not be able to communicate

**Current behavior:**
Containers can communicate across networks

**Configuration:**
\`\`\`yaml
version: '3'
networks:
  net1:
    driver: bridge
  net2:
    driver: bridge
\`\`\`

**Environment:**
- Docker 20.10.8
- Ubuntu 20.04 LTS`,
    user_id: '1',
    category: 'Bug',
    tags: ['Docker', 'Networking', 'Security'],
    upvotes: 8,
    is_resolved: false,
    created_at: '2024-02-26T11:00:00Z',
    updated_at: '2024-02-26T11:00:00Z',
  },
];

export const dummyBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    content: `# The Future of Web Development

## Introduction
As we move into 2024 and beyond, web development continues to evolve at a rapid pace. Let's explore the emerging trends and technologies that will shape the future of web development.

## AI-Powered Development
Artificial Intelligence is revolutionizing how we build web applications:

- **AI-Assisted Coding**: Tools like GitHub Copilot are changing how we write code
- **Smart Testing**: AI-powered testing tools that can automatically generate test cases
- **Automated Optimization**: Using AI to optimize performance and user experience

## Web Assembly and the Future of Performance
WebAssembly (Wasm) is enabling new possibilities:

\`\`\`rust
fn fibonacci(n: i32) -> i32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}
\`\`\`

## Edge Computing and the JAMstack
The rise of edge computing is changing how we deploy applications:

1. Faster response times
2. Reduced server costs
3. Better scalability

![Edge Computing](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop)

## Conclusion
The future of web development is exciting and full of possibilities. Stay tuned for more updates!`,
    cover_image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
    author: dummyUsers[0],
    tags: ['Web Development', 'Future Tech', 'AI', 'WebAssembly'],
    likes: 156,
    views: 2300,
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2024-02-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Building Scalable Systems: A Practical Guide',
    content: `# Building Scalable Systems: A Practical Guide

## Introduction
Scalability is crucial for modern applications. This guide covers practical approaches to building systems that can handle growth.

## Horizontal vs. Vertical Scaling
Understanding when to scale up vs. scale out:

- **Vertical Scaling**: Adding more power to existing machines
- **Horizontal Scaling**: Adding more machines to your system

## Database Scaling Strategies
Key approaches to database scaling:

\`\`\`sql
-- Partitioning example
CREATE TABLE orders_2024 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
\`\`\`

## Microservices Architecture
Breaking down monoliths into microservices:

![Microservices](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop)

## Load Balancing
Effective load balancing strategies:

1. Round-robin
2. Least connections
3. Resource-based

## Monitoring and Observability
Key metrics to watch:

- Response time
- Error rates
- Resource utilization
- User satisfaction

## Conclusion
Building scalable systems requires careful planning and the right architecture choices.`,
    cover_image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    author: dummyUsers[1],
    tags: ['System Design', 'Scalability', 'Architecture', 'DevOps'],
    likes: 98,
    views: 1500,
    created_at: '2024-02-19T15:30:00Z',
    updated_at: '2024-02-19T15:30:00Z',
  },
  {
    id: '3',
    title: 'Mastering TypeScript: Advanced Patterns',
    content: `# Mastering TypeScript: Advanced Patterns

## Introduction
TypeScript has become the standard for large-scale JavaScript applications. Let's explore advanced patterns and techniques.

## Generic Type Patterns
Advanced generic type usage:

\`\`\`typescript
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface User {
    id: string;
    profile: {
        name: string;
        age: number;
    };
}

type PartialUser = DeepPartial<User>;
\`\`\`

## The Builder Pattern
Implementing the builder pattern in TypeScript:

![TypeScript](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop)

## Advanced Decorators
Creating powerful decorators:

\`\`\`typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Implementation
}
\`\`\`

## Type-Safe Event Emitters
Building type-safe event systems:

\`\`\`typescript
interface Events {
    start: void;
    data: string;
    end: number;
}

class TypedEmitter {
    emit<K extends keyof Events>(event: K, data?: Events[K]): void {
        // Implementation
    }
}
\`\`\`

## Conclusion
TypeScript's type system enables powerful patterns for building robust applications.`,
    cover_image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    author: dummyUsers[0],
    tags: ['TypeScript', 'Programming', 'JavaScript', 'Design Patterns'],
    likes: 127,
    views: 1800,
    created_at: '2024-02-18T09:15:00Z',
    updated_at: '2024-02-18T09:15:00Z',
  },
];
