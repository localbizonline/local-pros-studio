import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { formatReviewDate, getInitials, useReputationReviews } from './reputationReviews';

const INITIAL_REVIEW_COUNT = 9;
const LOAD_MORE_COUNT = 6;

interface ReputationReviewWidgetProps {
  variant?: 'light' | 'dark';
}

const ReputationReviewWidget = ({ variant = 'light' }: ReputationReviewWidgetProps) => {
  const { reviews, isLoading, writeReviewLink } = useReputationReviews();
  const [visibleCount, setVisibleCount] = useState(INITIAL_REVIEW_COUNT);

  const isDark = variant === 'dark';
  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`h-48 rounded-2xl animate-pulse ${
              isDark ? 'bg-neutral-900' : 'bg-neutral-100'
            }`}
          />
        ))}
      </div>
    );
  }

  if (!reviews.length) {
    return null;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <article
            key={review.id}
            className={`rounded-2xl p-6 border flex flex-col ${
              isDark
                ? 'bg-neutral-900 border-neutral-700'
                : 'bg-white border-neutral-100 shadow-soft'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: review.starRating }).map((_, index) => (
                  <Star
                    key={index}
                    className="w-4 h-4 text-amber-400 fill-current"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                {formatReviewDate(review.dateAdded)}
              </span>
            </div>

            <p
              className={`text-sm leading-relaxed mb-6 flex-1 ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}
            >
              {review.comment}
            </p>

            <div
              className={`flex items-center gap-3 pt-4 border-t ${
                isDark ? 'border-neutral-800' : 'border-neutral-100'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isDark ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-900 text-white'
                }`}
              >
                {getInitials(review.reviewerName)}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {review.reviewerName}
                </p>
              </div>
              {review.iconUrl && (
                <img src={review.iconUrl} alt="" className="w-4 h-4 opacity-70" />
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        {hasMore && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              isDark
                ? 'bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800'
                : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
            }`}
          >
            Load More
          </button>
        )}
        {writeReviewLink && (
          <a
            href={writeReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              isDark
                ? 'bg-amber-500 text-black hover:bg-amber-400'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            Write a review
          </a>
        )}
      </div>
    </div>
  );
};

export default ReputationReviewWidget;
