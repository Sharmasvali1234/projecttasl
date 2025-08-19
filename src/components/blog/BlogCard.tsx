import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

export const BlogCard = ({ 
  id, 
  title, 
  description, 
  author, 
  publishedAt, 
  readTime, 
  category, 
  tags, 
  image 
}: BlogCardProps) => {
  return (
    <article className="blog-card group">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={`https://images.unsplash.com/800x400?auto=format&fit=crop&q=80&w=800&h=400&sig=${id}`}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {category}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {title}
        </h2>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
        
        <Link to={`/blog/${id}`}>
          <Button variant="blog" size="sm" className="w-full">
            Read More
          </Button>
        </Link>
      </div>
    </article>
  );
};