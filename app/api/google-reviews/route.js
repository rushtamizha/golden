import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const placeId = process.env.NEXT_PUBLIC_GMB_PLACE_ID || "ChIJlRUTqCAbBzsRGcSxw5ozi04";

  if (!apiKey || !placeId) {
    return NextResponse.json({ reviews: [] });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const data = await response.json();

    if (data.status === "OK" && data.result?.reviews) {
      const formattedReviews = data.result.reviews.map((r, index) => ({
        id: index.toString(),
        authorName: r.author_name,
        authorPhoto: r.profile_photo_url,
        rating: r.rating,
        relativeTime: r.relative_time_description,
        comment: r.text,
      }));

      return NextResponse.json({ reviews: formattedReviews });
    }

    return NextResponse.json({ reviews: [] });
  } catch (error) {
    console.error("Error fetching GMB reviews:", error);
    return NextResponse.json({ reviews: [] }, { status: 500 });
  }
}