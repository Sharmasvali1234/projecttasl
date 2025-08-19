import { useState, useMemo } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogHero } from "@/components/blog/BlogHero";
import blogsData from "@/data/blogs.json";

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique categories and tags
  const categories = useMemo(() => 
    [...new Set(blogsData.map(blog => blog.category))], []);
  
  const availableTags = useMemo(() => 
    [...new Set(blogsData.flatMap(blog => blog.tags))], []);

  // Filter blogs based on search criteria
  const filteredBlogs = useMemo(() => {
    return blogsData.filter(blog => {
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || blog.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => blog.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchTerm, selectedCategory, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHero />
      
      <div className="container mx-auto px-4 py-12" id="blogs-section">
        <BlogSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          availableTags={availableTags}
        />

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {filteredBlogs.length} Article{filteredBlogs.length !== 1 ? 's' : ''}
            {(searchTerm || selectedCategory || selectedTags.length > 0) && ' Found'}
          </h2>
          {(searchTerm || selectedCategory || selectedTags.length > 0) && (
            <p className="text-muted-foreground">
              {searchTerm && `Searching for "${searchTerm}"`}
              {selectedCategory && ` in ${selectedCategory}`}
              {selectedTags.length > 0 && ` tagged with ${selectedTags.join(', ')}`}
            </p>
          )}
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all articles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;