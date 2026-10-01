import { useEffect, useState } from 'react';

// Google reviews from the ReputationHub widget feed, shared by the home page widget and ad landing pages
const WIDGET_URL =
  'https://reputationhub.site/reputation/widgets/review_widget/X8ThpQ4AZ9FtX8bR2XFt';

export interface WidgetReview {
  id: string;
  reviewerName: string;
  starRating: number;
  comment: string;
  dateAdded: string;
  iconUrl?: string;
}

interface WidgetData {
  reviews: WidgetReview[];
  aggregateData: {
    totalReviews: number;
    totalRating: number;
  };
  templateData: {
    loadMoreText?: string;
    writeAReviewText?: string;
    locationReviewLink?: string;
  };
}

const parseWidgetData = (html: string): WidgetData | null => {
  const marker = 'window.__SSR_DATA__ = ';
  const start = html.indexOf(marker);
  if (start === -1) {
    return null;
  }

  const jsonStart = html.indexOf('{', start);
  if (jsonStart === -1) {
    return null;
  }

  let depth = 0;
  for (let i = jsonStart; i < html.length; i++) {
    if (html[i] === '{') {
      depth++;
    }
    if (html[i] === '}') {
      depth--;
    }
    if (depth === 0) {
      try {
        const data = JSON.parse(html.slice(jsonStart, i + 1));
        return {
          reviews: data.reviews ?? [],
          aggregateData: data.aggregateData ?? { totalReviews: 0, totalRating: 0 },
          templateData: data.templateData ?? {},
        };
      } catch {
        return null;
      }
    }
  }

  return null;
};

export const formatReviewDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const useReputationReviews = () => {
  const [reviews, setReviews] = useState<WidgetReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [writeReviewLink, setWriteReviewLink] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        const response = await fetch(WIDGET_URL);
        const html = await response.text();
        const data = parseWidgetData(html);

        if (!isMounted || !data) {
          return;
        }

        setReviews(data.reviews.filter((review) => review.comment?.trim()));
        setWriteReviewLink(data.templateData.locationReviewLink ?? null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return { reviews, isLoading, writeReviewLink };
};
