import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark } from "lucide-react";
import blogsData from "@/data/blogs.json";
import { getBlogImage } from "@/utils/blogImages";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogsData.find(b => b.id === Number(id));

  if (!blog) {
    return <Navigate to="/" replace />;
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Handle code blocks
      if (paragraph.startsWith('```')) {
        const nextParagraphs = content.split('\n').slice(index + 1);
        const endIndex = nextParagraphs.findIndex(p => p.startsWith('```'));
        const codeContent = nextParagraphs.slice(0, endIndex).join('\n');
        
        return (
          <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm">{codeContent}</code>
          </pre>
        );
      }
      
      // Skip closing code block markers
      if (paragraph === '```') return null;
      
      // Handle headings
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const heading = paragraph.slice(2, -2);
        return (
          <h3 key={index} className="text-xl font-bold mt-8 mb-4 text-foreground">
            {heading}
          </h3>
        );
      }
      
      // Handle bold text within paragraphs
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      const formattedText = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {formattedText}
        </p>
      );
    }).filter(Boolean);
  };

  const relatedBlogs = blogsData
    .filter(b => b.id !== blog.id && (
      b.category === blog.category || 
      b.tags.some(tag => blog.tags.includes(tag))
    ))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img 
          src={getBlogImage(blog.image)}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{blog.category}</Badge>
              {blog.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="blog-outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="blog-outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-8 font-medium">
              {blog.description}
            </div>
            
            <div className="text-base leading-relaxed">
              {formatContent(blog.content)}
            </div>
          </div>

          {/* Author Info */}
          <div className="border-t border-border pt-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{blog.author}</h3>
                <p className="text-muted-foreground">
                  Passionate developer sharing insights on modern web technologies and best practices.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map(relatedBlog => (
                  <Link 
                    key={relatedBlog.id} 
                    to={`/blog/${relatedBlog.id}`}
                    className="group"
                  >
                    <article className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                      <img 
                        src={getBlogImage(relatedBlog.image)}
                        alt={relatedBlog.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedBlog.description}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;