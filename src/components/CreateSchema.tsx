interface Listing {
     trip_name: string;
     images?: string[];
     company_name: string;
     company_slug: string;
     company_social_media: string[];
     destination: string;
     activities: string;
     duration_days: number;
     itinerary: {
       name: string;
       description: string;
       slug: string;
     }[];
     trip_slug: string;
     price: number;
     price_valid_until: string;
     valid_from: string;
     valid_through: string;
   }
   
   interface TouristAttraction {
     "@type": "TouristAttraction";
     name: string;
     description: string;
     url: string;
   }
   
   interface Offer {
     "@type": "Offer";
     url: string;
     priceCurrency: string;
     price: number;
     priceValidUntil: string;
     availability: string;
     validFrom: string;
     validThrough: string;
   }
   
   interface Provider {
     "@type": "Organization";
     name: string;
     url: string;
     sameAs: string[];
   }
   
   interface ItineraryItem {
     "@type": "TouristAttraction";
     name: string;
     description: string;
     url: string;
   }
   
   interface TouristTrip {
     "@context": string;
     "@type": string;
     name: string;
     image: string;
     description: string;
     provider: Provider;
     duration: string;
     itinerary: {
       "@type": string;
       itemListElement: TouristAttraction[];
     };
     offers: Offer;
   }
   
   export default function CreateSchema(listing: Listing): TouristTrip {
     return {
       "@context": "https://schema.org/",
       "@type": "TouristTrip",
       name: listing.trip_name,
       image:
         (listing.images &&
           listing.images[0] &&
           "https://example.com" + listing.images[0].split(",")[0]) ||
         ((!listing.images || !listing.images[0]) && "/noimage.webp"),
       description:
         listing.trip_name +
         " is an exciting tour package offered by " +
         listing.company_name +
         ". The tour takes place in " +
         listing.destination +
         " and includes activities such as " +
         listing.activities +
         ". Book now and have an unforgettable experience!",
       provider: {
         "@type": "Organization",
         name: listing.company_name,
         url: "https://example.com/" + listing.company_slug,
         sameAs: listing.company_social_media,
       },
       duration: "P" + listing.duration_days + "D",
       itinerary: {
         "@type": "ItemList",
         itemListElement: listing.itinerary.map(
           (item, index): TouristAttraction => ({
             "@type": "TouristAttraction",
             name: `Day ${index + 1}: ${item.name}`,
             description: item.description,
             url: "https://example.com/" + item.slug,
           })
         ),
       },
       offers: {
         "@type": "Offer",
         url: "https://example.com/" + listing.trip_slug,
         priceCurrency: "USD",
         price: listing.price,
         priceValidUntil: listing.price_valid_until,
         availability: "https://schema.org/InStock",
         validFrom: listing.valid_from,
         validThrough: listing.valid_through,
       },
     };
   }
   