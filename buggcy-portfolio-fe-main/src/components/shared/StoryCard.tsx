import { Link } from "react-router-dom";

interface StoryResult {
  label: string;
  value: string;
}

interface SuccessStory {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  client: string;
  results?: StoryResult[] | null;
}

interface StoryCardProps {
  story: SuccessStory;
  index?: number;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link
      to={`/success-stories/${story.slug}`}
      className="block group"
    >
      <div className="rounded-2xl border border-border overflow-hidden bg-background hover:border-primary/30 hover:shadow-lg transition-all duration-300">
        <div className="relative h-56 overflow-hidden">
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
              {story.category}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
              {story.title}
            </h3>
            <p className="text-white/80 text-sm">by {story.client}</p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {story.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {(story.results ?? []).slice(0, 3).map((r, i) => (
              <div
                key={`${r.label}-${i}`}
                className="flex items-baseline gap-1.5"
              >
                <span className="text-xl font-bold text-primary">
                  {r.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
