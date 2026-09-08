import { Link } from "react-router-dom";
import { ArrowRight, User, Calendar } from "lucide-react";
import type { Blog } from "../../types";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const authorName = typeof blog.author === "string" ? blog.author : blog.author?.name;

  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
            {blog.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white line-clamp-2">
            {blog.title}
          </h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {blog.content}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {authorName && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {authorName}
              </span>
            )}
            {blog.date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {blog.date}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
            Read <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
