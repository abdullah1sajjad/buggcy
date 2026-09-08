import { useParams } from "react-router-dom";
import { useBlogQuery } from "../../services/queries";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import { useUiStore } from "../../store/uiStore";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import SEO, { articleJsonLd } from "../../components/seo/SEO";
import { ErrorState } from "../../components/shared";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: blog, isLoading, isError } = useBlogQuery(id || "");
  const setGlobalLoading = useUiStore((state) => state.setGlobalLoading);

  // Example of using zustand for a global loading overlay
  useEffect(() => {
    setGlobalLoading(isLoading);
    return () => setGlobalLoading(false);
  }, [isLoading, setGlobalLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <ErrorState title="Blog not found" backTo="/blog" backLabel="Back to Blog" />
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
    >
      <SEO
        title={blog.title}
        description={blog.excerpt || blog.title}
        keywords={blog.tags?.join(", ") || blog.title}
        canonical={`https://buggcy.com/blog/${blog.id}`}
        image={blog.imageUrl}
        type="article"
        jsonLd={articleJsonLd({
          title: blog.title,
          description: blog.excerpt || blog.title,
          image: blog.imageUrl,
          datePublished: blog.date,
          author: typeof blog.author === "string" ? blog.author : blog.author?.name,
        })}
      />

      {blog.imageUrl && (
        <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg">
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="space-y-4 mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags?.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          {blog.title}
        </h1>
        
        <div className="flex items-center gap-6 text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span className="font-medium">{typeof blog.author === "string" ? blog.author : blog.author?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span className="font-medium">{new Date(blog.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
        // Content is already sanitized server-side on save, but we sanitize
        // again on render as defense-in-depth before using dangerouslySetInnerHTML.
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blog.content, {
            ALLOWED_TAGS: [
              'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'blockquote', 'pre', 'code',
              'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'sub', 'sup', 'span',
              'ul', 'ol', 'li', 'a', 'img', 'figure', 'figcaption',
              'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'div',
            ],
            ALLOWED_ATTR: ['href', 'name', 'target', 'rel', 'title', 'src', 'alt', 'width', 'height', 'style', 'colspan', 'rowspan', 'class'],
          }),
        }}
      />
    </motion.article>
  );
}
