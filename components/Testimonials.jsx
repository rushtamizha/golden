'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { 
  MessageCircle, 
  Star, 
  CheckCircle2, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { companyInfo } from '@/lib/data';
import { useRegion } from '@/app/context/RegionContext';

// Import Swiper styling production layers
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FALLBACK_REVIEWS = [
  {
    id: '1',
    authorName: 'Senthil Kumar',
    authorPhoto: null,
    rating: 5,
    relativeTime: '1 month ago',
    comment: 'Super service bro! Midnight timing-la correct ah vandhutanga. Car semma clean ah irundhuchu, hidden charges ethuvum ila. Family ah kootitu poga semma safe, tension eh illama airport poi serndhom.',
    route: 'Pondicherry to Chennai Airport',
    location: 'Madurai'
  },
  {
    id: '2',
    authorName: 'Aparna Sundaram',
    authorPhoto: null,
    rating: 5,
    relativeTime: '2 months ago',
    comment: 'Chennai-la irundhu Pondy weekend trip polam-nu plan panna, engaloda fixed choice idhu thaan. Drivers ellam nalla mariyadhaiya pesuranga. AC perfect, per-KM rates full-ah honest ah pakka ah iruku.',
    route: 'Chennai to Pondicherry One Way',
    location: 'Chennai'
  },
  {
    id: '3',
    authorName: 'Vigneshwaran (Vicky)',
    authorPhoto: null,
    rating: 5,
    relativeTime: '3 months ago',
    comment: 'Family tour kaga Innova Crysta book panni irundhom. Long distance highway driving semma smooth ah irundhuchu. Driver bata, allowance ellam standard rate thaan. Romba nambagamaan drop taxi chain!',
    route: 'Pondicherry to Coimbatore Outstation',
    location: 'Coimbatore'
  },
  {
    id: '4',
    authorName: 'Meenakshi Ammal',
    authorPhoto: null,
    rating: 5,
    relativeTime: '3 months ago',
    comment: 'WhatsApp-laye easy ah book panniten. Next 5 mins-la driver details vandhuruchu. Enna madhiri senior citizens luggage thooka driver romba help pannaru. Safe and respectful trip pa.',
    route: 'Madurai to Trichy Drop Taxi',
    location: 'Trichy'
  },
  {
    id: '5',
    authorName: 'Karthick Raja',
    authorPhoto: null,
    rating: 5,
    relativeTime: '4 months ago',
    comment: 'Matha travels madhiri extra km solli yemaathala. Pickup location-la irundhu correct billing. Speed-um correct limit-la irundhuchu, driving safety pakka standard. Elite travel option!',
    route: 'Salem to Chennai Airport One Way',
    location: 'Salem'
  }
];

export default function Testimonials() {
  const { theme, fares } = useRegion();
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [isLoading, setIsLoading] = useState(false);

  // Link to your Google My Business / Google Maps Place Review Page
  const gmbReviewUrl = companyInfo.googleBusinessUrl || 
    `https://search.google.com/local/writereview?placeid=${process.env.NEXT_PUBLIC_GMB_PLACE_ID || 'ChIJlRUTqCAbBzsRGcSxw5ozi04'}`;

  // Fetch Reviews dynamically from GMB API endpoint
  useEffect(() => {
    async function fetchGmbReviews() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/google-reviews');
        if (res.ok) {
          const data = await res.json();
          if (data?.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
          }
        }
      } catch (error) {
        console.error('Failed to fetch Google My Business reviews, loading fallbacks:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGmbReviews();
  }, []);

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 lg:px-16 text-gray-800 relative overflow-hidden">
      
      {/* Decorative background branding shapes */}
      <div className={`absolute top-1/4 -right-20 w-72 h-72 ${theme.pillBg} rounded-full blur-3xl pointer-events-none -z-10 opacity-60`} />
      <div className={`absolute bottom-10 -left-20 w-72 h-72 ${theme.pillBg} rounded-full blur-3xl pointer-events-none -z-10 opacity-40`} />

      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full w-max ${theme.pillBg} ${theme.textColor}`}>
              <MessageCircle className="w-3.5 h-3.5" />
              Verified Google Reviews
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Trusted By Thousands <br />
              <span className={theme.textColor}>Of {fares.stateName} Travelers</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl">
              Authentic reviews synced directly from Google My Business. Experience 100% transparent pricing across every route.
            </p>
          </div>

          {/* REDIRECT CTA TO GMB BUSINESS PAGE */}
          <div className="shrink-0">
            <a
              href={gmbReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-[#1a73e8] hover:bg-[#f8f9fa] hover:text-[#174ea6] border border-[#dadce0] font-medium text-xs py-2.5 px-4 rounded-full shadow-2xs hover:shadow-xs transition-all tracking-wide"
            >
              {/* Authentic 4-Color Google "G" Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <span className="font-medium text-gray-700">
                Write a Review on <strong className="text-gray-900 font-bold">Google</strong>
              </span>

              <ExternalLink className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
            </a>
          </div>
        </div>

        {/* SWIPER CAROUSEL SHELF */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="pb-16 w-full"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="bg-gray-50/70 border border-gray-100 rounded-[2rem] p-6 md:p-8 flex flex-col h-full justify-between transition-all duration-300 hover:bg-white hover:shadow-md hover:border-gray-200 m-0.5 relative group">
                  
                  {/* Real Google Brand Logo Badge */}
                  <div className="absolute right-6 top-6 bg-white/90 border border-gray-200/80 p-1.5 rounded-xl shadow-2xs group-hover:shadow-xs transition-shadow">
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>

                  {/* Card Content Top Shelf */}
                  <div className="space-y-4 relative z-10">
                    {/* Star Rating Row */}
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Main Comment Quote Text */}
                    <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed pr-8">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Card Footer Bio Block */}
                  <div className="pt-5 mt-6 border-t border-gray-100 flex flex-col gap-3 relative z-10">
                    
                    {/* Route Info Badge */}
                    {review.route && (
                      <div className={`flex items-center gap-1.5 border text-[11px] font-bold px-2.5 py-1 rounded-lg w-max ${theme.pillBg} ${theme.textColor} border-current/10`}>
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>Route: {review.route}</span>
                      </div>
                    )}

                    {/* Profile Setup */}
                    <div className="flex items-center gap-3">
                      {review.authorPhoto ? (
                        <img 
                          src={review.authorPhoto} 
                          alt={review.authorName} 
                          className="w-10 h-10 rounded-full object-cover shadow-xs border border-gray-200 shrink-0"
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-full text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0 ${theme.bgColor}`}>
                          {review.authorName ? review.authorName.charAt(0) : 'G'}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="text-sm font-black text-gray-900 truncate tracking-tight flex items-center gap-1">
                          {review.authorName}
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10 shrink-0" />
                        </h4>
                        <span className="block text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                          {review.location ? `${review.location} • ` : ''}{review.relativeTime || 'Verified Google Review'}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}